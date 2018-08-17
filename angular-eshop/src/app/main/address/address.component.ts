import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Address } from '../../core/model/account.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../core/service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  address = new Address();
  addressList:Address[] = [];

  shipplingAddress = new Address();;
  billingAddress = new Address();

  constructor(private addressService:AddressService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=>this.address.accountId = params.accountId);
    this.refreshList();
  }

  addAddress(){
    this.addressList = [];
    this.route.params.subscribe((params:any)=>this.address.accountId = params.accountId);
    this.addressService.addAddress(this.address).subscribe(
      (result:any)=>result.forEach((val, key)=>{
        this.addressList.push(val);
        this.getShippingAndBillingAddress(val);
      }),
      error=>console.log(error)
    );
  }

  getShippingAndBillingAddress(storedAddress:Address){
    storedAddress.addressTypeList.forEach((val,key)=>{
      if(val.addressType === 1){
        this.shipplingAddress = storedAddress;
      }else if(val.addressType ===2){
        this.billingAddress= storedAddress;
      }
    });
  }

  setShippingAndBillingAddress(params:any){

    this.refreshList();
  }

  refreshList(){
    this.addressList = [];
    this.addressService.getAllAddress(this.address.accountId).subscribe(
      (result:any)=>result.forEach((val, key)=>{
        this.addressList.push(val);
        this.getShippingAndBillingAddress(val);
      }),
      error=>console.log(error)
    );
  }

  backPage(){
    window.history.back();
  }

}
