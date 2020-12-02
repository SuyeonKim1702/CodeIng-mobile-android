import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule, NSEmptyOutletComponent} from "@nativescript/angular";
import { NativeScriptCommonModule} from "@nativescript/angular";

import { TabsComponent} from "./tabs.component";
import { LectureComponent} from "../lecture/lecture.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {
                path: "default", component: TabsComponent, children: [
                    {
                        path: "lectures",
                        outlet: "lecturesTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: () => import("../lecture/lecture.module").then(m => m.LectureModule),
                    },




                ]
            }
        ])
    ],
    declarations: [
        TabsComponent
    ],
    providers: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TabsModule { }
