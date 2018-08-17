import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { TokenStorage } from '../../core/token.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() modalParam:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loginSuccessChecker:EventEmitter<boolean> = new EventEmitter<boolean>(); 

  constructor(private authService:AuthService, private token:TokenStorage, private router:Router) { }

  email:string;
  password:string;
  decodedToken:any;

  ngOnInit() {
  }


  login(){
    this.authService.attemptAuth(this.email, this.password).subscribe(
      (data:any)=>{
        this.token.saveToken(data.token);
        this.decodedToken = this.token.getDecodedToken();
        this.decodedToken.scopes[0].authority==='SELLER'?
          this.router.navigateByUrl('/seller'):this.closeModal();

      },
      result=>{
        if(result.status === 401){
          console.log(result);
        }
      }
    );
  }

  redirectToRegister(){
    console.log(true);
    this.modalParam.emit(true);
  }

  closeModal(){
    this.loginSuccessChecker.emit(true);
  }
}
