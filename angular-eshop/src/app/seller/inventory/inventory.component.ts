import { Component, OnInit } from '@angular/core';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  switch:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  switchTab(param:boolean){
    this.switch = param;
    Array.from(document.querySelectorAll('li'), (val, key)=>val.classList.remove('clicked'));

    this.switch ? document.querySelector('#add').classList.add('clicked')
                : document.querySelector('#list').classList.add('clicked');
 
  }
}
