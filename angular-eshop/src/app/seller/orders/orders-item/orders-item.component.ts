import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../../core/model/product.model';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent implements OnInit {

  @Input() cart:Cart;

  constructor() { }

  ngOnInit() {
    console.log(this.cart);
    if(!this.cart.actualQuantity)this.cart.totalPrice = 0;
  }

  setTotalPrice(){
    this.cart.totalPrice = this.cart.product.price * this.cart.actualQuantity;
  }

  updateOrder(){
    console.log(this.cart);
  }

}
