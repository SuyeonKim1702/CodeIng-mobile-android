import {Component, ElementRef, NgZone, OnInit, ViewChild} from "@angular/core";
import {AShowType, MSOption, MultiSelect, ADismissType} from "nativescript-multi-select";

@Component({
    selector: "ns-items",
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    private _MSelect: MultiSelect;
    private predefinedItems: Array<any>;
    public selectedItems: Array<any>;


    constructor(private zone: NgZone) {
        this._MSelect = new MultiSelect();
        this.predefinedItems = ["moi-a", "moi-b"];
    }

    ngOnInit(): void {

}

    public onSelectTapped(): void {
        const options: MSOption = {
            title: "Please Select",
            selectedItems: this.predefinedItems,
            items: [
                { name: "A", value: "moi-a" },
                { name: "B", value: "moi-b" },
                { name: "C", value: "moi-c" },
                { name: "D", value: "moi-d" },
            ],
            bindValue: 'value',
            displayLabel: 'name',
            onConfirm: selectedItems => {
                this.zone.run(() => {
                    this.selectedItems = selectedItems;
                    this.predefinedItems = selectedItems;
                    console.log("SELECTED ITEMS => ", selectedItems);
                })
            },
            onItemSelected: selectedItem => {
                console.log("SELECTED ITEM => ", selectedItem);
            },
            onCancel: () => {
                console.log('CANCEL');
            },
            android: {
                titleSize: 25,

            },
            ios: {

                showType: AShowType.TypeBounceIn
            }
        };

        this._MSelect.show(options);
    }





public next(){

}

}
