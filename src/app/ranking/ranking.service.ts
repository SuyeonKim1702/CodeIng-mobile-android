import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class RankingService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getLectures(page: number, categoryIdx: number, subcategoryIdx: number) {

        return this.httpClient.get(this.baseUrl+'/lectures-ranking', {
            params: {
                page: page+'',
                categoryIdx: categoryIdx+'',
                subcategoryIdx: subcategoryIdx+''
            },
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

