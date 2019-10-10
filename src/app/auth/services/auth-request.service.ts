import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {

  apiUrl='http://localhost:8000/api/v1/website/';

  constructor(private http:HttpClient) { }

  signUp(data){
   return this.http.post(this.apiUrl+'signup',data);
  }
  sigin(data){
    return this.http.post(this.apiUrl+'login',data);
  }
}
