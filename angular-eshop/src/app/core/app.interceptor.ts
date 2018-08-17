import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpUserEvent, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse } from "@angular/common/http";
import { TokenStorage } from "./token.storage";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private token:TokenStorage, private router:Router){}

    intercept(req:HttpRequest<any>, next: HttpHandler):Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>{
        let authReq = req;
        if(this.token.getToken() != null){
            authReq = req.clone({headers:req.headers.set(TOKEN_HEADER_KEY, 'Bearer' + this.token.getToken())});
        }
        return next.handle(authReq).pipe(tap(
            (err:any)=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status === 401){
                        this.router.navigateByUrl('user');
                    }
                }
            }
        ));
    }
}