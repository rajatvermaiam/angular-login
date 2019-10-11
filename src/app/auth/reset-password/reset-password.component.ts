import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthRequestService } from '../services/auth-request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public form = {
    email: null,
    password: '',
    password_confirmation: '',
    resetToken: null
  };
  public isLoading=false;

  constructor(private toastr: ToastrService,
              private authRequestService:AuthRequestService,
              private router:Router,
              private route: ActivatedRoute) { 
                route.queryParams.subscribe(params => {
                  this.form.resetToken = params['token'];
                });
              }

  ngOnInit() {
  }

  onSubmit(){
    if(this.validateRequest()){
      this.isLoading=true;
      this.authRequestService.changePassword(this.form).subscribe(
        data => {
          this.isLoading=false;
          this.toastr.success('Password successfully changed.');
          this.router.navigateByUrl('/signin');
        },
        error => {
          this.isLoading=false;
          this.toastr.error(error.error.message);
          this.router.navigateByUrl('/signin');
        }
      );
    }
  }

  validateRequest() {

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.form.email === '') {
      this.toastr.warning('Email is required');
      return false;
    } else if (!emailRegex.test(String(this.form.email).toLowerCase())) {
      this.toastr.warning('Please enter valid email address');
      return false;
    }else if (this.form.password === '') {
      this.toastr.warning('Password is required');
      return false;
    } else if (this.form.password_confirmation === '') {
      this.toastr.warning('Confirm Password is required');
      return false;
    } else if (this.form.password.length < 6) {
      this.toastr.warning('Password length should be greater than 6 characters');
      return false;
    } else if (this.form.password.length > 20) {
      this.toastr.warning('Password length should be less than 20 characters');
      return false;
    } else if (this.form.password !== this.form.password_confirmation) {
      this.toastr.warning('Password should be same');
      return false;
    } else {
      return true;
    }
  }
}
