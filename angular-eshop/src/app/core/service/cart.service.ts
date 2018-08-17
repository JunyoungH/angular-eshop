import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<any>([]);
  private cartLogin = new Subject<any>();

  cartLoginEvent = this.cartLogin.asObservable();
  cartRefresh = this.cart.asObservable();
    
  totalPrice:number = 0;
  cartDetail = {cartSize:0, totalPrice:0}
  cartList:Cart[] = [];

  constructor() { }

  openLoginModal(){
    this.cartLogin.next();
  }

  setCartCount(){
    this.cartDetail.cartSize = this.cartList.length
    this.cart.next(this.cartDetail);
  }

  setTotalPrice() {
    this.cart.next(this.cartDetail);
  }

  addCart(cart:Cart){

    this.cartList.push(cart);
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    this.setCartCount();

    console.log(JSON.parse(localStorage.getItem('cart')));
  }

  updateCart(productId:string, quantity:number){
    this.cartList.map((cart)=>{
      if(cart.product.productId === productId) {
        cart.orderedQuantity = quantity;
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    console.log(JSON.parse(localStorage.getItem('cart')));
    this.updateTotalPrice();

  }

  removeCart(productId:string){
    console.log(productId);
    this.cartList.forEach((cart, idx)=>{
      if(cart.product.productId === productId) {
        this.cartList.splice(idx, 1);
      }
    });
    this.setCartCount();
    localStorage.setItem('cart', JSON.stringify(this.cartList));
    console.log(JSON.parse(localStorage.getItem('cart')));
    this.updateTotalPrice();
  }

  updateTotalPrice(){
    this.cartDetail.totalPrice = 0;
    this.cartList.forEach((cart, idx)=>{
      this.cartDetail.totalPrice += cart.product.price*cart.orderedQuantity;
    });
    this.setTotalPrice();
  }

  clearCart(){
    localStorage.removeItem('cart');
    this.cartList = [];
    this.setCartCount();
  }

}
