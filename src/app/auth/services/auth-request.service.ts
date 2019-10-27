import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {

  apiUrl='http://localhost:8000/api/';

  constructor(private http:HttpClient) { }

  signUp(data){
   return this.http.post(this.apiUrl+'register',data);
  }
  sigin(data){
    return this.http.post(this.apiUrl+'login',data);
  }
  sendPasswordResetLink(data){
    return this.http.post(this.apiUrl+'password/reset',data);
  }
  changePassword(data){
    return this.http.post(this.apiUrl+'reset',data);
  }
  checkToken(data){
    return this.http.get(this.apiUrl+'find/'+data);
  }
}
