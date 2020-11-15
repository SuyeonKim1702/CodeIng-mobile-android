import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class LoginService {

    baseUrl = 'http://3.34.74.250';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    checkEmail(email: string) {
        return this.httpClient.post(this.baseUrl+'/check-email',JSON.stringify({'email':email}),
            {headers: this.headers});

    }


    signUp(email: string, name: string, nickname: string, password: string, passwordConfirm: string, phonenumber: string){
        return this.httpClient.post(this.baseUrl+'/user',JSON.stringify(
            {'email':email, 'name': name, 'nickname': nickname, 'userpwd': password, 'userpwdConfirm': passwordConfirm, 'phonenumber': phonenumber}),
            {headers: this.headers});
    }

    login(email: string, password: string) {
        return this.httpClient.post(this.baseUrl+'/login',JSON.stringify({'email':email, 'userpwd': password}),
            {headers: this.headers});

    }

}
