import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {getString} from "@nativescript/core/application-settings";
import {PersonalInfoService} from "./personal-info.service";
import { RouterExtensions} from "@nativescript/angular";




@Component({
    selector: "ns-items",
    templateUrl: "./personal-info2.component.html",
    styleUrls: ['./personal-info2.component.css']
})
export class PersonalInfo2Component implements OnInit {


    alert_message: string;
    email="";
    name="";
    password="";
    passwordConfirm ="";
    phonenumber ="";
    nickname ="";
    jwt: string;


    dialogOpen = false;
    keyword="";




    constructor(private personalInfoService: PersonalInfoService, private routerExtensions: RouterExtensions) {
        this.alert_message="";
        this.jwt = getString("JWT");



    }

    ngOnInit(): void {


        this.personalInfoService.getPersonalInfo(this.jwt).subscribe(
            data => {

                this.name=data['result']['name'];
                this.nickname=data['result']['nickname'];
                this.email = data['result']['email'];
                this.phonenumber = data['result']['phonenumber'];




            },
            error => {
                console.log(error);

            }
        );



    }


    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }



    modify(){

        this.personalInfoService.patchPersonalInfo(this.jwt, this.email, this.name, this.nickname, this.phonenumber, this.password, this.passwordConfirm).subscribe(
            data => {

                this.routerExtensions.navigate(['/my-page'], { clearHistory: true });


            },
            error => {
                console.log(error);

            }
        );



    }


}
