import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  constructor(private router:Router, private tokenStorage:TokenStorage) { }

  parentPath:string = 'seller';

  ngOnInit() {
 
    this.router.navigateByUrl(`${this.parentPath}/dashboard`);
    let elems = document.querySelectorAll('.order');
    let options = {hover:true, coverTrigger:false, constrainWidth:false};
    let instances = M.Dropdown.init(elems, options);
  }

  navSelector(event){
    let leftNav = document.querySelectorAll('.left-nav-content li');
    Array.from(leftNav, (val, key)=>val.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
  }

  
  logOut(){

    this.tokenStorage.logOut();
    this.router.navigateByUrl('/');
  }
}
