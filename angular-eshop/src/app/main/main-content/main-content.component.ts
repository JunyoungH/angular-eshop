import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../core/service/inventory.service';
import { CartService } from '../../core/service/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../core/model/product.model';
import { ProductComponent } from '../product/product.component';
import { MainItemComponent } from './main-item/main-item.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  @ViewChild(ProductComponent) productComponent:ProductComponent;

  productList:Product[] = [];
  product:Product = new Product();

  constructor(private inventoryService:InventoryService, private cartService:CartService, private router:Router) {}

  ngOnInit() {
    this.inventoryService.getAllProductList().subscribe(
        (result:Product[]) => result.forEach((val, key)=>{
          this.productList.push(val);
        }),
        error => console.log(error)
    );

    this.cartService.setCartCount();
  }


  openProductModal(productParam){
    this.productComponent.setProduct(productParam);
    let elem = document.querySelector('#product-modal');
    M.Modal.init(elem).open();
  }

}
