import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule, Routes } from '@angular/router';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../../../modules/i18n';
import { CustomerLayoutComponent } from './customer-layout.component';
import { ExtrasModule } from 'src/app/_metronic/partials/layout/extras/extras.module';
import { Routing } from '../../../pages/routing';
import { AdminRoutingModule } from '../../admin/admin-routing.module';

import { ContentComponent } from 'src/app/_metronic/layout/components/content/content.component';
import { FooterComponent } from 'src/app/_metronic/layout/components/footer/footer.component';
import { ScriptsInitComponent } from 'src/app/_metronic/layout/components/scripts-init/scripts-init.component';
import { ToolbarComponent } from 'src/app/_metronic/layout/components/toolbar/toolbar.component';
import { TopbarComponent } from 'src/app/_metronic/layout/components/topbar/topbar.component';
import { PageTitleComponent } from 'src/app/_metronic/layout/components/header/page-title/page-title.component';
import { HeaderMenuComponent } from 'src/app/_metronic/layout/components/header/header-menu/header-menu.component';


import {
  DrawersModule,
  DropdownMenusModule,
  ModalsModule,
  EngagesModule,
} from 'src/app/_metronic/partials';
import { EngagesComponent } from 'src/app/_metronic/partials/layout/engages/engages.component';
import { ThemeModeModule } from 'src/app/_metronic/partials/layout/theme-mode-switcher/theme-mode.module';
import { SidebarComponent } from 'src/app/_metronic/layout/components/sidebar/sidebar.component';
import { SidebarLogoComponent } from 'src/app/_metronic/layout/components/sidebar/sidebar-logo/sidebar-logo.component';
import { SidebarMenuComponent } from 'src/app/_metronic/layout/components/sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarFooterComponent } from 'src/app/_metronic/layout/components/sidebar/sidebar-footer/sidebar-footer.component';
import { NavbarComponent } from 'src/app/_metronic/layout/components/header/navbar/navbar.component';
import { AccountingComponent } from 'src/app/_metronic/layout/components/toolbar/accounting/accounting.component';
import { ClassicComponent } from 'src/app/_metronic/layout/components/toolbar/classic/classic.component';
import { ExtendedComponent } from 'src/app/_metronic/layout/components/toolbar/extended/extended.component';
import { ReportsComponent } from 'src/app/_metronic/layout/components/toolbar/reports/reports.component';
import { SaasComponent } from 'src/app/_metronic/layout/components/toolbar/saas/saas.component';
import {SharedModule} from "src/app/_metronic/shared/shared.module";
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { CustomerSidebarComponent } from './components/customer-sidebar/customer-sidebar.component';
import { CustomerSidebarLogoComponent } from './components/customer-sidebar/customer-sidebar-logo/customer-sidebar-logo.component';
import { CustomerSidebarMenuComponent } from './components/customer-sidebar/customer-sidebar-menu/customer-sidebar-menu.component';
import { CustomerSidebarFooterComponent } from './components/customer-sidebar/customer-sidebar-footer/customer-sidebar-footer.component';
import { CustomerFooterComponent } from './components/customer-footer/customer-footer.component';
import { CustomerToolbarComponent } from './components/customer-toolbar/customer-toolbar.component';
import { CustomerPageTitleComponent } from './components/customer-header/customer-page-title/customer-page-title.component';
import { CustomerAccountingComponent } from './components/customer-toolbar/customer-accounting/customer-accounting.component';
import { CustomerExtendedComponent } from './components/customer-toolbar/customer-extended/customer-extended.component';
import { CustomerSaasComponent } from './components/customer-toolbar/customer-saas/customer-saas.component';
import { CustomerReportsComponent } from './components/customer-toolbar/customer-reports/customer-reports.component';
import { CustomerContentComponent } from './components/customer-content/customer-content.component';
import { CustomerScriptsInitComponent } from './components/customer-scripts-init/customer-scripts-init.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: Routing,
  },
 
];

@NgModule({
  declarations: [
    CustomerLayoutComponent,
    CustomerHeaderComponent,
    CustomerNavbarComponent,
    CustomerSidebarComponent,
    CustomerSidebarLogoComponent,
    CustomerSidebarMenuComponent,
    CustomerSidebarFooterComponent,
    CustomerFooterComponent,
    CustomerToolbarComponent,
    CustomerPageTitleComponent,
    CustomerAccountingComponent,
    CustomerExtendedComponent,
    CustomerSaasComponent,
    CustomerReportsComponent,
    CustomerContentComponent,
    CustomerScriptsInitComponent,
    // ContentComponent,
    // FooterComponent,
    // ScriptsInitComponent,
    // ToolbarComponent,
    // TopbarComponent,
    // PageTitleComponent,
    // HeaderMenuComponent,
    // EngagesComponent,
    // SidebarComponent,
    // SidebarLogoComponent,
    // SidebarMenuComponent,
    // SidebarFooterComponent,
    // NavbarComponent,
    // AccountingComponent,
    // ClassicComponent,
    // ExtendedComponent,
    // ReportsComponent,
    // SaasComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    // // ModalsModule,
    // DrawersModule,
    // // EngagesModule,
    // DropdownMenusModule,
    NgbTooltipModule,
    TranslateModule,
    ThemeModeModule,
    SharedModule
  ],
  exports: [RouterModule],
})
export class CustomerLayoutModule {}
