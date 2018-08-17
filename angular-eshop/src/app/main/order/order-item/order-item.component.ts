import { Component, OnInit, Input } from '@angular/core';
import { Cart } from '../../../core/model/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() cart:Cart;
  company:string;

  constructor() { }

  ngOnInit() {
  }


}
