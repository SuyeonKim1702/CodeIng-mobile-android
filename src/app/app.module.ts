import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {NativeScriptFormsModule, NativeScriptModule} from "@nativescript/angular";
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { LecturesComponent } from "./lecture/lectures.component";
import {CommonModule} from "@angular/common";
import {LecturesSearchComponent} from "./lecture/lectures-search.component";
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
        NativeScriptFormsModule


    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        LecturesComponent,
        LecturesSearchComponent,
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
        ItemsComponent

    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
