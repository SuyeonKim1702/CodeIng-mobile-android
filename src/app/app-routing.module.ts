import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { ItemDetailComponent } from "./item/item-detail.component";
import {LecturesComponent} from "./lecture/lectures.component";
import {LecturesSearchComponent} from "./lecture/lectures-search.component";
import {RankingComponent} from "./ranking/ranking.component";
import {RecommendComponent} from "./recommend/recommend.component";
import {FavoriteComponent} from "./favorite/favorite.component";
import {MypageComponent} from "./mypage/mypage.component";
import {LoginComponent} from "./login/login.component";
import {Login2Component} from "./login/login2.component";

const routes: Routes = [

    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "login2", component: Login2Component },
    { path: "lectures", component: LecturesComponent },
    { path: "lectures/search", component: LecturesSearchComponent },
    { path: "ranking", component: RankingComponent },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "recommend", component: RecommendComponent},
    { path: "favorite", component: FavoriteComponent},
    { path: "my-page", component: MypageComponent},


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
