import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orders } from '../../../core/model/product.model';
import { OrderService } from '../../../core/service/order.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  order = new Orders();

  ngOnInit() {

    this.order = this.orderService.order;
  }

}
