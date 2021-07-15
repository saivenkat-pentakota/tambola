import { MainServiceService } from 'src/app/services/main-service.service';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  dropdownSettings!: IDropdownSettings;
  ngOnInit() {


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userName',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.service.calculateWonAmount();
  }
  onSelectAll(items: any) {
    this.service.calculateWonAmount();
  }

  onDeSelect(){
    this.service.calculateWonAmount();
  }

  onDeSelectAll(){
    this.service.calculateWonAmount();
  }

  constructor(public service:MainServiceService) { }



}
