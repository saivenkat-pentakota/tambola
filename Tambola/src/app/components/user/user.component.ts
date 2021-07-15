import { MainServiceService } from 'src/app/services/main-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user:any;

  constructor(public service:MainServiceService) { }

  ngOnInit(): void {
  }


  delete(){

  }

}
