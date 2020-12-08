import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ReviewService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    postReview(jwt: string,lectureIdx: number, totalRating: number, teachingPowerRating: number , priceRating: number, recommend: string, improvement: string , pros: Array<number> ,cons: Array<number>) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.post(this.baseUrl+'/lectures/'+lectureIdx+"/review",JSON.stringify({
                "totalrating":totalRating,
                "teachingpowerrating":teachingPowerRating,
                "pricerating":priceRating,
                "recommend":recommend,
                "improvement":improvement,
                "pros":pros,
                "cons":cons
        }),
            {

                headers: this.headers});
    }

}

