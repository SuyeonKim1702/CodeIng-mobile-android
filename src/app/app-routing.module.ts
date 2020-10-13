import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import {LecturesComponent} from "./lecture/lectures.component";
import {LecturesSearchComponent} from "./lecture/lectures-search.component";

const routes: Routes = [
    { path: "", redirectTo: "/lectures", pathMatch: "full" },
    { path: "lectures", component: LecturesComponent },
    { path: "lectures/search", component: LecturesSearchComponent },
    { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
