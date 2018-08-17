import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Cart } from '../../../core/model/product.model';
import { CartService } from '../../../core/service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cart:Cart;
  @Output() refreshCart:EventEmitter<any> = new EventEmitter();

  
  constructor(private cartService:CartService, private elementRef:ElementRef) { }

  ngOnInit() {
    
  }

  inputValidation(){
    
    if(!this.cart.orderedQuantity || this.cart.orderedQuantity <= 0 || isNaN(this.cart.orderedQuantity)){
      this.elementRef.nativeElement.querySelector('.update-button').disabled = true;
    }else{
      this.elementRef.nativeElement.querySelector('.update-button').disabled = false;
    }
  }


  updateCart(event){
    
    this.cartService.updateCart(this.cart.product.productId, this.cart.orderedQuantity);
  }

  removeCart(event){
    this.cartService.removeCart(this.cart.product.productId);
    this.cart.orderedQuantity = null;
    this.refreshCart.emit();
  }

}
