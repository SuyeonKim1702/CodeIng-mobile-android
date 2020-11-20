import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData} from "@nativescript/core";
import {RankingService} from "./ranking.service";
import {lectureCard} from "../lecture/lectureCard";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {subcategoryCard} from "./subcategoryCard";



@Component({
    selector: "ns-items",
    templateUrl: "./ranking.component.html",
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;


    public lectures: Array<lectureCard>;
    public categoryList: Array<String>;
    public subcategoryList: Array<subcategoryCard>
    categoryIdx: number;
    page: number;
    subcategoryIdx: number;
    state: Array<boolean>;
    state2: Array<boolean>;
    searchword ="";
    prev: number;
    prev2: number;
    title = "Web Frontend Ranking";

    constructor(private rankingService: RankingService) {
        this.page=1;
        this.categoryIdx=1;
        this.subcategoryIdx=1;

    }

    ngOnInit(): void {
        this.prev = 0;
        this.prev2 = 0;
        this.state =[];
        this.state2 =[];
        this.categoryList =[];
        this.subcategoryList=[];
        this.lectures = [];
        this.categoryList = ['웹 Frontend','앱 Frontend','Backend','Full Stack','게임','ai','알고리즘','데이터사이언스','네트워크/보안','컴퓨터 과학','언어','기타'];
        for(var i=0;i<80;i++) this.state.push(false);
        for(var i=0;i<80;i++) this.state2.push(false);

        this.rankingService.getLectures(this.page, this.categoryIdx, this.subcategoryIdx).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'], tmp[i]['rating']));
                }

            },
            error => console.log(error)
        );

        this.rankingService.getSubcategoryList(1).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.subcategoryList.push(new subcategoryCard(tmp[i]['subcategoryIdx'],tmp[i]['subcategoryName']));
                }

            },
            error => console.log(error)
        );

    }


    // infinite scroll
    loadMoreItems() {
        this.page++;
        this.rankingService.getLectures(this.page, this.categoryIdx, this.subcategoryIdx).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'],tmp[i]['rating'] ));

                }

            },
            error => console.log(error)
        );
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }

    onOpenDrawerTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    onCloseDrawerTap() {
        this.drawerComponent.sideDrawer.closeDrawer();
    }
    //얘를 눌렀을 때, api 호출
    changeHighlight(index: number){
        this.state[this.prev] = false;
        this.state[index] = true;
        this.prev = index;
        this.subcategoryList =[];


        this.rankingService.getSubcategoryList(index+1).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.subcategoryList.push(new subcategoryCard(tmp[i]['subcategoryIdx'],tmp[i]['subcategoryName']));
                }

            },
            error => console.log(error)
        );





    };

    changeHighlight2(index: number){
        this.state2[this.prev2] = false;
        this.state2[index] = true;
        this.prev2 = index;



    };

    performSearch(){
        this.page =1;

    }

    redo(){
        this.state[this.prev] = false;
        this.state[0] = true;
        this.prev = 0;

        this.state2[this.prev2] = false;
        this.state2[0] = true;
        this.prev2 = 0;

        this.subcategoryList =[];
    }

    //close & 검색
    complete(){
        this.onCloseDrawerTap();
        this.categoryIdx= this.prev+1;
        this.subcategoryIdx = this.subcategoryList[this.prev2].subcategoryIdx;
        this.lectures = [];
        this.title = this.categoryList[this.prev] +" Ranking";

        this.rankingService.getLectures(1, this.categoryIdx, this.subcategoryIdx).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'],tmp[i]['rating'] ));

                }

            },
            error => console.log(error)
        );

    }
}

