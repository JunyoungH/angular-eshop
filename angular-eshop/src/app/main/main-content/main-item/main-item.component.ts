import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Cart } from '../../../core/model/product.model';
import { CartService } from '../../../core/service/cart.service';


@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss']
})
export class MainItemComponent implements OnInit {

  
  @Input() product;
  @Input() idx;
  @Output() productDetail:EventEmitter<any> = new EventEmitter<any>();

  cart = new Cart();
  cartCounter:number;
  cartIn:boolean = false;

  constructor(private cartService:CartService, private elementRef:ElementRef) { }

  ngOnInit() {
    this.cart.product = this.product;
   if(localStorage.getItem('cart')){
    
     Array.from(JSON.parse(localStorage.getItem('cart')), (val:any, key)=>{
   
      if(val.product.productId === this.cart.product.productId ){
        console.log("cart in");
        this.cart = val;
        this.cartIn = true;
      }
     });
   }
  }


  inputValidation(){
    console.log(this.cart.orderedQuantity);
    if(!this.cart.orderedQuantity || this.cart.orderedQuantity <= 0 || isNaN(this.cart.orderedQuantity)){
      this.elementRef.nativeElement.querySelector('.update-button').disabled = true;
      this.elementRef.nativeElement.querySelector('.add-button').disabled = true;
      return false;
    }else{
      this.elementRef.nativeElement.querySelector('.add-button').disabled = false;
      this.elementRef.nativeElement.querySelector('.update-button').disabled = false;
      return true;
    }
  }

  addCart(event){
     if(this.inputValidation()){
      this.cartIn = true;
      this.cart.status = 0;
      this.cartService.addCart(this.cart);
     }
  }

  updateCart(event){
      this.cartService.updateCart(this.cart.product.productId, this.cart.orderedQuantity);
  }

  removeCart(event){
    this.cartService.removeCart(this.cart.product.productId);
    this.cartIn = false;
    this.cart.orderedQuantity = null;
  }

  productDetailView(){
    this.productDetail.emit(this.product);
  }

}
