import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  attemptAuth(email:String, password:string){
    const credentials = {email:email, password:password};
    console.log(credentials);
    return this.http.post(`${this.baseUrl}/token/generate-token`, credentials);
  }
}
