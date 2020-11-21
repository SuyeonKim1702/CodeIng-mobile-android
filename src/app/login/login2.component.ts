import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {LectureService} from "../lecture/lectures.service";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
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

    constructor(private loginService: LoginService, private router: Router) { }

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
                    this.router.navigate(['/lectures']);

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
