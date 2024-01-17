import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/_metronic/layout/layout.component';
// import { LayoutComponent } from './customer-layout/layout.component';
import { RegistrationComponent } from 'src/app/modules/auth/components/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/modules/auth/components/forgot-password/forgot-password.component';
import { LogoutComponent } from 'src/app/modules/auth/components/logout/logout.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerDashboardComponent } from './customer-dashboard.component';


const routes: Routes = [
    
    {
        path:'',
        component:CustomerDashboardComponent,
    },

];
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    // TranslationModule,
  ],
  exports: [RouterModule],
})
export class CustomerDashboardModule {}


