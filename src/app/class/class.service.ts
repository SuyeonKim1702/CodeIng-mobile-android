import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ClassService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getAllClass(page: number) {
        return this.httpClient.get(this.baseUrl+'/classes', {
            params: {
                page: page+''
            },

            headers: this.headers});

    }


    getMyClass(page: number, jwt: string) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/my-classes', {
            params: {
                page: page+''
            },

            headers: this.headers});

    }


















}
