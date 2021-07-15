import { MainServiceService } from 'src/app/services/main-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  activeItem=1;

  constructor(public service:MainServiceService) { }

  ngOnInit(): void {
  }

}
