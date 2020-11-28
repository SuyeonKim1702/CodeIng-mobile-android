import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {OtherService} from "../lecture/other.service";
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "@nativescript/core/application-settings";


@Component({
    selector: "ns-items",
    templateUrl: "./recommend.component.html",
    styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

    recLectures: any = [];
    jwt: string;

    constructor(private otherService: OtherService) {
        this.jwt = getString('JWT');

    }

    ngOnInit(): void {

        this.otherService.getRecommendContent(this.jwt).subscribe(
            data =>{
                this.recLectures = data['result'];
            },
            error => console.log(error)
        );


    }

}
