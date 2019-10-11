import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthRequestService } from '../services/auth-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {

  public form = {
    email: null
  };
  isLoading=false;

  constructor(private toastr: ToastrService,
              private authRequestService:AuthRequestService,
              private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if (this.validateRequest()) {
      this.isLoading=true;
      this.authRequestService.sendPasswordResetLink(this.form).subscribe(
        data => {
          this.isLoading=false;
          this.toastr.success('Please Check your email');
          this.router.navigateByUrl('/signin');
        },
        error =>{
          this.isLoading=false;
          this.toastr.error(error.error.message);
        }
      );
    }
  }

  validateRequest() {
    // tslint:disable-next-line:max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.form.email === '') {
      this.toastr.warning('Email is required');
      return false;
    } else if (!emailRegex.test(String(this.form.email).toLowerCase())) {
      this.toastr.warning('Please enter valid email address');
      return false;
    } else {
      return true;
    }
  }

}
