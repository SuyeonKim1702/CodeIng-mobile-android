import { Component, OnInit } from "@angular/core";
import {Page, View} from "@nativescript/core";
import {AnimationCurve, Visibility} from "@nativescript/core/ui/enums";
import * as Toast from 'nativescript-toast';
import {
    getString, hasKey,

} from "@nativescript/core/application-settings";


import {ActivatedRoute} from "@angular/router";
import {ItemService} from "./item.service";
import {Qna} from "./item";

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




    constructor(private view:Page, private itemService: ItemService, private route: ActivatedRoute) {



        this.route.params.subscribe((params) => {
            this.lectureIdx = params["lectureIdx"];
            this.utilityModule = require("utils/utils");

        });
    }

    ngOnInit(): void {
        const jwt: string = getString("JWT");
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


        this.itemService.checkFavLecture(jwt, this.lectureIdx).subscribe(
            data =>{
                this.likeState =  data['state'];
                console.log(this.likeState+'머');
            },
            error => console.log(error)
        );




        this.itemService.getQnas(this.lectureIdx,1).subscribe(
            data =>{
                var tmp = data['result'];

                for(var i =0; i<tmp.length; i++){
                    this.qnas.push(new Qna(tmp[i]['qnaIdx'],tmp[i]['qnaTitle'],tmp[i]['qnaDes'],tmp[i]['likesCount'], tmp[i]['createdAt']));

                }

            },
            error => console.log(error)
        );




        this.itemService.getReview(this.lectureIdx,1).subscribe(
            data =>{
                this.review = data['result'];

            },
            error => console.log(error)
        );




    }

    //방향 4: 위, 방향 8: 아래
    public please(args){


        var stack = <View>this.view.getViewById("stack");

        if(args.direction == 4){
            stack.visibility='collapse';
        }
        if(args.direction == 8){
            stack.visibility='visible';
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
        if(this.likeState){
            this.likeState = false;
            Toast.makeText("관심강의에서 해제되었습니다").show();
            console.log(this.likeState);

        }
        else {
            this.likeState = true;
            Toast.makeText("관심강의로 등록되었습니다").show();
            console.log(this.likeState);
        }


    }




    setRatingHighlight(rate: number){
        this.rating = rate;
    }



}
