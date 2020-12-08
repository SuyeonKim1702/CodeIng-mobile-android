import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class QnaService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    postQna(jwt: string,lectureIdx: number, title: string, content: string){
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.post(this.baseUrl+'/lectures/'+lectureIdx+"/qna",JSON.stringify({
                "title":title,
                "qnades":content

        }),
            {

                headers: this.headers});
    }

}

