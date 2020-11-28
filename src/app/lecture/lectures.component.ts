import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {GestureEventData, ImageSource} from "@nativescript/core";
import {OtherService} from "./other.service";
import {getString} from "@nativescript/core/application-settings";
import { RouterExtensions} from "@nativescript/angular";



@Component({
    selector: "ns-items",
    templateUrl: "./lectures.component.html",
    styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {


    allLectures: any = [];
    recLectures: any = [];
    jwt: string;






    constructor(private otherService: OtherService, private routerExtensions: RouterExtensions) {
        this.jwt = getString("JWT");

    }

    ngOnInit(): void {




        this.otherService.getOverallRanking().subscribe(
            data =>{
               this.allLectures = data['result'];

            },
                error => console.log(error)
        );


        this.otherService.getRecommendContent(this.jwt).subscribe(
            data =>{
                this.recLectures = data['result'];
            },
            error => console.log(error)
        );








    }

    itemClick(args){
        //console.log(args.object.idx);
        this.routerExtensions.navigate(['/lecture',args.object.idx]);

    }

}
