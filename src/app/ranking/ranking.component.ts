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

    constructor(private rankingService: RankingService) {
        this.page=1;
        this.categoryIdx=1;
        this.subcategoryIdx=1;

    }

    ngOnInit(): void {

        this.state =[]
        this.categoryList =[];
        this.subcategoryList=[];
        this.lectures = [];
        this.categoryList = ['웹 Frontend','앱 Frontend','Backend','Full Stack','게임','ai','알고리즘','데이터사이언스','네트워크/보안','컴퓨터 과학','언어','기타'];
        for(var i=0;i<this.categoryList.length;i++)
            this.state.push(false);
        this.rankingService.getLectures(this.page, this.categoryIdx, this.subcategoryIdx).subscribe(
            data =>{
                var tmp = data['result'];
                console.log(tmp);
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'], tmp[i]['rating']));
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

    changeHighlight(index: number){

        for(var i=0;i<this.state.length;i++) this.state[i] = false;
        this.state[index] = true;


        this.rankingService.getSubcategoryList(index+1).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                  //  console.log(tmp[i]['subcategoryName'])

                   this.subcategoryList.push(new subcategoryCard(tmp[i]['subcategoryIdx'],tmp[i]['subcategoryName']));

                }

            },
            error => console.log(error)
        );



    };
}
