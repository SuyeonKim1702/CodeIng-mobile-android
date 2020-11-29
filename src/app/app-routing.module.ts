import {Component, NgModule} from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import {LecturesComponent} from "./lecture/lectures.component";
import {LecturesSearchComponent} from "./lecture/lectures-search.component";
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
import {ItemsComponent} from "./item/items.component";
import {ProfileComponent} from "./profile/profile.component";
import {PersonalInfoComponent} from "./personal-info/personal-info.component";
import {PersonalInfo2Component} from "./personal-info/personal-info2.component";
import {Profile2Component} from "./profile/profile2.component";
import {Profile3Component} from "./profile/profile3.component";

const routes: Routes = [

    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "login2", component: Login2Component },
    { path: "signup", component: SignupComponent },
    { path: "signup2", component: Signup2Component },
    { path: "signup3/:name/:phoneNumber", component: Signup3Component },
    { path: "signup4/:name", component: Signup4Component },
    { path: "lectures", component: LecturesComponent },
    { path: "lectures/search", component: LecturesSearchComponent },
    { path: "ranking", component: RankingComponent },
    { path: "recommend", component: RecommendComponent},
    { path: "class", component: ClassComponent},
    { path: "my-page", component: MypageComponent},
    { path: "lecture/:lectureIdx", component: ItemsComponent},
    { path: "profile", component: ProfileComponent},
    { path: "profile2/:category/:subcategory/:level", component: Profile2Component},
    { path: "profile3", component: Profile3Component},
    { path: "personal-info", component: PersonalInfoComponent},
    { path: "personal-info2", component: PersonalInfo2Component}



];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
