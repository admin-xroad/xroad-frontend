import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/_metronic/layout/layout.component';
// import { LayoutComponent } from './customer-layout/layout.component';
import { RegistrationComponent } from 'src/app/modules/auth/components/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/modules/auth/components/forgot-password/forgot-password.component';
import { LogoutComponent } from 'src/app/modules/auth/components/logout/logout.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerLoginComponent } from './auth/login/customer-login.component';
import { AuthComponent } from '../admin/auth/layout/auth.component';
import { CustomerRegistrationComponent } from './auth/registration/customer-registration.component';
import { CustomerAuthLayoutComponent } from './auth/layout/customer-auth-layout/customer-auth-layout.component';
import { CustomerForgotPasswordComponent } from './auth/forgot-password/customer-forgot-password.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

const routes: Routes = [
    
    {
        path:'',
        component:AuthComponent,
        children:[
            {
                path: 'login',
                component:CustomerLoginComponent,
            },
            {
                path: 'registration',
                component:CustomerRegistrationComponent,
            },
            {
                path: 'forgot-password',
                component:CustomerForgotPasswordComponent,
            }

        ]
    },

    {
        path: 'dashboard',
        component:CustomerDashboardComponent,
        loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then((m) => m.CustomerDashboardModule),
    },

    {
        path: 'customer-layout',
        component:LayoutComponent,
        // loadChildren: () => import('./customer-layout/layout.module').then((m) => m.LayoutModule),
    },

    {
        path: 'builder',
        loadChildren: () => import('../admin/builder/builder.module').then((m) => m.BuilderModule),
    },

    {
        path: '**',
        redirectTo: 'error/404',
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
export class CustomerRoutingModule {}


