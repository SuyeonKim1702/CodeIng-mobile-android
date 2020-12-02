import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {EventData, GestureEventData, ImageSource} from "@nativescript/core";
import {OtherService} from "./other.service";
import {getString} from "@nativescript/core/application-settings";
import { RouterExtensions} from "@nativescript/angular";
import { ActivityIndicator} from "@nativescript/core";


@Component({
    selector: "ns-lectures",
    moduleId: module.id,
    templateUrl: "./lecture.component.html",
    styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {


    allLectures: any = [];
    recLectures: any = [];
    jwt: string;
    isBusy: boolean = true;


    constructor(private otherService: OtherService, private routerExtensions: RouterExtensions) {
        this.jwt = getString("JWT");

    }

    ngOnInit(): void {


        this.otherService.getOverallRanking().subscribe(
            data => {
                this.allLectures = data['result'];

            },
            error => console.log(error)
        );


        this.otherService.getRecommendContent(this.jwt).subscribe(
            data => {
                this.recLectures = data['result'];
            },
            error => console.log(error)
        );


    }

    itemClick(args) {
        //console.log(args.object.idx);
        this.routerExtensions.navigate(['/lecture', args.object.idx]);

    }

    onBusyChanged(args: EventData) {
        let indicator: ActivityIndicator = <ActivityIndicator>args.object;
        //console.log("indicator.busy changed to: " + indicator.busy);
        //this.isBusy = !this.isBusy;
    }
}
