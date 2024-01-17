import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';
import { LayoutComponent } from './_metronic/layout/layout.component';
import { AdminAuthGuard } from './pages/admin/guards/admin-auth.guard';
import { LoginComponent } from './pages/admin/auth/login/login.component';
import { CustomerLoginComponent } from './pages/customer/auth/login/customer-login.component';
import { CustomerAuthLayoutComponent } from './pages/customer/auth/layout/customer-auth-layout/customer-auth-layout.component';
import { AppComponent } from './app.component';
import { CustomerDashboardComponent } from './pages/customer/customer-dashboard/customer-dashboard.component';
import { CustomerLayoutComponent } from './pages/customer/customer-layout/customer-layout.component';

export const routes: Routes = [
  {
    path: 'admin/auth',
    loadChildren: () =>
      import('./pages/admin/auth/admin-auth-routing.module').then((m) => m.AdminAuthRoutingModule),
  },

  {
    path: 'admin',
    canActivate:[AdminAuthGuard],
    loadChildren: () =>
      import('./pages/admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },


  {
    path: '',
    // component: LayoutComponent,
    loadChildren: () =>
      import('./pages/customer/customer-routing.module').then((m) => m.CustomerRoutingModule),

  },
  
  
  
  
  
  
  
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  // },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
