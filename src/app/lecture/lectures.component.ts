import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {OtherService} from "./other.service";

@Component({
    selector: "ns-items",
    templateUrl: "./lectures.component.html",
    styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {


    allLectures: any = [];



    constructor(private otherService: OtherService) { }

    ngOnInit(): void {

        this.otherService.getRankingPreview().subscribe(
            data =>{
                console.log(data)
               this.allLectures = data['result'];
            },
                error => console.log(error)
        );

    }

}
