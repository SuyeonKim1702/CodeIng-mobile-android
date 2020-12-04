import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {AndroidActivityBackPressedEventData, AndroidApplication, GestureEventData} from "@nativescript/core";
import {Router} from "@angular/router";
import * as application from "@nativescript/core/application";
import {RouterExtensions} from "@nativescript/angular";


@Component({
    selector: "ns-items",
    templateUrl: "./signup2.component.html",
    styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {

    inputName: string;
    phoneNumber: string;
    dialogOpen = false;
    alert_message="";
    constructor(private zone:NgZone, private routerExtensions: RouterExtensions) { }

    ngOnInit(): void {

        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

                if (this.routerExtensions.router.isActive("/signup2", false)) {
                    data.cancel = true;
                    this.zone.run(() => {
                        this.routerExtensions.back();
                    });


                }

            });
        }


     this.inputName ="";
     this.phoneNumber="";

    }

    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }

    public next() {
        if (this.phoneNumber.length == 0 || this.inputName.length == 0) {
            if (this.phoneNumber.length == 0) this.alert_message = "휴대폰 번호를 입력해주세요";
            if (this.inputName.length == 0) this.alert_message = "이름을 입력해주세요";
            this.showDialog();
        } else {
            this.routerExtensions.navigate(['/signup3', this.inputName, this.phoneNumber]);

        }

    }


}
