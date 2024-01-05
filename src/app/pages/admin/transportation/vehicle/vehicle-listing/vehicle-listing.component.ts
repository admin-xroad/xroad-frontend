import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { VehicleService } from 'src/app/services/admin/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-listing',
  templateUrl: './vehicle-listing.component.html',
  styleUrl: './vehicle-listing.component.scss',
})
export class VehicleListingComponent {
  datatableConfig: DataTables.Settings = {};

  swalOptions: SweetAlertOptions = {};

  constructor(private apiService: VehicleService, private cdr: ChangeDetectorRef) { }


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

        this.apiService.getVehicles(requestData).subscribe(resp => {
          console.log('resp', resp);
          
          callback(resp);
        });
      },
      columns: [
        {
          title: 'Id', data: 'id', render: function (data, type, full) {

            return `<span>${data}</span>`;
          }
        },
        {
          title: 'Name', data: 'name', render: function (data, type, full) {

            const name = `
              <div class="d-flex flex-column" data-action="view" data-id="${full.id}">
                <a href="admin/users/${full.id}" class="text-gray-800 text-hover-primary mb-1">${data}</a>
              </div>
            `;

            return `
              ${name}
            `;
          }
        },
        {
          title: 'Status', data: 'status', render: (data, type, full) => {
            const date = data || full.created_at;
            const dateString = moment(date).fromNow();
            return `<div class="badge badge-${full.status_color} fw-bold">${full.status_name}</div>`;
          }
        },
        {
          title: 'Created Date', data: 'created_at', render: function (data) {
            return moment(data).format('DD-MM-YYYY');;
          }
        }
      ],
      createdRow: function (row, data, dataIndex) {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
  }
  
}
