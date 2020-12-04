import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {AndroidActivityBackPressedEventData, AndroidApplication, GestureEventData} from "@nativescript/core";
import {
    getString, hasKey,

} from "@nativescript/core/application-settings";

import {FavLectureService} from "./fav-lecture.service";
import {Router} from "@angular/router";
import {RouterExtensions} from "@nativescript/angular";
import * as application from "@nativescript/core/application";


@Component({
    selector: "ns-items",
    templateUrl: "./fav-lecture.component.html",
    styleUrls: ['./fav-lecture.component.css']
})
export class FavLectureComponent implements OnInit {
    lectures: any;
    page: number =1;
    jwt: string;

    constructor(private favLectureService: FavLectureService, private router: Router, private routerExtensions: RouterExtensions, private zone: NgZone) { }

    ngOnInit(): void {


        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/fav-lecture", false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }





        this.jwt = getString("JWT");


        this.favLectureService.getFavoriteLecture(this.jwt, 1).subscribe(
            data => {
               this.lectures = data['result'];

            },
            error => console.log(error)
        );

    }

   loadMoreItems(){

        this.page++;
       this.favLectureService.getFavoriteLecture(this.jwt, this.page).subscribe(
           data => {
               for(var i=0;data['result'].length;i++)
               this.lectures.push(data['result'][i]);
           },
           error => console.log(error)
       );

   }

   itemClick(args){
        this.routerExtensions.navigate(['/lecture',args.object.idx]);
   }

    goBack(){
        this.routerExtensions.back();

    }
}

