import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";




@Component({
    selector: "ns-items",
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    categoryList=[];
    categorys=[];
    state: Array<boolean>;
    state2: Array<boolean>;


    dialogOpen = false;
    keyword="";



    constructor() {



    }

    ngOnInit(): void {
        this.categorys = [{1: 'web'}, {2: 'app'}, {3: 'backEnd'}, {4: 'fullStack'}, {5: 'game'}, {6: 'ai'}, {7: 'algorithm'}, {8: 'dataScience'},
            {9: 'network'}, {10: 'computerScience'}, {11: 'language'}, {12: 'otherCategory'}];
        this.categoryList =['web', 'app', 'backEnd','fullStack','game','ai','algorithm', 'dataScience',
            'network', 'computerScience','language','otherCategory'];

        this.state =[];
        this.state2 =[];

        for(var i=0;i<80;i++) this.state.push(false);
        for(var i=0;i<80;i++) this.state2.push(false);

    }

    onOpenDrawerTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    onCloseDrawerTap() {
        this.drawerComponent.sideDrawer.closeDrawer();
    }


    public onSelectTapped(): void {

    }


    showDialog() {
        this.dialogOpen = true;

    }

    closeDialog() {
        this.dialogOpen = false;
    }

    onTextChanged(args){



    }

    onItemTap(args){

    }

    //얘를 눌렀을 때, api 호출
    changeHighlight(index: number){

        this.state[index] = !this.state[index];


    };




public next(){

}

    redo(){

    }

    //close & 검색
    complete() {
    }


}
