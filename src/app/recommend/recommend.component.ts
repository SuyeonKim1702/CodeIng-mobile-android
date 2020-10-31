import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {OtherService} from "../lecture/other.service";


@Component({
    selector: "ns-items",
    templateUrl: "./recommend.component.html",
    styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

    recLectures: any = [];

    constructor(private otherService: OtherService) { }

    ngOnInit(): void {

        this.otherService.getRecommendContent().subscribe(
            data =>{
                this.recLectures = data['result'];
            },
            error => console.log(error)
        );


    }

}
