import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TokenStorage } from '../core/token.storage';
import { TimerComponent } from './timer/timer.component';
import { CartService } from '../core/service/cart.service';
import { Cart } from '../core/model/product.model';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  
  constructor(private router:Router, private cartService:CartService, private tokenStorage:TokenStorage) { }

  show = false;
  login = false;
  username:string;
  cartCounter:number;

  cartSubscription:Subscription;

  ngOnInit() {
    this.router.navigateByUrl('/main');
    this.getTokenFromSession();
    this.loadCartFromLocalStorage();

    this.cartSubscription = this.cartService.cartRefresh.subscribe(result=> {
  
      this.cartCounter = result.cartSize;
      if(this.cartCounter > 0){
        document.querySelector('.cart-button').classList.add('full');
      }else{
        this.cartCounter = null;
        document.querySelector('.cart-button').classList.remove('full');
      }              
    });

    this.cartService.cartLoginEvent.subscribe(result=>this.openModal(false));

  }


  loadCartFromLocalStorage(){
    if(localStorage.getItem('cart')){
      Array.from(JSON.parse(localStorage.getItem('cart')), (val:Cart, key)=>{
        this.cartService.cartList.push(val);
      });
    }
  }


  openModal(param){
    this.show = param;
    this.initModal().open();
  }

  redirectAction(childParam:boolean){
    this.show = childParam;
  }

  closeModal(childParam:boolean){
    if(childParam){
      this.getTokenFromSession();
      this.initModal().close();
    }
  }

  initModal(){
    let elem = document.querySelector('#sign-modal');
    return M.Modal.init(elem);
  }

  logOut(){
    this.login = !this.login;
    this.tokenStorage.logOut();
    this.router.navigateByUrl('/main');
  }

  getTokenFromSession(){

    if(this.tokenStorage.getToken()){
      let sessionToken = this.tokenStorage.getDecodedToken();
      this.login = !this.login;

      if(sessionToken.scopes[0].authority==='SELLER')
        this.router.navigateByUrl('/seller');
    }

  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
