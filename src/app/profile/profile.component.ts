import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import {ProfileService} from "./profile.service";
import {getString} from "@nativescript/core/application-settings";
import {Router} from "@angular/router";




@Component({
    selector: "ns-items",
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    categoryList=[];
    subcategoryList=[];
    final_cate = [];
    final_subcate = [];
    categorys=[];
    state: Array<boolean>;
    state2: Array<boolean>;
    click: Array<boolean>;
    level_state: Array<boolean>;


    dialogOpen = false;
    check1 : boolean;
    check2 : boolean;
    check3 : boolean;

    interestCategory = [];
    interestSubcategory = [];
    cateState: boolean;
    subcateState: boolean;
    level: string;
    final_level: number;




    constructor(private profileService: ProfileService, private router: Router) {


    }

    ngOnInit(): void {
        this.cateState = false;
        this.subcateState = false;
        this.check1 = false;
        this.check2 = false;
        this.check3 = false;
        this.level_state = [];


        const jwt: string = getString("JWT");

        this.profileService.getProfile(jwt).subscribe(
            data =>{

                this.level = data['result']['levelIdx'];
                this.interestCategory = data['result']['category'];
                this.interestSubcategory = data['result']['subcategory'];

                for(var i=0; i< this.interestCategory.length; i++){
                    this.state[this.interestCategory[i]['categoryIdx']] = true;

                }


                for(var i=0; i< this.interestSubcategory.length; i++){
                    this.state2[this.interestSubcategory[i]['subcategoryIdx']] = true;
                    this.final_subcate.push(this.interestSubcategory[i]['subcategoryIdx']);
                }
                this.level_state[0] = false;
                for(var i =1; i<7; i++)
                    this.level_state[i] = false;
                this.level_state[this.level] =  true;



                //관심 카테고리 설정되어 있을  - visibility 변경
                if(this.interestCategory.length>0){
                    this.cateState = true;
                }
                if(this.interestSubcategory.length>0){
                    this.subcateState = true;
                }



            },
            error => console.log(error)
        );



       // 전체 카테고리 목록 받아오기
        this.profileService.getCategoryList().subscribe(
            data => {
                    this.categoryList = data['result'];

            },
            error => console.log(error)
        );

       //전체 서브카테고리 목록 받아오기
        this.profileService.getSubcategoryList(0).subscribe(
            data => {
                this.subcategoryList = data['result'];

            },
            error => console.log(error)
        );

        this.state =[];
        this.state2 =[];

        for(var i=0;i<80;i++) this.state.push(false);
        for(var i=0;i<80;i++) this.state2.push(false);


    }

    onOpenDrawerTap(index: number, cateIdx: number) {

            this.interestCategory.splice(index,1);
            this.changeHighlight(cateIdx);
            if(this.interestCategory.length<1) this.cateState = false;
    }
    onCloseDrawerTap() {
        this.check1 = false;
        this.drawerComponent.sideDrawer.closeDrawer();
    }


    onOpenDrawerTap2(index: number, cateIdx: number) {

        this.interestSubcategory.splice(index,1);
            this.changeHighlight2(cateIdx);
            if(this.interestSubcategory.length<1) this.subcateState = false;


    }
    onCloseDrawerTap2() {
        this.check2 = false;
        this.drawerComponent.sideDrawer.closeDrawer();
    }



    drawer1(){
        this.check1 = true;
        this.check2 = false;
        this.check3 = false;
        this.drawerComponent.sideDrawer.showDrawer();
    }

    drawer2(){
        this.check2 = true;
        this.check1 = false;
        this.check3 = false;
        this.drawerComponent.sideDrawer.showDrawer();
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



    //얘를 눌렀을 때, api 호출
    changeHighlight2(index: number){

        this.state2[index] = !this.state2[index];


    };








    redo(){
     for(var i=0;i<this.state.length;i++)
         this.state[i] = false;

    }

    redo2(){
        for(var i=0;i<this.state2.length;i++)
            this.state2[i] = false;

    }


    //close & 검색
    complete() {
    this.onCloseDrawerTap();

        this.interestCategory.splice(0, this.interestCategory.length);
        this.final_cate.splice(0, this.final_cate.length);

        for(var i=0;i<this.state.length;i++) {
            if(this.state[i]) {

                this.interestCategory.push(this.categoryList[i - 1]);
                this.cateState = true;
                this.final_cate.push(this.categoryList[i-1]['categoryIdx']);
            }

        }
        if(this.interestCategory.length == 0) this.cateState = false;



    }



    //close & 검색
    complete2() {
        this.onCloseDrawerTap();

        this.interestSubcategory.splice(0, this.interestSubcategory.length);
        this.final_subcate.splice(0, this.final_subcate.length);

        for(var i=0;i<this.state2.length;i++) {
            if(this.state2[i]) {

                this.interestSubcategory.push(this.subcategoryList[i - 1]);
                this.subcateState = true;
                this.final_subcate.push(this.subcategoryList[i-1]['subcategoryIdx']);
            }

        }
        if(this.interestSubcategory.length == 0) this.subcateState = false;



    }

    changeColor(index: number){
    for(var i=1; i<7; i++)
        this.level_state[i] = false;
        this.level_state[index] = true;
    }




    public next(){
        this.final_cate =[];
        this.final_subcate =[];
        for(var i=0; i<this.interestCategory.length; i++){
            this.final_cate.push(this.interestCategory[i]['categoryIdx']);

        }

        for(var i=0; i<this.interestSubcategory.length; i++){
            this.final_subcate.push(this.interestSubcategory[i]['subcategoryIdx']);

        }

        for(var i =1; i<7; i++){
            if(this.level_state[i]) {
                this.final_level = i;
                break;
            }
        }



        this.router.navigate(['/profile2', this.final_cate.toString(), this.final_subcate.toString(), this.final_level]);

    }





}


