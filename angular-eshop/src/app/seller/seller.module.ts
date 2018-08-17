import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HistoryComponent } from './history/history.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountComponent } from './account/account.component';
import { AddComponent } from './inventory/add/add.component';
import { ListComponent } from './inventory/list/list.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SchedulerItemComponent } from './scheduler/scheduler-item/scheduler-item.component';
import { OrdersItemComponent } from './orders/orders-item/orders-item.component';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule
  
  ],
  declarations: [
    SellerComponent,
    DashboardComponent,
    InventoryComponent,
    HistoryComponent,
    ReviewsComponent,
    OrdersComponent,
    AccountComponent,
    AddComponent,
    ListComponent,
    SchedulerComponent,
    SchedulerItemComponent,
    OrdersItemComponent
  ]
})
export class SellerModule { }
