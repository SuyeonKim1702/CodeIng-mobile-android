import {Component, NgZone, OnInit} from "@angular/core";
import {AndroidActivityBackPressedEventData, AndroidApplication, Page, View} from "@nativescript/core";
import {AnimationCurve, Visibility} from "@nativescript/core/ui/enums";
import {
    getString, hasKey,

} from "@nativescript/core/application-settings";

import * as Toast from 'nativescript-toast';

import {ActivatedRoute} from "@angular/router";
import {ItemService} from "./item.service";
import {Qna} from "./item";
import {RouterExtensions} from "@nativescript/angular";
import * as application from "@nativescript/core/application";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
    lectureIdx: number;
    info: any = [];
    check: boolean;
    utilityModule: any;
    page: number;
    public qnas =[];
    rating: number;
    review: any;
    likeState: boolean;
    jwt: string;
    scrollState: boolean;
    dialogOpen = false;
    content = false;
    content2 = false;




    constructor(private zone: NgZone, private view:Page, private itemService: ItemService, private route: ActivatedRoute,public routerExtensions: RouterExtensions) {



        this.route.params.subscribe((params) => {
            this.lectureIdx = params["lectureIdx"];
            this.utilityModule = require("utils/utils");

        });
    }

    ngOnInit(): void {


        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/lecture/"+this.lectureIdx, false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }



        this.scrollState = false;
        this.review = [];
        this.page =1;
        this.check = false;
        this.likeState = false;
        this.itemService.getDetail(this.lectureIdx).subscribe(
            data =>{
                this.info = data['result'];


            },
            error => console.log(error)
        );

        if(hasKey("JWT")) {
            this.jwt = getString("JWT");
            this.itemService.checkFavLecture(this.jwt, this.lectureIdx).subscribe(
                data => {

                    this.likeState = (data['state'] == 'true');

                },
                error => console.log(error)
            );

        }

        this.itemService.getQnas(this.lectureIdx,1).subscribe(
            data =>{
                var tmp = data['result'];

                for(var i =0; i<tmp.length; i++){
                    this.content = true;
                    this.qnas.push(new Qna(tmp[i]['qnaIdx'],tmp[i]['qnaTitle'],tmp[i]['qnaDes'],tmp[i]['likesCount'], tmp[i]['createdAt']));

                }

            },
            error => console.log(error)
        );




        this.itemService.getReview(this.lectureIdx,1).subscribe(
            data =>{
                this.review = data['result'];
                if(this.review['result'].length != 0)  this.content2 = true;

            },
            error => console.log(error)
        );




    }

    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }





    //방향 4: 위, 방향 8: 아래
    public please(args){

        if(args.direction == 4){
            this.scrollState = true;
        }
        else if(args.direction == 8){
            this.scrollState = false;
        }
    }

    public go(){
        this.utilityModule.openUrl(this.info['lectureLink']);

    }


    // infinite scroll
    loadMoreItems() {
        this.page++;
        this.itemService.getQnas(this.lectureIdx,this.page).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.qnas.push(new Qna(tmp[i]['qnaIdx'],tmp[i]['qnaTitle'],tmp[i]['qnaDes'],tmp[i]['likesCount'], tmp[i]['createdAt']));

                }

            },
            error => console.log(error)
        );
    }

    public onItemTap(args) {

    }

    changeLike(){
        if(hasKey("JWT")) {
            this.itemService.changeLike(this.jwt, this.lectureIdx).subscribe(
                data => {
                    this.likeState = !this.likeState;
                    if (!this.likeState) Toast.makeText("관심강의에서 해제되었습니다").show();
                    else Toast.makeText("관심강의로 등록되었습니다").show();
                },
                error => {
                    Toast.makeText("강의 즐겨찾기는 로그인 후 이용가능합니다").show();
                }
            );
        }else{
            Toast.makeText("강의 즐겨찾기는 로그인 후 이용가능합니다").show();
        }




    }




    setRatingHighlight(rate: number){
        this.rating = rate;
    }

    goBack(){
        this.routerExtensions.back();
    }


    buttonClick(){
        this.showDialog();
    }


}
