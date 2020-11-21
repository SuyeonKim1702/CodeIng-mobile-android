import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ProfileService {

    baseUrl = 'http://3.34.74.250';
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
