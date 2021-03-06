import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {lectureCard} from "../lecture/lectureCard";
import {Slider} from "@nativescript/core";
import {ClassService} from "./class.service";

import {
    getString, hasKey,
} from "@nativescript/core/application-settings";



@Component({
    selector: "ns-items",
    templateUrl: "./class.component.html",
    styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

    page: number;
    page2: number;
    allClasses: any = [];
    allClasses2: any = [];
    jwt="";
    login: boolean;
    isBusy: boolean = true;
    cnt: number;
    dialogOpen = false;
    content: number =0;
    message: string;

    constructor(private classService: ClassService) {
        this.page = 1;
        this.page2 =1;
    }

    ngOnInit(): void {
        this.login = false;
        this.cnt = 1;
        this.message = "로그인 후 이용할 수 있습니다."


        this.classService.getAllClass(this.page).subscribe(
            data =>{
                this.allClasses = data['result'];


            },
            error => console.log(error)
        );


        if(hasKey("JWT")) {
            this.login = true;
            this.jwt = getString("JWT");

            this.classService.getMyClass(this.page, this.jwt).subscribe(
            data =>{
                if(data['result'].length == 0){
                    this.login = false;
                    this.message = "참여하고 있는 스터디가 없습니다."
                }
                this.allClasses2 = data['result'];


            },
            error => console.log(error)
        );


    }else{


        }
    }


    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }


    // infinite scroll
    loadMoreItems() {
        this.page++;
        this.classService.getAllClass(this.page).subscribe(
            data =>{
                for(var i =0; i<data['result'].length; i++){
                    this.allClasses.push(data['result'][i]);

                }

            },
            error => console.log(error)
        );
    }

    loadMoreItems2() {
        if(hasKey("JWT")) {
            this.page2++;
            this.classService.getMyClass(this.page, this.jwt).subscribe(
                data => {

                    console.log('모모모');
                    for (var i = 0; i < data['result'].length; i++) {

                        this.allClasses2.push(data['result'][i]);

                    }

                },
                error => console.log(error)
            );
        }
    }



    itemClick(args){
       this.showDialog();

    }

    itemloading(args){
        this.cnt++;
        if(this.cnt>=2) this.isBusy = false;

    }

}
