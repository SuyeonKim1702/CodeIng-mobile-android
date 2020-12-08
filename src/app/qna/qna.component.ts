import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {EventData, getViewById, Screen, Slider} from "@nativescript/core";
import { Page } from "@nativescript/core";
import * as application from "@nativescript/core/application";

import { RouterExtensions} from "@nativescript/angular";
import { AndroidApplication, AndroidActivityBackPressedEventData} from "@nativescript/core";
import * as Toast from 'nativescript-toast';
import {QnaService} from "./qna.service";
import {lectureCard} from "../lecture/lectureCard";
import {getString} from "@nativescript/core/application-settings";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "ns-details",
    templateUrl: "./qna.component.html",
    styleUrls: ['./qna.component.css']

})

export class QnaComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    lectureIdx: number;
    jwt: string;
    title: string;
    content: string;

    constructor(private zone: NgZone, private qnaService: QnaService, private pg: Page, private routerExtensions: RouterExtensions, private route: ActivatedRoute,) {


        this.route.params.subscribe((params) => {
            this.lectureIdx = params["lectureIdx"];

        });

    }


    ngOnInit(): void {

        this.jwt = getString("JWT");
        this.title ='';
        this.content='';

        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/qna/"+this.lectureIdx, false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }






        }

        goBack(){
            this.routerExtensions.back();
        }

        next(){

           if(this.title.length <=0 || this.content.length <=0){
               Toast.makeText("제목과 내용은 공란이 될 수 없습니다.").show();

           }else{
               this.qnaService.postQna(this.jwt, this.lectureIdx, this.title, this.content).subscribe(
                   data =>{
                       this.routerExtensions.navigate(['/lecture',this.lectureIdx], {
                           animated: true,
                           transition: { name: 'slide' }
                       });


                   },
                   error => console.log(error)
               );
           }




        }





   }




