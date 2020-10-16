import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {NativeScriptFormsModule, NativeScriptModule} from "@nativescript/angular";
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LecturesComponent } from "./lecture/lectures.component";
import {CommonModule} from "@angular/common";
import {LecturesSearchComponent} from "./lecture/lectures-search.component";
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";


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
        ItemDetailComponent,
        LecturesComponent,
        LecturesSearchComponent,

    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
