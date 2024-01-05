import { Routes } from '@angular/router';

const AdminRouting: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
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
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'customers',
    loadChildren: () => import('./contacts/customer/customer.module').then((m) => m.CustomerModule),
  },
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
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'permissions',
    loadChildren: () => import('./permission/permission.module').then((m) => m.PermissionModule),
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

export { AdminRouting };
