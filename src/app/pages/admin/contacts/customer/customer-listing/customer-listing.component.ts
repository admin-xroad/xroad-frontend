import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { CustomerService, DataTablesResponse, ICustomerModel, ApiResponse } from 'src/app/services/admin/customer/customer.service';
import { CountryService } from 'src/app/services/admin/country/country.service';
import { Select2Group, Select2Option, Select2SearchEvent } from 'ng-select2-component';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrl: './customer-listing.component.scss'
})
export class CustomerListingComponent implements OnInit, AfterViewInit, OnDestroy {

  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsedFilter = true;

  isLoading = false;

  customers: DataTablesResponse;

  datatableConfig: DataTables.Settings = {};

  // Reload emitter inside datatable
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  // Single model
  // aUser: Observable<ApiResponse>;
  customerModel: ICustomerModel = { id: 0, name: '', email: '', phone: '', country_id: 0, city: '', status: undefined };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  roles$: Observable<DataTablesResponse>;

  verifiedOption = [
    { value: "", label: 'All' },
    { value: 0, label: 'No' },
    { value: 160, label: 'Yes' },
  ];
  verifiedValue = "";

  countriesListOption: (Select2Option | Select2Group)[] = []; 
  countryModel:any=[];

  editMode:Boolean = false;

  constructor(private customerApiService: CustomerService , private countryApiService: CountryService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadCustomerDataTable();
    this.countryApiService.getCountriesList().subscribe((response: any) => {
      this.countryModel = response.data;
      // console.log(this.countryModel.find());
      this.countriesListOption = response.data.map((country: any) => ({
        value: country.id,
        label: country.name
      }));
    });
  }

  loadCustomerDataTable(isFiltered = false){
    console.log("loadCustomerDataTable");
    
    this.datatableConfig = {
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Include additional filter data
        const additionalFilters = {};
        if(isFiltered){
          const additionalFilters = {
            // Add your additional filter properties here
            filter_verification: this.verifiedValue,
          };
        }

        // Merge additional filters with the DataTables parameters
        const requestData = { ...dataTablesParameters, ...additionalFilters };

        this.customerApiService.getCustomers(requestData).subscribe(resp => {
          callback(resp);
        });
      },
      columns: [
        {
          title: 'Name', data: 'name', render: function (data, type, full) {
            
            const colorClasses = ['success', 'info', 'warning', 'danger'];
            const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];

            const initials = data[0].toUpperCase();
            const symbolLabel = `
              <div class="symbol-label fs-3 bg-light-${randomColorClass} text-${randomColorClass}">
                ${initials}
              </div>
            `;

            const nameAndEmail = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                <a href="admin/customers/${full.id}" class="text-gray-800 text-hover-primary mb-1">${data}</a>
                <span>${full.email}</span>
              </div>
            `;

            return `
              <div class="symbol symbol-circle symbol-50px overflow-hidden me-3" data-action="view" data-id="${full.id}">
                <a href="javascript:;">
                  ${symbolLabel}
                </a>
              </div>
              ${nameAndEmail}
            `;
          }
        },
        {
          title: 'Phone', data: 'phone'
        },
        {
          title: 'Joined Date', data: 'created_at', render: function (data) {
            return moment(data).format('DD MMM YYYY, hh:mm a');
          }
        },
        {
          title: 'Status', data: 'status', render: function (data) {
            const status = data;
            const strClass = status == 1 ? "badge-success" : "badge-danger";
            const strText = status == 1 ? "Active" : "Deactive";
            return `<div class='badge ${strClass} fw-bold'>${strText}</div>`;
          }
        }
      ],
      createdRow: function (row, data, dataIndex) {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
  }


  searchCountry(event: Select2SearchEvent) {
      event.filteredData(
          event.search
              ? event.data.filter(option => option.label.toLowerCase().includes(event.search.toLowerCase()))
              : event.data,
      );
  }

  filterApplied(){
    console.log("filter Applied", this.verifiedValue);
    
    // this.loadCustomerDataTable(true);
    this.reloadEvent.emit(true);
  }
  

  resetFilter(){
    console.log("filter Reset");
    // this.loadCustomerDataTable(false);
    this.reloadEvent.emit(true);
  }

  delete(id: number) {
    this.customerApiService.deleteCustomer(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.editMode = true;
    this.customerApiService.editCustomer(id).subscribe((response: ApiResponse) => {
      this.customerModel = response.data;
      console.log(this.customerModel);
    });
  }

  create() {
    this.customerModel = { id: 0, name: '', email: '', phone:"", country_id:0};
    this.editMode = false;
  }

  onSubmit(event: Event, myForm: NgForm) {
    console.log(this.customerModel);
    
    if (myForm && myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Success!',
      text: this.customerModel.id > 0 ? 'User updated successfully!' : 'User created successfully!',
    };
    const errorAlert: SweetAlertOptions = {
      icon: 'error',
      title: 'Error!',
      text: '',
    };

    const completeFn = () => {
      this.isLoading = false;
    };

    const updateFn = () => {
      this.customerApiService.updateCustomer(this.customerModel.id, this.customerModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          this.reloadEvent.emit(true);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    };

    const createFn = () => {
      this.customerApiService.createCustomer(this.customerModel).subscribe({
        next: () => {
          this.showAlert(successAlert);
          this.reloadEvent.emit(true);
        },
        error: (error) => {
          errorAlert.text = this.extractText(error.error);
          this.showAlert(errorAlert);
          this.isLoading = false;
        },
        complete: completeFn,
      });
    };

    if (this.customerModel.id > 0) {
      updateFn();
    } else {
      createFn();
    }
  }

  extractText(obj: any): string {
    var textArray: string[] = [];

    for (var key in obj) {
      if (typeof obj[key] === 'string') {
        // If the value is a string, add it to the 'textArray'
        textArray.push(obj[key]);
      } else if (typeof obj[key] === 'object') {
        // If the value is an object, recursively call the function and concatenate the results
        textArray = textArray.concat(this.extractText(obj[key]));
      }
    }

    // Use a Set to remove duplicates and convert back to an array
    var uniqueTextArray = Array.from(new Set(textArray));

    // Convert the uniqueTextArray to a single string with line breaks
    var text = uniqueTextArray.join('\n');

    return text;
  }

  showAlert(swalOptions: SweetAlertOptions) {
    let style = swalOptions.icon?.toString() || 'success';
    if (swalOptions.icon === 'error') {
      style = 'danger';
    }
    this.swalOptions = Object.assign({
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      customClass: {
        confirmButton: "btn btn-" + style
      }
    }, swalOptions);
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
