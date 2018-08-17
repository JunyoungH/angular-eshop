import { isNumber } from 'util';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../../../core/model/account.model';
import { AddressService } from '../../../core/service/address.service';
import { TokenStorage } from '../../../core/token.storage';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss']
})
export class AddressItemComponent implements OnInit {

  @Input() address:Address;
  @Input() addressFlag:boolean = false;
  @Output() addressType:EventEmitter<any> = new EventEmitter();

  shippingShow:boolean = false;
  billingShow:boolean = false;

  constructor(private addressService:AddressService, private tokenStorage:TokenStorage) { }

  ngOnInit() {
    this.address.addressTypeList.forEach((val, key)=>{
      if(val.addressType === 1){
        this.shippingShow = !this.shippingShow;
      }else if(val.addressType === 2){
        this.billingShow = !this.billingShow;
      }
    });
  }

  setAddressType(addreType:number){

    this.address.addressType = addreType;
    this.address.addressId = this.address.addressId;
    this.address.accountId = this.tokenStorage.getDecodedToken().accountId;
    this.addressService.setAddressType(this.address).subscribe(
      (result:any)=>this.addressType.emit(result),
      error=>console.log(error)
    )
  }
}
