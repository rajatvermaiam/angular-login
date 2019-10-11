import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { BeforeLoginService } from './services/before-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../effects/core.mosule';
import { LoadingSpinnerComponent } from '../effects/loading-spinner/loading-spinner.component';
import {RequestPasswordResetComponent} from '../auth/request-password-reset/request-password-reset.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        RequestPasswordResetComponent,
        ResetPasswordComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule, 
        HttpClientModule,
        CoreModule,
        RouterModule.forChild([
            {
              path: 'signin',
              component: LoginComponent,
              canActivate:[BeforeLoginService]
           },
           {
            path: 'signup',
            component: SignupComponent,
            canActivate:[BeforeLoginService]
            },
            {
              path: 'request-reset-password',
              component: RequestPasswordResetComponent,
              canActivate:[BeforeLoginService]
            },
            {
              path: 'response-password-reset',
              component: ResetPasswordComponent,
              canActivate:[BeforeLoginService]
            },
            { 
              path: '**',
              component:LoadingSpinnerComponent
            }
        ])
      ]
})
export class AuthModule{}