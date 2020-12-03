import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { ItemEventData, ListView} from "@nativescript/core";
import {lectureCard} from "../lecture/lectureCard";
import {Slider} from "@nativescript/core";
import {Class2Service} from "./class2.service";
import {
    getString, hasKey,
} from "@nativescript/core/application-settings";
import {RouterExtensions} from "@nativescript/angular";



@Component({
    selector: "ns-items",
    templateUrl: "./class2.component.html",
    styleUrls: ['./class2.component.css']
})
export class Class2Component implements OnInit {

    page: number;
    page2: number;
    allClasses: any = [];
    allClasses2: any = [];
    jwt="";

    constructor(private classService: Class2Service, private routerExtensions: RouterExtensions) {
        this.page = 1;
        this.page2 =1;
    }

    ngOnInit(): void {

        this.classService.getAllClass(this.page).subscribe(
            data =>{
                this.allClasses = data['result'];

            },
            error => console.log(error)
        );

        //if(hasKey("JWT")){
        if(false){

            this.classService.getMyClass(this.page, this.jwt).subscribe(
                data =>{
                    this.allClasses2 = data['result'];


                },
                error => console.log(error)
            );

        }

    }


    // infinite scroll
    loadMoreItems() {

        this.page++;
        this.classService.getAllClass(this.page).subscribe(
            data =>{
                console.log(data);
                for(var i =0; i<data['result'].length; i++){
                    this.allClasses.push(data['result'][i]);

                }

            },
            error => console.log(error)
        );
    }

    loadMoreItems2() {
        this.page2++;
        this.classService.getMyClass(this.page, this.jwt).subscribe(
            data =>{
                for(var i =0; i<data['result'].length; i++){
                    this.allClasses2.push(data['result'][i]);

                }

            },
            error => console.log(error)
        );
    }



    itemClick(args){
        //console.log(args.object.idx);

    }

}
