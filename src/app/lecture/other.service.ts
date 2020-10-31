import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class OtherService {

    baseUrl = 'http://3.34.74.250';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getRankingPreview() {
        return this.httpClient.get(this.baseUrl+'/ranking-overview', {headers: this.headers});

    }

    getRecommendContent(){
        return this.httpClient.get(this.baseUrl+'/api/recommend', {headers: this.headers});

    }


}
