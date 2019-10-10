import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user.data));
  }

  getUser() {
    return localStorage.getItem('user');
  }

  getToken(){
    const user = this.getUser();
    if (user)
    return JSON.parse(user).token;
  }

  remove(){
    localStorage.removeItem('user');
  }

  loggedIn() {
    const user = this.getUser();
    if (user)
    {
    if (JSON.parse(atob(JSON.parse(user).token.split('.')[1])).sub==10)
    return true;
    else
    return false; 
    }
  }
}
