import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../core/service/order.service';
import { OrdersItemComponent } from './orders-item/orders-item.component';
import { Cart } from '../../core/model/product.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  cartList:Cart[] = [];

  ngOnInit() {
    this.orderService.getOrderBySeller().subscribe(
      (result:any)=>{
        Array.from(result, (val:Cart, key)=>{
          this.cartList.push(val);
        })
      },
      error=>console.log(error)
    );
    console.log(this.cartList);
  }

  ngOnDestroy(){
    this.orderService.getOrderBySeller().subscribe().unsubscribe();
  }

}
