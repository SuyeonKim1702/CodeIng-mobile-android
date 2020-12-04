import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class OtherService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getOverallRanking() {
        return this.httpClient.get(this.baseUrl+'/overall-ranking', {headers: this.headers});

    }

    getRecommendContent(jwt: string){
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/api/user_recommend', {headers: this.headers});

    }


    getOverallContent(){
        return this.httpClient.get(this.baseUrl+'/api/recommend', {headers: this.headers});

    }


}
