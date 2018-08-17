import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TimerComponent } from './timer/timer.component';
import { MainContentComponent } from './main-content/main-content.component';

import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { MainItemComponent } from './main-content/main-item/main-item.component';
import { OrderComponent } from './order/order.component';
import { OrderItemComponent } from './order/order-item/order-item.component';
import { AddressComponent } from './address/address.component';
import { AddressItemComponent } from './address/address-item/address-item.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { CreditCardItemComponent } from './credit-card/credit-card-item/credit-card-item.component';
import { OrderConfirmComponent } from './order/order-confirm/order-confirm.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    TimerComponent,
    MainContentComponent,
    CartComponent,
    CartItemComponent,
    MainItemComponent,
    OrderComponent,
    OrderItemComponent,
    AddressComponent,
    AddressItemComponent,
    CreditCardComponent,
    CreditCardItemComponent,
    OrderConfirmComponent,
    ProductComponent,

  ],
  imports: [

    MainRoutingModule,
    FormsModule,
    CommonModule
  ]
})
export class MainModule { }
