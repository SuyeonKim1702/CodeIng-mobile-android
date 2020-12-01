import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class FavLectureService {

    baseUrl = 'https://www.coconerd.tk';
    headers: HttpHeaders;

    constructor(private httpClient:HttpClient) {

    }

    getFavoriteLecture(jwt: string, page: number) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/favorite-lectures',{
            params: {
                page: page+''
            },
            headers: this.headers});

    }




}
