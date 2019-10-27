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
    const token = this.getToken();
    if (token)
    {
    if (JSON.parse(atob(token.split('.')[0])).alg=='RS256')
    return true;
    else
    return false; 
    }
  }
}
