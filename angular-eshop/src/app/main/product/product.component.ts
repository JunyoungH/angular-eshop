import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Product } from '../../core/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  product:Product = new Product();
  productImage:String;

  constructor() { }

  ngOnInit() {
   
  }

  setProduct(productParam:Product){
    this.product = productParam;
    this.productImage = productParam.productImageList[0].name;
    console.log(this.product);
  }

  selectProductImage(imageParam){
    this.productImage = imageParam;
    console.log(imageParam);
  }
}
