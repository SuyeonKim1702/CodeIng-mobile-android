import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {LectureService} from "../lecture/lectures.service";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";


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



    private jwt: string;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
     this.jwt = "";

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


                },
                error => {
                    this.alert_message = error["error"]["message"];
                    this.showDialog();


                }
            );

        }
            }

}
