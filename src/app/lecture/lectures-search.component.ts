import {Component, OnInit, ViewChild} from "@angular/core";
import {OtherService} from "./other.service";
import {LectureService} from "./lectures.service";
import {lectureCard} from "./lectureCard";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {observable} from "rxjs";





@Component({
    selector: "ns-details",
    templateUrl: "./lectures-search.component.html",
    styleUrls: ['./lectures-search.component.css']

})

export class LecturesSearchComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    public lectures: Array<lectureCard>;
    private counter: number;
    page: number;
    searchword ="";


    constructor(private lectureService: LectureService) {
        this.lectures = [];
        this.counter = 0;
        this.page = 1;
        for (var i = 0; i < 50; i++) {
            this.lectures.push();
            this.counter = i;
        }
    }


    ngOnInit(): void {
        this.searchword = "";
        this.lectureService.getLectures(1, this.searchword).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'], tmp[i]['rating']));
                    this.counter = i;
                }

            },
            error => console.log(error)
        );

    }

    // infinite scroll
    loadMoreItems() {
        this.page++;
        this.lectureService.getLectures(this.page, this.searchword).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'],tmp[i]['rating'] ));
                    this.counter = i;
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

    performSearch(args){

      console.log(this.searchword);
        this.lectureService.getLectures(this.page, this.searchword).subscribe(
            data =>{
                var tmp = data['result'];
                this.lectures.length = 0;
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'],tmp[i]['rating'] ));
                    this.counter = i;

                }

            },
            error => console.log(error)
        );





    }

}


