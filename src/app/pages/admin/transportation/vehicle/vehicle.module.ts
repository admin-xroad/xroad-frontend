import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListingComponent } from './vehicle-listing/vehicle-listing.component';
import { RouterModule } from '@angular/router';
import { CrudModule } from 'src/app/modules/crud/crud.module';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { vehicleStatusFormatPipe } from '../../../../pipes/admin/vehicle/vehicle-status-format.pipe';



@NgModule({
  declarations: [VehicleListingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: VehicleListingComponent,
      },
      // {
      //   path: ':id',
      //   component: UserDetailsComponent,
      // },
    ]),
    CrudModule,
    SharedModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SweetAlert2Module.forChild(),
  ]
})
export class VehicleModule { }
