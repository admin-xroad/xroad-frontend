
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from 'src/app/modules/auth/components/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/modules/auth/components/forgot-password/forgot-password.component';
import { LogoutComponent } from 'src/app/modules/auth/components/logout/logout.component';
import { AuthComponent } from 'src/app/modules/auth/auth.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from 'src/app/modules/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            component: LoginComponent,
            data: { returnUrl: window.location.pathname },
          },
          {
            path: 'registration',
            component: RegistrationComponent,
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent,
          },
          {
            path: 'logout',
            component: LogoutComponent,
          },
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: '**', redirectTo: 'login', pathMatch: 'full' },
        ],
      },
];

@NgModule({

    declarations: [
        LoginComponent,
        
    ],
    
    imports: [
        RouterModule.forChild(routes),
        // BrowserModule,
        CommonModule,
        FormsModule,

        // TranslationModule,
        ReactiveFormsModule,
    ],


    exports: [
        RouterModule
    ],
})
export class AuthRoutingModule {}
