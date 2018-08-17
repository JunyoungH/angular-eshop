import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Account, Address } from '../../core/model/account.model';
import { AccountService } from '../../core/service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() modalParam:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private acccountService:AccountService) { }

  account = new Account();
  confirmPassword:string;

  showByUserType:boolean = false;

  ngOnInit() {
    this.account.userRole = "2";
  }

  redirectToSignIn(){
    this.modalParam.emit(false);
  }

  selectUserType(event){
    let tab = document.querySelectorAll('.user-type-tab div');
    Array.from(tab, (val, key)=>val.classList.remove('selected'));
    this.account.userRole = event.currentTarget.id;
    console.log(this.account.userRole);
    event.currentTarget.classList.add('selected');
    this.showByUserType = !this.showByUserType;
  }

  registerUser(){
    this.acccountService.createUser(this.account).subscribe(
      result=>this.redirectToSignIn(),
      error=>console.log(error)
    )
  }

}
