import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthRequestService } from '../services/auth-request.service';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthStatusService } from '../services/auth-status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signin = {
    email: '',
    password: ''
  };
  isLoading=false;
  returnUrl: string;
  
  constructor(  private toastr: ToastrService,
                private authRequestService:AuthRequestService,
                private token:TokenService,
                private router:Router,
                private authStatus:AuthStatusService,
                private route: ActivatedRoute
                ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    if (this.validateRequest()) {
      this.isLoading=true;
      this.authRequestService.sigin(this.signin).subscribe(
        data => {
          this.isLoading=false;
          this.token.setUser(data);
          this.authStatus.changeAuthStatus(true);
         this.toastr.success(data['message']);
          this.router.navigateByUrl(this.returnUrl);
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

    if (this.signin.email === '') {
      this.toastr.warning('Email is required');
      return false;
    } else if (!emailRegex.test(String(this.signin.email).toLowerCase())) {
      this.toastr.warning('Please enter valid email address');
      return false;
    } else if (this.signin.password === '') {
      this.toastr.warning('Password is required');
      return false;
    } else {
      return true;
    }
  }
}
