import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class LectureService {

    baseUrl = 'http://3.34.74.250/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getLectures(page: number) {
        return this.httpClient.get(this.baseUrl+'lectures', {
            params: {
                page: page+'',

            },
            headers: this.headers});

    }


}
