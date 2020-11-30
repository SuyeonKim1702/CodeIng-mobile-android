import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ItemService {

    baseUrl = 'https://www.coconerd.tk';
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


    getReview(index: number, page: number) {
        return this.httpClient.get(this.baseUrl+'/lectures/'+index+'/review', {
            params: {
                page: page+'',
            },
            headers: this.headers});

    }

    checkFavLecture(jwt: string, index: number) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/lectures/'+index+'/check-favorite', {
            params: {

            },
            headers: this.headers});

    }




}
