import { Component, OnInit } from '@angular/core';
import { AuthRequestService } from '../services/auth-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signup = {
    email: '',
    name: '',
    password: '',
    password_confirmation: ''
  };
  isLoading=false;

  constructor(private authRequestService:AuthRequestService,
              private toastr: ToastrService,
              private router:Router
              ) { }

  ngOnInit() {
  }

  onSubmit(){
    if (this.validateRequest()) {
    this.isLoading=true;
    this.authRequestService.signUp(this.signup).subscribe(
      data=>{
        this.isLoading=false;
        this.toastr.success(data['message']);
        this.router.navigateByUrl('/signin');
      },
      error=>{
        this.isLoading=false;
        this.toastr.error(error.error.message);
      }
    );
    }
    }

    validateRequest() {
      // tslint:disable-next-line:max-line-length
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
      if (this.signup.name === '') {
        this.toastr.warning('Name is required');
        return false;
      } else if (this.signup.name.length > 200) {
        this.toastr.warning('Name length should be less than 200 characters');
        return false;
      } else if (this.signup.email === '') {
        this.toastr.warning('Email is required');
        return false;
      } else if (!emailRegex.test(String(this.signup.email).toLowerCase())) {
        this.toastr.warning('Please enter valid email address');
        return false;
      } else if (this.signup.email.length > 200) {
        this.toastr.warning('Email length should be less than 200 characters');
        return false;
      } else if (this.signup.password === '') {
        this.toastr.warning('Password is required');
        return false;
      } else if (this.signup.password_confirmation === '') {
        this.toastr.warning('Confirm Password is required');
        return false;
      } else if (this.signup.password.length < 8) {
        this.toastr.warning('Password length should be greater than 7 characters');
        return false;
      } else if (this.signup.password.length > 20) {
        this.toastr.warning('Password length should be less than 20 characters');
        return false;
      } else if (this.signup.password !== this.signup.password_confirmation) {
        this.toastr.warning('Password should be same');
        return false;
      } else {
        return true;
      }
    }
}
