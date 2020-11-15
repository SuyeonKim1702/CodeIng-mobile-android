import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {OtherService} from "../lecture/other.service";
import {LoginService} from "./login.service";
import {Signup2Component} from "./signup2.component";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";



@Component({
    selector: "ns-items",
    templateUrl: "./signup3.component.html",
    styleUrls: ['./signup3.component.css'],
    moduleId: module.id,
})
export class Signup3Component implements OnInit {

    email = "";
    alert_message="";
    length: number;
    result: number;
    dialogOpen = false;
    name="";
    phoneNumber="";
    check: boolean;
    nickname: string;
    password: string;
    passwordConfirm: string;


    constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe((params) => {
             this.name = params["name"];
             this.phoneNumber = params["phoneNumber"];
        });


    }



    ngOnInit(): void {
      this.check = false;
      this.nickname = "";
      this.password ="";
      this.passwordConfirm="";
    }



    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }

    public confirmEmail(args) {

        this.loginService.checkEmail(this.email).subscribe(
            data => {
                console.log(data);
                this.alert_message = data["message"];
                this.check = true;
            },
            error => {
                console.log(error);
                this.alert_message = error["error"]["message"];
                this.check = false;

            }
        );


     this.showDialog();
    }

    public submit(){
        if(!this.check){this.alert_message = "이메일 확인을 완료해주세요"; this.showDialog();}
        else if(this.nickname.length == 0){ this.alert_message = "닉네임을 입력해주세요"; this.showDialog();}
        else if(this.passwordConfirm != this.password){ this.alert_message = "비밀번호가 일치하지 않습니다"; this.showDialog();}
        else {
            // 서버에 보내기 .... 여기서 에러나면 또 메세지 띄우고 아니면 회원가입 완료 ...
            this.loginService.signUp(this.email, this.name, this.nickname, this.password, this.passwordConfirm,this.phoneNumber).subscribe(
                data => {
                    //다음회면으로 넘어가기
                    this.router.navigate(['/signup4', this.nickname]);

                },
                error => {

                    this.alert_message = error["error"]["message"];
                    this.showDialog();

                }
            );

        }

    }

}



