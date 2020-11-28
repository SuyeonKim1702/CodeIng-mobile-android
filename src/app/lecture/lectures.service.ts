import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class LectureService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getLectures(page: number, searchword: string, price:number, level:number, rating:number) {
        return this.httpClient.get(this.baseUrl+'/lectures', {
            params: {
                page: page+'',
                keyword: searchword,
                price: price+'',
                level: level+'',
                rating: rating+''
            },

            headers: this.headers});

    }






    posttest(){

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRkZDE3MDJAbmF2ZXIuY29tIiwiZXhwaXJlIjoxNjA4MzEwNjcwfQ.-fkh_2lnjwykjG8M1eQqRTcO7l-xpswBqeQ3uYbTcmg'
        });


        return this.httpClient.patch(this.baseUrl+'/personal-info',JSON.stringify(
            {'totalrating':5, 'teachingpowerrating': 3, 'pricerating': 3, 'recommend': 'Y', 'improvement': "fdf", 'pros': [1,2], 'cons': [4,5]
            }),
            {headers: this.headers});

    }











}
