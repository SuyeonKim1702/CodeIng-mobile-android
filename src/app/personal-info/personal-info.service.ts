import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
    getString,

} from "@nativescript/core/application-settings";

// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class PersonalInfoService {

    baseUrl = 'https://www.coconerd.tk';
    headers: HttpHeaders;

    constructor(private httpClient:HttpClient) {

    }

    checkPassword(jwt: string, password: string) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.post(this.baseUrl+'/check-password',JSON.stringify({'userpwd':password}),
            {headers: this.headers});


    }

    getPersonalInfo(jwt: string) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/personal-info',{
            headers: this.headers});

    }

    /*
    patchPersonalInfo(jwt: string, email: string, name: string, nickname: string, phonenumber: string, password: string, passwordConfirm: string) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        const body = {
            'email' : email,
            'name' : name,
            'nickname': nickname,
            'phonenumber': phonenumber,
            'userpwd': password,
            'userpwdConfirm': passwordConfirm

        }

        console.log(body)

        return this.httpClient.patch(this.baseUrl+'/personal-info',
            body,{
            headers: this.headers});

    }

*/




    patchPersonalInfo(jwt: string, email:string, name:string,nickname:string, phonenumber:string, userpwd:string, userpwdConfirm:string){

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });



        const body = JSON.stringify({email, userpwd, userpwdConfirm, name, phonenumber, nickname});
        /*
        const body = {
          'email' : email,
          'name' : name,
          'nickname': nickname,
          'phonenumber': phonenumber,
          'userpwd': userpwd,
          'userpwdConfirm': userpwdConfirm
        };
        */
        console.log('personalInfo 수정');
        console.log(body);
        return this.httpClient.patch(this.baseUrl + '/personal-info', body, {headers: this.headers});
    }












}
