import { Component, OnInit } from "@angular/core";


import {LectureService} from "./lecture.service";

@Component({
    selector: "ns-items",
    templateUrl: "./lectures.component.html"
})
export class LecturesComponent implements OnInit {

    allLectures: any = [];


    constructor(private lectureService: LectureService) { }

    ngOnInit(): void {
        console.log(this.lectureService.getLectures());
        this.allLectures = this.lectureService.getLectures().subscribe(
            data =>{
               this.allLectures = data;
               console.log(this.allLectures);
            }
        )
    }
}
