import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';
import { LayoutComponent } from './_metronic/layout/layout.component';

export const routes: Routes = [
  {
    path: 'admin/auth',
    loadChildren: () =>
      import('./pages/admin/auth/admin-auth-routing.module').then((m) => m.AdminAuthRoutingModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin-routing.module').then((m) => m.AdminRoutingModule),
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
