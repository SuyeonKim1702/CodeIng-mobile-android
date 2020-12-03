import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {NativeScriptFormsModule, NativeScriptModule} from "@nativescript/angular";
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { LecturesComponent } from "./lecture/lectures.component";
import {CommonModule} from "@angular/common";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {RankingComponent} from "./ranking/ranking.component";
import {RecommendComponent} from "./recommend/recommend.component";
import {ClassComponent} from "./class/class.component";
import {MypageComponent} from "./mypage/mypage.component";
import {LoginComponent} from "./login/login.component";
import {Login2Component} from "./login/login2.component";
import {SignupComponent} from "./login/signup.component";
import {Signup2Component} from "./login/signup2.component";
import {Signup3Component} from "./login/signup3.component";
import {Signup4Component} from "./login/signup4.component";
import {ProfileComponent} from "./profile/profile.component";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {PersonalInfo2Component} from "./personal-info/personal-info2.component";
import {Profile2Component} from "./profile/profile2.component";
import {NativeScriptDateTimePickerModule} from "@nativescript/datetimepicker/angular";
import {Profile3Component} from "./profile/profile3.component";
import {FavLectureComponent} from "./fav-lecture/fav-lecture.component";
import {NativeScriptSvgModule} from "@sergeymell/nativescript-svg/angular";
import {Class2Component} from "./class2/class2.component";



@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptDateTimePickerModule,
        NativeScriptSvgModule,



    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        LecturesComponent,
        RankingComponent,
        RecommendComponent,
        ClassComponent,
        MypageComponent,
        LoginComponent,
        Login2Component,
        SignupComponent,
        Signup2Component,
        Signup3Component,
        Signup4Component,
        ItemsComponent,
        ProfileComponent,
        PersonalInfoComponent,
        PersonalInfo2Component,
        Profile2Component,
        Profile3Component,
        FavLectureComponent,
        Class2Component

    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
