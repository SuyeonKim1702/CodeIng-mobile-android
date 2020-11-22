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

    baseUrl = 'http://3.34.74.250';
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







}
