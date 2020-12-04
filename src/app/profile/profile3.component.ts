import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RouterExtensions} from "@nativescript/angular";


@Component({
    selector: "ns-items",
    templateUrl: "./profile3.component.html",
    styleUrls: ['./profile3.component.css']
})
export class Profile3Component implements OnInit {

    nickname="";

    constructor(private route: ActivatedRoute, private routerExtensions: RouterExtensions) {

        }


    ngOnInit(): void {


    }

    move(){
        this.routerExtensions.navigate(['/lectures']);
    }

    goBack(){
        this.routerExtensions.back();
    }



}
