import { AddressItemComponent } from '../address/address-item/address-item.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { Component, OnInit } from '@angular/core';
import { Cart, Orders } from '../../core/model/product.model';
import { CartService } from '../../core/service/cart.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../core/token.storage';
import { Address } from '../../core/model/account.model';
import { Subscription } from 'rxjs';
import { AddressService } from '../../core/service/address.service';
import { OrderService } from '../../core/service/order.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{


  constructor(
    private cartService:CartService,
    private addressService:AddressService,
    private orderService:OrderService,
    private router:Router,
    private tokenStorage:TokenStorage) { }

  cartList:Cart[] = [];
  sellerCompanyName:string[] = [];
  cartResult = new Cart();
  order = new Orders();
  totalPrice:number;
  accountId:string;
  addressShow:boolean = false;
  cartSubscription:Subscription;
  accountSubscription:Subscription;

  shippingAddress:Address = new Address();
  billingAddress:Address = new Address();

  ngOnInit() {

    this.refreschCart();
    this.cartSubscription = this.cartService.cartRefresh.subscribe(result=>{
        this.totalPrice = result.totalPrice;
        if(result.cartSize < 1){
          this.router.navigateByUrl('/main');
        }
      });
    this.accountId = this.tokenStorage.getDecodedToken().accountId;
    this.getAddress();
    this.cartService.updateTotalPrice();
    this.cartService.setCartCount();


  }

  refreschCart(){

    if(localStorage.getItem('cart')){
      Array.from(JSON.parse(localStorage.getItem('cart')), (val:Cart, key)=> {
        val.totalPrice = val.orderedQuantity * val.product.price;
        this.cartList.push(val);

      });

     }
  }

  getAddress(){
    this.addressService.getDefaultAddress(this.accountId).subscribe(
      (result:any)=>{
        if(result.length > 0){
          result.forEach((addr:Address, key)=>{
            addr.addressTypeList.forEach((type, key)=>{

              if(type.addressType === 1){
                this.shippingAddress = addr;
              }else if(type.addressType === 2){
                this.billingAddress = addr;
              }
            });
          });
        }
      },
      error=>console.log(error)
    );

  }

  toEditAddress(){
    this.router.navigateByUrl(`/account/address/${this.accountId}`);
  }

  confrimOrder(){
    this.order.totalPrice = this.totalPrice;
    this.order.cartList = this.cartList;
    this.order.addressList.push(this.shippingAddress);
    this.order.addressList.push(this.billingAddress);
    this.orderService.addOrder(this.order).subscribe(
      result=>{
        this.cartService.clearCart();
        this.router.navigateByUrl('/order/confirm')
      },
      error=>console.log(error)
    );

  }


}
