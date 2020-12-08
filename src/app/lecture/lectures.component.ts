import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {
    AndroidActivityBundleEventData,
    AndroidActivityEventData, AndroidActivityResultEventData,
    EventData,
    GestureEventData,
    ImageSource
} from "@nativescript/core";
import {OtherService} from "./other.service";
import {getString, hasKey} from "@nativescript/core/application-settings";
import { RouterExtensions} from "@nativescript/angular";
import { ActivityIndicator} from "@nativescript/core";
import * as application from "@nativescript/core/application";

import { AndroidApplication, AndroidActivityBackPressedEventData} from "@nativescript/core";
import {android} from "@nativescript/core/application";



@Component({
    selector: "ns-items",
    templateUrl: "./lectures.component.html",
    styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {


    allLectures: any = [];
    recLectures: any = [];
    jwt: string;
    isBusy: boolean = true;
    cnt: number = 0;






    constructor(private otherService: OtherService, private routerExtensions: RouterExtensions) {


    }

    ngOnInit(): void {
        // Android activity events


        this.otherService.getOverallRanking().subscribe(
            data =>{
                this.allLectures = data['result'];

            },
            error => console.log(error)
        );



        if(hasKey("JWT")){

            this.jwt = getString("JWT");
            this.otherService.getRecommendContent(this.jwt).subscribe(
                data =>{
                    this.recLectures = data['result'];
                },
                error => console.log(error)
            );
        }else{
            this.otherService.getOverallContent().subscribe(
                data =>{
                    this.recLectures = data['result'];
                },
                error => console.log(error)
            );

        }


    }

searchClick(){
    this.routerExtensions.navigate(['/lectures/search'], {

        transition: { name: 'slide', duration: 130, curve: 'linear' }
    });
}



    itemClick(args){
        //console.log(args.object.idx);
        this.routerExtensions.navigate(['/lecture',args.object.idx], {

            transition: { name: 'slide', duration: 130, curve: 'linear' }
        });

    }

    onLoaded(args){
        this.cnt++;
        if(this.cnt>=2) this.isBusy = false;

    }



}
