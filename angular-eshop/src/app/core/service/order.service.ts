import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../model/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  

  baseUrl:string = 'http://localhost:8080/api/order';
  private orderConfirm = new Subject<any>();
  order = new Orders();

  addOrder(order:Orders){
    console.log(order);
    this.order = order;
    return this.http.post(`${this.baseUrl}/add`, order);
  }

  getOrderBySeller(){
    return this.http.get(`${this.baseUrl}/find/seller`);
  }
}
