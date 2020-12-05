import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {
    getString, hasKey,

} from "@nativescript/core/application-settings";

import {MypageService} from "./mypage.service";
import {Router} from "@angular/router";
import {RouterExtensions} from "@nativescript/angular";


@Component({
    selector: "ns-items",
    templateUrl: "./mypage.component.html",
    styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

    profile: any;
    setting: number;
    nickname: string;
    level: string;
    interest: any;
    jwt: string;

    constructor(private mypageService: MypageService, private router: Router, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
        this.setting = 0;
        this.interest = [];


        if(!hasKey("JWT")){
            this.routerExtensions.navigate(['/login'], { clearHistory: true });
        }
        else{
            this.jwt = getString("JWT");

            this.mypageService.getProfile(this.jwt).subscribe(
                data =>{

                    this.profile = data['result'];
                    this.level = data['result']['levelName'];

                    for(var i=0;i<data['result']['category'].length;i++){

                        this.interest.push("# "+data['result']['category'][i]['categoryName']);
                    }

                    for(var i=0;i<data['result']['subcategory'].length;i++){
                        this.interest.push("# "+data['result']['subcategory'][i]['subcategoryName']);
                    }

                    for(var key in data['result']){

                        if(this.profile[key]){
                            if(this.profile[key].length>0 && this.profile[key] !="None" && this.profile[key]!=6 && this.profile[key]!="미정"){
                                this.setting = 1; //세팅 되어있을 때
                                break;
                            }
                        }

                    }

                    //프로필이 설정되어있을 때 - visibility 변경
                    if(this.setting == 1){

                        //회원 정보 호출
                        this.mypageService.getPersonalInfo(this.jwt).subscribe(
                            data =>{
                                this.nickname = data['result']['nickname'];




                            },
                            error => console.log(error)
                        );

                    }else{

                        this.setting = 2;
                    }




                },
                error => console.log(error)
            );

        }




    }


    public next(){
        this.routerExtensions.navigate(['/profile'], { clearHistory: false });

    }

    public personalinfo(){
        this.routerExtensions.navigate(['/personal-info'], { clearHistory: false });


    }

    public fav_lecture(){
        this.routerExtensions.navigate(['/fav-lecture'], { clearHistory: false });

    }

}
