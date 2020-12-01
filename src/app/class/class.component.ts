import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {lectureCard} from "../lecture/lectureCard";
import {Slider} from "@nativescript/core";
import {ClassService} from "./class.service";

import {
    getString, hasKey,
} from "@nativescript/core/application-settings";
import {RouterExtensions} from "@nativescript/angular";



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

    constructor(private classService: ClassService, private routerExtensions: RouterExtensions) {
        this.page = 1;
        this.page2 =1;
    }

    ngOnInit(): void {

        if(!hasKey("JWT")){
            this.routerExtensions.navigate(['/login'], { clearHistory: true });
        }

        this.jwt = getString("JWT");


        this.classService.getAllClass(this.page).subscribe(
            data =>{
                this.allClasses = data['result'];


            },
            error => console.log(error)
        );



        this.classService.getMyClass(this.page, this.jwt).subscribe(
            data =>{
                this.allClasses2 = data['result'];


            },
            error => console.log(error)
        );


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
