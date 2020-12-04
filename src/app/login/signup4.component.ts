import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: "ns-items",
    templateUrl: "./signup4.component.html",
    styleUrls: ['./signup4.component.css']
})
export class Signup4Component implements OnInit {

    nickname="";

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {
            this.nickname = params["name"]+"님, 환영합니다! ";
        });
    }

    ngOnInit(): void {


    }



}
