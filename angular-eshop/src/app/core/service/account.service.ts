import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account, Address } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http:HttpClient) { }

  baseUrl:string = 'http://localhost:8080/api/account';

  createUser(account:Account){
    console.log(account);
    return this.http.post(`${this.baseUrl}/register`, account);
  }

  findByEmail(email:string){
    return this.http.get(`${this.baseUrl}/find/${email}`);
  }

}
