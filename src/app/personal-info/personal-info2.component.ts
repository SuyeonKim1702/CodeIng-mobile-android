import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {getString} from "@nativescript/core/application-settings";
import {ProfileService} from "../mypage/mypage.service";
import {PersonalInfoService} from "./personal-info.service";




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




    constructor(private personalInfoService: PersonalInfoService) {
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
        if(this.password.length == 0){
            this.alert_message = "비밀번호를 입력해주세요.";
            this.showDialog();


        }else{ // api 호출

        }



    }


}
