import { Injectable } from "@angular/core";

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage{

    constructor(){}

    logOut(){
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.clear();
    }

    public saveToken(token:string){
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(){
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public getDecodedToken(){
        let jwtData = this.getToken().split('.')[1];
        return JSON.parse(window.atob(jwtData));
    }

}