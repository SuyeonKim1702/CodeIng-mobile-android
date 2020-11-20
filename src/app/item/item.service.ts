import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ItemService {

    baseUrl = 'http://3.34.74.250';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }


    getDetail(index: number) {
        return this.httpClient.get(this.baseUrl+'/lectures/'+index, {
            headers: this.headers});

    }

    getQnas(index: number, page: number) {
        return this.httpClient.get(this.baseUrl+'/lectures/'+index+'/qna', {
            params: {
                page: page+'',
            },
            headers: this.headers});

    }


}
