import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReturnKeyType} from "@nativescript/core/ui/enums";
import search = ReturnKeyType.search;


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

    getLectures(page: number, searchword: string, upperLimit: number, lowerLimit: number, level:number, rating:number) {
        return this.httpClient.get(this.baseUrl+'/lectures', {
            params: {
                page: page+'',
                keyword: searchword,
                upperLimit: upperLimit+'',
                lowerLimit: lowerLimit+'',
                level: level+'',
                rating: rating+''
            },

            headers: this.headers});

    }











}
