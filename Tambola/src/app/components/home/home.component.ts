import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  display = "none";

  constructor(public service: MainServiceService) {
    this.fillDataSet();
    this.service.arrayLength = this.service.dataSet.length;

  }

  ngOnInit(): void {
    this.service.numbers = [];
    this.fillNumbers();
    setTimeout(() => {
      this.service.scrollToView("" + this.service.randomNumber[this.service.randomNumber.length - 1]);
    }, 1000);

  }

  fillNumbers() {
    for (let i = 1; i <= 90; i++) {
      this.service.numbers.push(i);
    }
  }



  fillDataSet() {
    for (let i = 1; i <= 90; i++) {
      this.service.dataSet.push(i);
    }
  }



  getClass(num: number) {
    let className = "allnumber";
    if (this.service.randomNumber.indexOf(num) != -1) {
      className += " marked";
    }
    return className;
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  getNumber() {
    if (this.service.type == "1") {
      this.service.getNumber();
    }
  }

}
