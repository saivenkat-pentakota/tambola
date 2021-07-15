import { MainServiceService } from 'src/app/services/main-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service:MainServiceService) { }

  ngOnInit(): void {
  }

}
