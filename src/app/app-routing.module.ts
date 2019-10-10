import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BeforeLoginService } from './auth/services/before-login.service';
import { AfterLoginService } from './auth/services/after-login.service';
import { LoadingSpinnerComponent } from './effects/loading-spinner/loading-spinner.component';

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent,
    canActivate: [AfterLoginService]
  },
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
    path: '**',
    component:LoadingSpinnerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
