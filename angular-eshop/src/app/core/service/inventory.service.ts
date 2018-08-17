import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseUrl = 'http://localhost:8080/api/products';

  constructor(private http:HttpClient) { }

  saveProduct(product:Product, imageList:File[])
  {
    let formData = new FormData();
    imageList.forEach((val, key)=>formData.append('imageList[]', val));
    //formData.append('imageList[]', JSON.stringify(imageList));
    formData.append('product', JSON.stringify(product));

    return this.http.post(`${this.baseUrl}/add`, formData);
  }

  getProductListByLoginEmail(){
    return this.http.get(`${this.baseUrl}/my-products`);    
  }

  getAllProductList(){
    return this.http.get(`${this.baseUrl}/all-products`);    
  }


}
