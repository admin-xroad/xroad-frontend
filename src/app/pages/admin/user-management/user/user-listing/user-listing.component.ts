import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { ApiResponse, DataTablesResponse, IUserModel, UserService } from 'src/app/services/admin/user/user.service';
import { SweetAlertOptions } from 'sweetalert2';
import moment from 'moment';
import { RoleService } from 'src/app/services/admin/role/role.service';
import { ILiveSearchModel, LiveSearchService } from 'src/app/services/admin/live-search/live-search.service';
import { Select2Group, Select2Option, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit, AfterViewInit, OnDestroy {

  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsedFilter = true;

  isLoading = false;

  users: DataTablesResponse;

  datatableConfig: DataTables.Settings = {};

  // Reload emitter inside datatable
  reloadEvent: EventEmitter<boolean> = new EventEmitter();

  // Single model
  // aUser: Observable<ApiResponse>;
  userModel: IUserModel = { id: 0, name: '', email: '', roles: [], };

  liveSearchModel: ILiveSearchModel = { value: "", label: "" };

  @ViewChild('noticeSwal')
  noticeSwal!: SwalComponent;

  swalOptions: SweetAlertOptions = {};

  roles$: Observable<DataTablesResponse>;

  verifiedOption = [
    { value: "", label: 'All' },
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' },
  ];
  verifiedValue = "";

  rolesListOption: (Select2Option | Select2Group)[] = [];
  selectedRolesOption: (Select2Option | Select2Group)[] = [];
  selectedRoles: number[] = [];


  constructor(private apiService: UserService, private liveSearchApi: LiveSearchService, private roleService: RoleService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadUserDataTable();
    this.roles$ = this.roleService.getRoles();
  }

  loadUserDataTable(isFiltered = false) {
    console.log("loadUserDataTable");

    this.datatableConfig = {
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Include additional filter data
        const additionalFilters = {};
        if (isFiltered) {
          const additionalFilters = {
            // Add your additional filter properties here
            filter_verification: this.verifiedValue,
          };
        }

        // Merge additional filters with the DataTables parameters
        const requestData = { ...dataTablesParameters, ...additionalFilters };

        this.apiService.getUsers(requestData).subscribe(resp => {
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
                <a href="admin/users/${full.id}" class="text-gray-800 text-hover-primary mb-1">${data}</a>
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
          title: 'Role', data: 'roles', render: function (data, type, row) {
            if (Array.isArray(row.roles)) {
              return row.roles.map(function (role: any) {
                const color = ['info', 'success', 'warning', 'danger', 'primary'][Math.floor(Math.random() * 5)];
                return `<a href="#" class="badge fs-7 m-1 badge-light-${color}">${role.name}</a>`;
              }).join('');
            } else {
              return '';
            }
          },
          orderData: [1],
          orderSequence: ['asc', 'desc'],
          type: 'string',
        },
        {
          title: 'Last Login', data: 'last_login_at', render: (data, type, full) => {
            const date = data || full.created_at;
            const dateString = moment(date).fromNow();
            return `<div class="badge badge-light fw-bold">${dateString}</div>`;
          }
        },
        {
          title: 'Joined Date', data: 'created_at', render: function (data) {
            return moment(data).format('DD MMM YYYY, hh:mm a');;
          }
        }
      ],
      createdRow: function (row, data, dataIndex) {
        $('td:eq(0)', row).addClass('d-flex align-items-center');
      },
    };
  }

  filterApplied() {
    console.log("filter Applied", this.verifiedValue);

    // this.loadUserDataTable(true);
    this.reloadEvent.emit(true);
  }

  resetFilter() {
    console.log("filter Reset");
    // this.loadUserDataTable(false);
    this.reloadEvent.emit(true);
  }

  delete(id: number) {
    this.apiService.deleteUser(id).subscribe(() => {
      this.reloadEvent.emit(true);
    });
  }

  edit(id: number) {
    this.apiService.editUser(id).subscribe((response: ApiResponse) => {
      this.userModel = response.data;

      const roles = response.data.roles || [];
      this.selectedRoles = roles.map(role => role.id || 0);

      this.rolesListOption = roles.map(role => ({
        value: role.id || 0,
        label: role.name || ''
      }));
      this.selectedRolesOption = [...this.rolesListOption]
      console.log(this.rolesListOption, this.selectedRoles);

    });
  }

  searchRoles(event: Select2SearchEvent) {
    const searchTerm = event.search;
    if (searchTerm) {
      this.liveSearchApi.searchLiveRelational(searchTerm, 'Role', 'id', 'name', 'name', 'guard_name', 'web',).subscribe(searchResults => {
        this.rolesListOption = [...new Set([...this.selectedRolesOption, ...searchResults])];
      });
    }
  }

  updateRoles(event: Select2UpdateEvent<any>) {
    this.selectedRolesOption = event.options;
    console.log(this.selectedRolesOption);
  }

  create() {
    this.userModel = { id: 0, name: '', email: '', };
    this.selectedRoles = [];
  }

  onSubmit(event: Event, myForm: NgForm) {

    if (myForm && myForm.invalid) {
      return;
    }

    this.isLoading = true;

    const successAlert: SweetAlertOptions = {
      icon: 'success',
      title: 'Success!',
      text: this.userModel.id > 0 ? 'User updated successfully!' : 'User created successfully!',
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
      this.apiService.updateUser(this.userModel.id, this.userModel, this.selectedRoles).subscribe({
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
      this.userModel.password = 'test123';
      this.apiService.createUser(this.userModel, this.selectedRoles).subscribe({
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

    if (this.userModel.id > 0) {
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