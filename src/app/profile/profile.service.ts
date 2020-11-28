import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ProfileService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getProfile(jwt: string) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/profile',{
            headers: this.headers});

    }

    getSubcategoryList(categoryIdx: number) {
        return this.httpClient.get(this.baseUrl+'/subcategory-list', {
            params: {
                categoryIdx: categoryIdx+'',
            },
            headers: this.headers});

    }


}

