import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {ProfileService} from "./profile.service";
import {getString} from "@nativescript/core/application-settings";
import {ActivatedRoute, Router} from "@angular/router";
import {
    AndroidActivityBackPressedEventData,
    AndroidApplication,
    Button,
    EventData,
    SelectedIndexChangedEventData
} from "@nativescript/core";
import {observable} from "rxjs";
import {DateTimePicker} from "@nativescript/datetimepicker";
import {RouterExtensions} from "@nativescript/angular";
import * as application from "@nativescript/core/application";


@Component({
    selector: "ns-items",
    templateUrl: "./profile2.component.html",
    styleUrls: ['./profile2.component.css']
})



export class Profile2Component implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    category: any;
    subcategory: any;
    level: number;
    job_state: Array<boolean>;
    g_state: Array<boolean>;
    school ="";
    final_job="";
    gender="";
    jwt="";
    public selectedIndex = 1;
    public items: Array<string>;

    public dateText: string = "";
    public selectedDate: Date;
    job = {1:'S', 2:'T', 3:'N', 4:'D' };



    @ViewChild("scrollView", { static: false }) scrollView: ElementRef;







    constructor(private profileService: ProfileService, private route: ActivatedRoute, private routerExtensions: RouterExtensions, private zone: NgZone) {

        this.items = [];
        for (var i = 0; i < 5; i++) {
            this.items.push("data item " + i);
        }


        this.route.params.subscribe((params) => {
            this.category = JSON.parse("["+params["category"] + "]");
            this.subcategory = JSON.parse("[" + params["subcategory"]+ "]");
            this.level = params["level"];

        });


    }

    ngOnInit(): void {

        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/profile2/"+this.category+"/"+this.subcategory+"/"+this.level, false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }




        this.job_state = [];
        this.g_state = [];
        this.g_state[0] = false;
        this.g_state[1] = false;
        for(var i=1; i<5;i++)
            this.job_state[i] = false;

        this.jwt = getString("JWT");



        this.profileService.getProfile(this.jwt).subscribe(
            data =>{

                this.school = data['result']['school'];
                this.dateText = data['result']['birthday'];

                if(data['result']['gender'] == 'M') this.g_state[0] = true;
                else this.g_state[1] = true;

                switch(data['result']['job']){
                    case 'S': this.job_state[1] = true; break;
                    case 'T': this.job_state[2] = true; break;
                    case 'N': this.job_state[3] = true; break;
                    case 'D': this.job_state[4] = true; break;
                }


            },
            error => console.log(error)
        );

    }

    //얘를 눌렀을 때, api 호출
    changeColor(index: number){

        for(var i=1;i<5;i++) this.job_state[i] = false;
        this.job_state[index] = true;

    };


    changeColor2(index: number){

        for(var i=0;i<2;i++) this.g_state[i] = false;
        this.g_state[index] = true;

    };


    onDatePickerLoaded(args) {
        // const datePicker = args.object as DatePicker;
    }

    onDateChanged(args) {
        console.log("Date New value: " + args.value);
        console.log("Date value: " + args.oldValue);
    }

    onDayChanged(args) {
        console.log("Day New value: " + args.value);
        console.log("Day Old value: " + args.oldValue);
    }

    onMonthChanged(args) {
        console.log("Month New value: " + args.value);
        console.log("Month Old value: " + args.oldValue);
    }

    onYearChanged(args) {
        console.log("Year New value: " + args.value);
        console.log("Year Old value: " + args.oldValue);
    }


    onPickDateTap(args: EventData): void {
        const dateToday = new Date();
        const dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
        const dateNextWeek = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 7);
        DateTimePicker.pickDate({
            context: (<Button>args.object)._context,
            date: dateTomorrow,
            maxDate: dateToday,
            okButtonText: "확인",
            cancelButtonText: "취소",
            locale: "ko_KR"
        }).then((selectedDate: Date) => {
            if (selectedDate) {
                this.dateText = this.getFormattedDate(selectedDate);
            }
        });
    }

    getFormattedDate(date: Date): string {
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        return y +'-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d ;
    }

  //전송
    next(){
        for(var i=0;i<5;i++){
            if(this.job_state[i]){
                this.final_job = this.job[i];
                break;
            }
        }


        if(this.g_state[0]) this.gender ='M';
        else this.gender = 'W';





        this.profileService.patchProfile(this.jwt,this.dateText, this.school, this.final_job, this.gender, this.category , this.subcategory ,this.level).subscribe(
            data =>{
                this.routerExtensions.navigate(['/profile3'], { clearHistory: true });


            },
            error => console.log(error)
        );





    }

    goBack(){
        this.routerExtensions.back();


}


}
