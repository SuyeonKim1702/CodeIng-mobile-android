import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule} from "@nativescript/angular";
import { LectureComponent} from "./lecture.component";
import { LecturesSearchComponent} from "./lectures-search.component";
import { NativeScriptCommonModule} from "@nativescript/angular";

@NgModule({
    imports: [

        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "lectures" },
            { path: "lectures", component: LectureComponent },
            { path: "lectures/search", component: LecturesSearchComponent},
        ])
    ],
    declarations: [
      LectureComponent,
        LecturesSearchComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LectureModule { }
