import { MainServiceService } from 'src/app/services/main-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tambola';

  constructor(public service:MainServiceService){}
}
