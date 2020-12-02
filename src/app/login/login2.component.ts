import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {LectureService} from "../lecture/lectures.service";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";


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
import {RouterExtensions} from "@nativescript/angular";


@Component({
    selector: "ns-items",
    templateUrl: "./login2.component.html",
    styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
    email="";
    password="";
    alert_message="";
    dialogOpen = false;
    loginstate: boolean = false;



    private jwt: string;

    constructor(private loginService: LoginService, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
     this.jwt = "";

    }

    getJwt(){
        return this.jwt;
    }

    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }

    public login(){
        if(this.email.length >0 && this.password.length >0){
            this.loginService.login(this.email, this.password).subscribe(
                data => {
                    this.jwt = data["token"];
                    this.routerExtensions.navigate(['../tabs/default'], { clearHistory: true });

                    if(this.loginstate){ //자동 로그인 설정된 상태
                        setString("JWT", data["token"]);
                    }


                },
                error => {
                    this.alert_message = error["error"]["message"];
                    this.showDialog();


                }
            );

        }
    }

    public auto_login(){
        this.loginstate = !this.loginstate;
    }

}
