import { MainServiceService } from 'src/app/services/main-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(public service:MainServiceService) { }

  ngOnInit(): void {
  }


}
