import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {AndroidActivityBackPressedEventData, AndroidApplication, GestureEventData} from "@nativescript/core";
import * as application from "@nativescript/core/application";
import {RouterExtensions} from "@nativescript/angular";


@Component({
    selector: "ns-items",
    templateUrl: "./signup.component.html",
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    state: Array<boolean>;

    constructor(private zone: NgZone, public routerExtensions: RouterExtensions) { }

    ngOnInit(): void {


        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/signup", false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }







        this.state =[];
        for(var i=0;i<4;i++)
            this.state[i] = false;


    }

    onClick(arg){
        if(arg!=3){
            this.state[arg] = !this.state[arg];
        }else{
            if(this.state[arg]) this.state[arg] = false;
            else
                for(var i=0;i<4;i++)
                    this.state[i] = true;

        }

    }



}
