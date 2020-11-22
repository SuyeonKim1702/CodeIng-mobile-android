import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {getString} from "@nativescript/core/application-settings";
import {ProfileService} from "../mypage/mypage.service";
import {PersonalInfoService} from "./personal-info.service";
import {Router} from "@angular/router";




@Component({
    selector: "ns-items",
    templateUrl: "./personal-info.component.html",
    styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

    categoryList=[];
    categorys=[];
    state: Array<boolean>;
    state2: Array<boolean>;
    alert_message: string;
    password: string;
    jwt: string;


    dialogOpen = false;
    keyword="";




    constructor(private personalInfoService: PersonalInfoService, private router: Router) {
        this.alert_message="";
        this.jwt = getString("JWT");
        this.password="";


    }

    ngOnInit(): void {

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

            this.personalInfoService.checkPassword(this.jwt, this.password).subscribe(
                data => {
                    if(data['code'] == 200){
                        //다음 페이지로 이동
                        this.router.navigate(['/personal-info2']);
                    }else{
                        this.alert_message = "비밀번호가 일치하지 않습니다.";
                        this.showDialog();
                    }


                },
                error => {
                    console.log(error);
                    this.alert_message = "비밀번호가 일치하지 않습니다.";
                    this.showDialog();



                }
            );

        }



    }


}
