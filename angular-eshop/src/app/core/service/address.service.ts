import { Injectable } from '@angular/core';
import { Address } from '../model/account.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = 'http://localhost:8080/api/address'
  addrAddrTypeId:string;
  address:Address = new Address();
  constructor(private http:HttpClient) { }

  addAddress(address:Address){
    console.log(address);
    return this.http.post(`${this.baseUrl}/add/address`, address);
  }

  getAllAddress(accountId:string){
    console.log(accountId);
    return this.http.get(`${this.baseUrl}/find/address/${accountId}`);
  }

  getDefaultAddress(accountId:string){
    return this.http.get(`${this.baseUrl}/find/address-default/${accountId}`)
  }

  setAddressType(addressParam:Address){
    this.address = addressParam;
    console.log(this.address.addressId);
    return this.http.post(`${this.baseUrl}/add/address-type`, this.address);
  }


}
