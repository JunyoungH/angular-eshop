import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren:'./main/main.module#MainModule'},
  {path:'seller', loadChildren:'./seller/seller.module#SellerModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  // constructor(private router:Router){
  //   this.router.errorHandler = (error:any)=>{
  //     this.router.navigateByUrl('');
  //   }
  // }
}
