import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
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
import {Router} from "@angular/router";

@Component({
    selector: "ns-items",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {

        if(hasKey("JWT")){
            this.router.navigate(['lectures']);
        }


    }

}
