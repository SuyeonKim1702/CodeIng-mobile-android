import { Component, OnInit } from "@angular/core";

import {LectureService} from "./lecture.service";

@Component({
    selector: "ns-items",
    templateUrl: "./lectures.component.html",
    styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {

    allLectures: any = [];


    constructor(private lectureService: LectureService) { }

    ngOnInit(): void {

        this.allLectures = this.lectureService.getLectures().subscribe(
            data =>{
                console.log(data)
               this.allLectures = data['result'];
            },
                error => console.log(error)
        );

    }
}
