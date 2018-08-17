import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

import { InventoryService } from '../../../core/service/inventory.service';
import { Product } from '../../../core/model/product.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  productList:Product[] = [];

  displayedColumns = ['productId', 'name', 'category', 'countryOrigin', 'price'];
  dataSource:any;

  @ViewChild(MatSort) sort:MatSort;

  constructor(private inventoryService:InventoryService) {}


  ngOnInit() {

    
    this.inventoryService.getProductListByLoginEmail().subscribe(
      (result:any)=> {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.sort = this.sort;
      },
      error=>console.log(error)
    );

  }

  ngOnDestroy(){
    this.inventoryService.getProductListByLoginEmail().subscribe().unsubscribe();
  }

}
