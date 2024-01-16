import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/_metronic/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from 'src/app/modules/auth/components/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/modules/auth/components/forgot-password/forgot-password.component';
import { LogoutComponent } from 'src/app/modules/auth/components/logout/logout.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/layout/admin-auth.module').then((m) => m.AdminAuthModule),
  // },
  
  
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path: 'users',
        loadChildren: () => import('./user-management/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'customers',
        loadChildren: () => import('./contacts/customer/customer.module').then((m) => m.CustomerModule),
      },


    ]
    
  },

 
  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  // {
  //   path: 'crafted/pages/profile',
  //   loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  //   // data: { layout: 'light-sidebar' },
  // },
  // {
  //   path: 'crafted/account',
  //   loadChildren: () => import('../modules/account/account.module').then((m) => m.AccountModule),
  //   // data: { layout: 'dark-header' },
  // },
  // {
  //   path: 'crafted/pages/wizards',
  //   loadChildren: () => import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  //   // data: { layout: 'light-header' },
  // },
  // {
  //   path: 'crafted/widgets',
  //   loadChildren: () => import('../modules/widgets-examples/widgets-examples.module').then((m) => m.WidgetsExamplesModule),
  //   // data: { layout: 'light-header' },
  // },
  // {
  //   path: 'apps/chat',
  //   loadChildren: () => import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  //   // data: { layout: 'light-sidebar' },
  // },
 
  
  {
    path: 'customer-contacts',
    loadChildren: () => import('./contacts/customer-contact/customer-contact.module').then((m) => m.CustomerContactModule),
  },
  {
    path: 'drivers',
    loadChildren: () => import('./contacts/driver/driver.module').then((m) => m.DriverModule),
  },
  {
    path: 'roles',
    loadChildren: () => import('./user-management/role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'permissions',
    loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
  },
  {
    path: 'transportation/vehicles',
    loadChildren: () => import('./transportation/vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
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
export class AdminRoutingModule {}


