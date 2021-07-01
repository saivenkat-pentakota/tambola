import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numbers:number[]= [];
  randomNumber:number[]= [0];
  dataSet:number[]=[];
  arrayLength=0;
  gameId:number=1234;

  constructor() {
    this.fillDataSet();
    this.arrayLength=this.dataSet.length;

  }

  ngOnInit(): void {
    this.fillNumbers();
    setTimeout(()=>{
      this.scrollToView(""+this.randomNumber[this.randomNumber.length-1]);
    },1000);
  }

  fillNumbers(){
    for(let i=1;i<=90;i++){
      this.numbers.push(i);
    }
  }

  scrollToView(num:string){
    var element = document.getElementById(num);
    if(element!=undefined){
      element.scrollIntoView();
    }
  }

  fillDataSet(){
    for(let i=1;i<=90;i++){
      this.dataSet.push(i);
    }
  }

  getNumber(){

    if(this.dataSet.length!=0){
      let index=Math.floor(Math.random()*(this.arrayLength+1));
      if(index == this.arrayLength){
        this.getNumber();
        return;
      }
      console.log('index:'+index+' number:'+this.dataSet[index]+' length-'+this.arrayLength);
      this.randomNumber.push(this.dataSet[index]);
      this.dataSet.splice(index,1);
      this.arrayLength--;
      setTimeout(()=>{
        this.scrollToView(""+this.randomNumber[this.randomNumber.length-1]);
      },1000);
    }

  }

  getClass(num:number){
    let className="allnumber";
    if(this.randomNumber.indexOf(num)!=-1){
        className+=" marked";
    }
    return className;
  }
}
