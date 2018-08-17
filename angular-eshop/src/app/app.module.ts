//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//component
import { AppComponent } from './app.component';

//core util
import { Interceptor } from './core/app.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenStorage } from './core/token.storage';
import * as M from 'materialize-css';

//service
import { AuthService } from './core/service/auth.service';
import { InventoryService } from './core/service/inventory.service';
import { CartService } from './core/service/cart.service';
import { AccountService } from './core/service/account.service';
import { AddressService } from './core/service/address.service';
import { OrderService } from './core/service/order.service';
import { SchedulerService } from './core/service/scheduler.service';


@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    InventoryService,
    TokenStorage,
    CartService,
    AccountService,
    AddressService,
    OrderService,
    SchedulerService,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
