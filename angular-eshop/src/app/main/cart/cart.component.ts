import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../../core/model/product.model';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartService } from '../../core/service/cart.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../../core/token.storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private cartService:CartService, private router:Router, private tokenStorage:TokenStorage) { }

  cartList:Cart[] = [];
  sellerCompanyName:string[] = [];
  cartResult = new Cart();
  totalPrice:number;

  cartSubscription:Subscription

  ngOnInit() {

    this.refreschCart();
    this.cartSubscription = this.cartService.cartRefresh.subscribe(result=>{
        this.totalPrice = result.totalPrice;
        if(result.cartSize < 1){
          this.router.navigateByUrl('/main');
        }
      });

    this.cartService.updateTotalPrice();
    this.cartService.setCartCount();

  }

  refreschCart(){

    if(localStorage.getItem('cart')){
      this.cartList = [];
      this.sellerCompanyName = [];
      Array.from(JSON.parse(localStorage.getItem('cart')), (val:Cart, key)=> {
        this.cartList.push(val);

      });

     }
  }

  toOrder(){

  !this.tokenStorage.getToken() ? this.cartService.openLoginModal()
                                : this.router.navigateByUrl('/order');
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
