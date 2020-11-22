import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {
    getString,

} from "@nativescript/core/application-settings";

import {ProfileService} from "./mypage.service";
import {Router} from "@angular/router";


@Component({
    selector: "ns-items",
    templateUrl: "./mypage.component.html",
    styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

    profile: any;
    setting: boolean;
    nickname: string;
    level: string;
    interest: any;

    constructor(private profileService: ProfileService, private router: Router) { }

    ngOnInit(): void {
        this.setting = false;
        this.interest = [];
        const jwt: string = getString("JWT");

        this.profileService.getProfile(jwt).subscribe(
            data =>{
                this.profile = data['result'];
                this.level = data['result']['level'];

                for(var i=0;i<data['result']['category'].length;i++){
                    console.log("");
                    this.interest.push("# "+data['result']['category'][i]['categoryName']);
                }

                for(var i=0;i<data['result']['subcategory'].length;i++){
                    this.interest.push("# "+data['result']['subcategory'][i]['subcategoryName']);
                }

                for(var key in data['result']){
                    if(this.profile[key].length>0){
                        this.setting = true;
                        break;
                    }
                }

                //프로필이 설정되어있을 때 - visibility 변경
                if(this.setting){

                    //회원 정보 호출
                    this.profileService.getPersonalInfo(jwt).subscribe(
                        data =>{
                            this.nickname = data['result']['nickname'];




                        },
                        error => console.log(error)
                    );

                }




            },
            error => console.log(error)
        );

}


public next(){
    this.router.navigate(['/profile']);
}

public personalinfo(){
    this.router.navigate(['/personal-info']);

}

}
