import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {LectureService} from "./lectures.service";
import {lectureCard} from "./lectureCard";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {EventData, getViewById, Slider} from "@nativescript/core";
import { Page } from "@nativescript/core";
import { RouterExtensions} from "@nativescript/angular";



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
    rating : number;
    level: number;
    price: number;
    slider: Slider;
    check: boolean;



    constructor(private lectureService: LectureService,private pg: Page, private routerExtensions: RouterExtensions) {
        this.lectures = [];
        this.counter = 0;
        this.page = 1;
        for (var i = 0; i < 50; i++) {
            this.lectures.push();
            this.counter = i;
        }
    }


    ngOnInit(): void {
        this.check=false;
        this.rating = 0;
        this.level= 0;
        this.price =-1;
        this.searchword = "";
        this.lectureService.getLectures(1, this.searchword, this.price, this.level, this.rating ).subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<tmp.length; i++){
                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'], tmp[i]['price'], tmp[i]['rating']));
                    this.counter = i;
                }

            },
            error => console.log(error)
        );



        this.lectureService.posttest().subscribe(
            data =>{
               console.log(data)

            },
            error => console.log(error)
        );





    }

    // infinite scroll
    loadMoreItems() {
        this.page++;
        this.lectureService.getLectures(this.page, this.searchword, this.price, this.level, this.rating).subscribe(
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



    onOpenDrawerTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    onCloseDrawerTap() {
        this.drawerComponent.sideDrawer.closeDrawer();
    }

    performSearch(){
        this.page =1;
        this.lectureService.getLectures(this.page, this.searchword, this.price, this.level, this.rating).subscribe(
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

    setRatingHighlight(rate: number){
        this.rating = rate;
    }

    setLevelHighlight(rate: number){
        this.level = rate;
    }

    onSliderValueChange(args) {
        this.check = true;
        this.slider = <Slider>args.object;

    }


    onRedoTap(){
        if(this.check) this.slider.value=0;
        this.rating = 0;
        this.level = 0;

    }

    completeCheck() {

        if(this.check){
            let val = this.slider.value;
            if (val < 17) this.price = 25000;
            else if (val < 29) this.price = 50000;
            else if (val < 40) this.price = 75000;
            else if (val < 52) this.price = 100000;
            else if (val < 66) this.price = 150000;
            else if (val < 78) this.price = 200000;
            else if (val < 93) this.price = 250000;
            else this.price = 300000;
        }
        this.onCloseDrawerTap();
        this.performSearch();

    }


    itemClick(args){
        //console.log(args.object.idx);
        this.routerExtensions.navigate(['/lecture',args.object.idx]);

    }



}


