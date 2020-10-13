import { Component, OnInit } from "@angular/core";
import {OtherService} from "./other.service";
import {LectureService} from "./lectures.service";
import {lectureCard} from "./lectureCard";



@Component({
    selector: "ns-details",
    templateUrl: "./lectures-search.component.html",
    styleUrls: ['./lectures-search.component.css']

})

export class LecturesSearchComponent implements OnInit {


    public lectures: Array<lectureCard>;
    private counter: number;

    constructor(private lectureService: LectureService) {
        this.lectures = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.lectures.push();
            this.counter = i;
        }
    }


    ngOnInit(): void {

        this.lectureService.getLectures().subscribe(
            data =>{
                var tmp = data['result'];
                for(var i =0; i<=tmp.length; i++){

                    this.lectures.push(new lectureCard(tmp[i]['lectureIdx'],tmp[i]['lectureName'],tmp[i]['siteName'],tmp[i]['thumbUrl'] ));
                    this.counter = i;
                }

            },
            error => console.log(error)
        );

    }

    // infinite scroll
    loadMoreItems() {
     console.log("언제 호출되니?");
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
}
