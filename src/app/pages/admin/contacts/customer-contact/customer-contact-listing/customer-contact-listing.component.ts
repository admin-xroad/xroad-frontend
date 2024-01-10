import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { Select2Group, Select2Option, Select2SearchEvent } from 'ng-select2-component';
import { CustomerContactService, ICustomerContactModel, ApiResponse, DataTablesResponse } from 'src/app/services/admin/customer-contact/customer-contact.service';
import { LiveSearchService, ILiveSearchModel } from 'src/app/services/admin/live-search/live-search.service';
@Component({
  selector: 'app-customer-contact-listing',
  // standalone: true,
  // imports: [],
  templateUrl: './customer-contact-listing.component.html',
  styleUrl: './customer-contact-listing.component.scss'
})
export class CustomerContactListingComponent implements OnInit, AfterViewInit, OnDestroy {

  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsedFilter = true;

  isLoading = false;
  
  editMode:boolean = false;

  contacts: DataTablesResponse;

  datatableConfig: DataTables.Settings = {};

  // Reload emitter inside datatable
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  // Single model
  // aUser: Observable<ApiResponse>;
  contactModel: ICustomerContactModel = { id: 0, name: '', email: '', phone: '', customer_id: 0, password: "" };
  
  liveSearchModel: ILiveSearchModel = { value: "", label: "" };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};


  verifiedOption = [
    { value: "", label: 'All' },
    { value: 0, label: 'No' },
    { value: 160, label: 'Yes' },
  ];
  verifiedValue = "";

  customersListOption: (Select2Option | Select2Group)[] = []; 

  constructor(private customerContactApiService: CustomerContactService , private liveSearchApi: LiveSearchService ,private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadCustomerContactDataTable();
    
  }

  loadCustomerContactDataTable(isFiltered = false){
    
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

        this.customerContactApiService.getCustomerContacts(requestData).subscribe(resp => {
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
                <a href="admin/customer-contacts/${full.id}" class="text-gray-800 text-hover-primary mb-1">${data}</a>
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
          title: 'Company', data: 'customer_id', render: function (data, type, full) {
            return full.customer.name;
          }
        },
        {
          title: 'Joined Date', data: 'created_at', render: function (data) {
            return moment(data).format('DD MMM YYYY, hh:mm a');
          }
        },
        {
          title: 'Status', data: 'status', render: function (data) {
            const status = data;
            const strClass = status == 1 ? "badge-light-success" : "badge-light-danger";
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


  searchCustomers(event: Select2SearchEvent) {
    const searchTerm = event.search;
    if(searchTerm){
      this.liveSearchApi.searchLiveRelational(searchTerm, 'Customer', 'id', 'name', 'name', 'status', '1',).subscribe(searchResults => {
        this.customersListOption = [...searchResults]
      });
      // this.liveSearchApi.searchLiveRelational(searchTerm, 'Customer', 'id', 'name', 'name', 'status', '1',).subscribe((response: ILiveSearchModel) => {
      //   this.customersListOption = [response];
      // });
    }else{
      this.customersListOption = [];
    }
  }

  filterApplied(){
    console.log("filter Applied", this.verifiedValue);
    
    // this.loadCustomerContactDataTable(true);
    this.reloadEvent.emit(true);
  }
  

  resetFilter(){
    console.log("filter Reset");
    // this.loadCustomerContactDataTable(false);
    this.reloadEvent.emit(true);
  }

  delete(id: number) {
    this.customerContactApiService.deleteContact(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.editMode = true;
    this.customerContactApiService.editContact(id).subscribe((response: ApiResponse) => {
      this.contactModel = response.data;
      const customer = response.data.customer
      const customerId = customer?.id || 0;
      const customerName = customer?.name || '';
  
      this.customersListOption = [{ value: customerId, label: customerName }];    
    });
  }

  create() {
    this.editMode = false;
    this.contactModel = { id: 0, name: '', email: '', customer_id: 0, phone:''};
  }

  onSubmit(event: Event, myForm: NgForm) {
    console.log(this.contactModel);
    
    if (myForm && myForm.invalid) {
      return;
    }
    // return;

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Success!',
      text: this.contactModel.id > 0 ? 'Contact updated successfully!' : 'Contact created successfully!',
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
      this.customerContactApiService.updateContact(this.contactModel.id, this.contactModel).subscribe({
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
      // this.contactModel.password = 'test123';
      this.customerContactApiService.createContact(this.contactModel).subscribe({
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

    if (this.contactModel.id > 0) {
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
