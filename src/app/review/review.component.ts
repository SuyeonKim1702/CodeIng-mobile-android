import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {EventData, getViewById, Screen, Slider} from "@nativescript/core";
import { Page } from "@nativescript/core";
import * as application from "@nativescript/core/application";

import { RouterExtensions} from "@nativescript/angular";
import { AndroidApplication, AndroidActivityBackPressedEventData} from "@nativescript/core";
import * as Toast from 'nativescript-toast';
import {ReviewService} from "./review.service";
import {lectureCard} from "../lecture/lectureCard";
import {getString} from "@nativescript/core/application-settings";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "ns-details",
    templateUrl: "./review.component.html",
    styleUrls: ['./review.component.css']

})

export class ReviewComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    lectures: any;
    private counter: number;
    page: number;
    searchword ="";
    rating : number;
    level: number;
    cost: number;
    teaching: number;
    pros_state =[];
    cons_state =[];
    recommend : boolean = true;
    write: string;
    final_pros=[];
    final_cons=[];
    final_rec: string;
    jwt: string;
    lectureIdx: number;


    pros = {1:'설명이 친절해요', 2:'수강생과 소통이 잘돼요', 3:'집중이 잘돼요', 4:'커리큘럼이 체계적이에요', 5:'강의자료가 풍부해요', 6: '없음'};
    cons = {1:'지루해요', 2:'발음이 이해하기 힘들어요', 3:'소리가 너무 작아요', 4:'소리가 너무 커요', 5:'강의자료가 부실해요', 6:'커리큘럼이 아쉬워요', 7:'설명이 불친절해요', 8:'없음' };




    constructor(private zone: NgZone, private reviewService: ReviewService, private pg: Page, private routerExtensions: RouterExtensions, private route: ActivatedRoute,) {


        this.route.params.subscribe((params) => {
            this.lectureIdx = params["lectureIdx"];

        });

        this.lectures = [];
        this.counter = 0;
        this.page = 1;
        this.write ='';
        this.final_rec='';

        for (var i = 0; i < 50; i++) {
            this.lectures.push();
            this.counter = i;
        }
    }


    ngOnInit(): void {

        this.jwt = getString("JWT");

        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/review/"+this.lectureIdx, false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }

            this.rating = 0;
            this.level = 0;
            this.cost = 0;
            this.teaching =0;

        for(var i=1; i<7;i++)
            this.pros_state[i] = false;

        for(var i=1; i<9;i++)
            this.cons_state[i] = false;







        }




    setRatingHighlight(rate: number){
        this.rating = rate;
    }

    setCostHighlight(rate: number){
        this.cost = rate;
    }

    setteachingHighlight(rate: number){
        this.teaching = rate;
    }


    goBack(){
        this.routerExtensions.back();
    }


    changeProsColor(index: number){

        this.pros_state[index] = true;
    }

    changeConsColor(index: number){

        this.cons_state[index] = true;
    }

    changeRcmColor(){
      this.recommend = !this.recommend;
    }

   next(){
        for(var i=1; i<7; i++)
            if(this.pros_state[i]) this.final_pros.push(i);
       for(var i=1; i<9; i++)
           if(this.cons_state[i]) this.final_cons.push(i);

           if(this.recommend) this.final_rec ='Y';
           else this.final_rec ='N';

           console.log(this.final_pros);
           console.log(this.final_cons);
           console.log(this.write);
           console.log(this.final_rec);
           console.log(this.teaching, this.rating, this.cost);




       this.reviewService.postReview(this.jwt, this.lectureIdx, this.rating, this.teaching, this.cost, this.final_rec, this.write, this.final_pros, this.final_cons).subscribe(
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
