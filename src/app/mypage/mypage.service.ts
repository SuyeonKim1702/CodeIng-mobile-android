import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class MypageService {

    baseUrl = 'https://www.coconerd.tk';
    headers: HttpHeaders;

    constructor(private httpClient:HttpClient) {

    }

    getProfile(jwt: string) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/profile',{
            headers: this.headers});

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
