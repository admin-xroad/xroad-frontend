import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { NgModule } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import {
  VehicleService,
  IVehicleModel,
  DataTablesResponse,
  ApiResponse,
} from 'src/app/services/admin/vehicle/vehicle.service';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-vehicle-listing',
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
})
export class VehicleListingComponent {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsedFilter = true;

  isLoading = false;
  verifiedValue = '';

  customers: DataTablesResponse;

  datatableConfig: DataTables.Settings = {};

  swalOptions: SweetAlertOptions = {};
  statusValues = [0, 1];
  vehicleModel: IVehicleModel = {
    id: 0,
    name: '',
    note: '',
    status: undefined,
  };
  
  statusOption = [
    // { value: "", label: 'All' },
    { value: 0, label: 'Inactive' },
    { value: 1, label: 'Active' },
  ];
  statusValue = "";


  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  constructor(
    private vehicleApiService: VehicleService,
    private cdr: ChangeDetectorRef,
  ) {}

  // Reload emitter inside datatable
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {

    this.datatableConfig = {
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        console.log(dataTablesParameters);
        // Include additional filter data
        const additionalFilters = {
          // Add your additional filter properties here
          customFilter1: 'value1',
          customFilter2: 'value2',
        };

        // Merge additional filters with the DataTables parameters
        const requestData = { ...dataTablesParameters, ...additionalFilters };

        this.vehicleApiService.getVehicles(requestData).subscribe((resp) => {
          console.log('resp', resp);

          callback(resp);
        });
      },
      columns: [
        {
          title: 'Id',
          data: 'id',
          render: function (data, type, full) {
            return `<span>${data}</span>`;
          },
        },
        {
          title: 'Name',
          data: 'name',
          render: function (data, type, full) {
            const name = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                <a href="admin/transportation/vehicles" class="text-gray-800 text-hover-primary mb-1">${data}</a>
              </div>
            `;

            return `
              ${name}
            `;
          },
        },
        {
          title: 'Status',
          data: 'status',
          render: (data, type, full) => {
            const date = data || full.created_at;
            const dateString = moment(date).fromNow();
            return `<div class="badge badge-${full.status_color} fw-bold">${full.status_name}</div>`;
          },
        },
        {
          title: 'Created Date',
          data: 'created_at',
          render: function (data) {
            return moment(data).format('DD-MM-YYYY');
          },
        },
      ],
      createdRow: function (row, data, dataIndex) {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
  }

  filterApplied() {
    console.log('filter Applied', this.verifiedValue);

    // this.loadCustomerDataTable(true);
    this.reloadEvent.emit(true);
  }

  resetFilter() {
    console.log('filter Reset');
    // this.loadCustomerDataTable(false);
    this.reloadEvent.emit(true);
  }

  delete(id: number) {
    this.vehicleApiService.deleteVehicle(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.vehicleApiService.edit(id).subscribe((response: ApiResponse) => {
      this.vehicleModel = response.data;
      console.log(this.vehicleModel);
    });
  }

  create() {
    this.vehicleModel = { id: 0, name: '', note: '' };
  }

  onSubmit(event: Event, myForm: NgForm) {
    console.log(this.vehicleModel);

    if (myForm && myForm.invalid) {
      return;
    }
    // return;

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Success!',
      text:
        this.vehicleModel.id > 0
          ? 'Vehicle updated successfully!'
          : 'Vehicle created successfully!',
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
      this.vehicleApiService
        .updateVehicle(this.vehicleModel.id, this.vehicleModel)
        .subscribe({
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
      this.vehicleApiService.createVehicle(this.vehicleModel).subscribe({
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

    if (this.vehicleModel.id > 0) {
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
    this.swalOptions = Object.assign(
      {
        buttonsStyling: false,
        confirmButtonText: 'Ok, got it!',
        customClass: {
          confirmButton: 'btn btn-' + style,
        },
      },
      swalOptions
    );
    this.cdr.detectChanges();
    this.noticeSwal.fire();
  }

  ngOnDestroy(): void {
    this.reloadEvent.unsubscribe();
  }
}
