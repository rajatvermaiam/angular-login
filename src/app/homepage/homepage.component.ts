import { Component, OnInit } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { Router } from '@angular/router';
import { AuthStatusService } from '../auth/services/auth-status.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public loggedIn: boolean;

  constructor( private token: TokenService,
                private router:Router,
                private authStatus:AuthStatusService) { }

  ngOnInit() {
    this.authStatus.authStatus.subscribe(value=>this.loggedIn=value);
  }

  
  logout(){
    this.token.remove();
    this.authStatus.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }

}
