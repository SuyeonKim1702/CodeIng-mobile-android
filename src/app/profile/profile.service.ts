import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// @ts-ignore
@Injectable({
    providedIn: "root"
})
export class ProfileService {

    baseUrl = 'https://www.coconerd.tk';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient:HttpClient) { }

    getProfile(jwt: string) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.get(this.baseUrl+'/profile',{
            headers: this.headers});

    }

    getSubcategoryList(categoryIdx: number) {
        return this.httpClient.get(this.baseUrl+'/subcategory-list', {
            params: {
                categoryIdx: categoryIdx+'',
            },
            headers: this.headers});

    }


    getCategoryList() {
        return this.httpClient.get(this.baseUrl+'/category-list', {
            headers: this.headers});

    }




    patchProfile(jwt: string, birthday: string, school: string, job: string, gender: string, category: Array<number> , subCategory: Array<number> ,level:number) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': jwt
        });

        return this.httpClient.patch(this.baseUrl+'/profile',JSON.stringify({

            "birthday":birthday,
            "school":school,
            "job":job,
            "gender":gender,
            "subcategory":subCategory,
            "category":category,
            "level": level

        }),
            {

            headers: this.headers});
    }




}

