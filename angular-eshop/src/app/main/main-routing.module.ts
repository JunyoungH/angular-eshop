import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { AddressComponent } from './address/address.component';
import { OrderConfirmComponent } from './order/order-confirm/order-confirm.component';

const routes: Routes = [
  {path:'', component:MainComponent, children:[
    {path:'main', component : MainContentComponent},
    {path:'cart', component : CartComponent},
    {path:'order', component : OrderComponent},
    {path:'order/confirm', component:OrderConfirmComponent},
    {path:'account/address/:accountId', component: AddressComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
