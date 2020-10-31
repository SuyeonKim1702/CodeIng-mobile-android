import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData, ImageSource} from "@nativescript/core";
import {OtherService} from "./other.service";


@Component({
    selector: "ns-items",
    templateUrl: "./lectures.component.html",
    styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {


    allLectures: any = [];
    recLectures: any = [];





    constructor(private otherService: OtherService) { }

    ngOnInit(): void {


        this.otherService.getRankingPreview().subscribe(
            data =>{
               this.allLectures = data['result'];

            },
                error => console.log(error)
        );


        this.otherService.getRecommendContent().subscribe(
            data =>{
                this.recLectures = data['result'];
            },
            error => console.log(error)
        );

    }

}
