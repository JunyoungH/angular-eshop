import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerComponent } from './seller.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HistoryComponent } from './history/history.component';
import { OrdersComponent } from './orders/orders.component';
import { AccountComponent } from './account/account.component';
import { SchedulerComponent } from './scheduler/scheduler.component';

const routes: Routes = [
  {path:'', component: SellerComponent,
    children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'inventory', component:InventoryComponent},
      {path:'reviews', component:ReviewsComponent},
      {path:'history', component:HistoryComponent},
      {path:'account', component:AccountComponent},
      {path:'orders', component:OrdersComponent},
      {path:'scheduler', component:SchedulerComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
