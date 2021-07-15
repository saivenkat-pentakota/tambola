import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  defaultNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    , 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
  ispaused = false;
  defaulttime = 5;
  timeLeft: number = this.defaulttime;
  interval: any;
  alert=false;
  alertMessage= "";
  pin = "";
  gameKey: any;
  users = [{ userName: 'admin', tickets: 0, won: 0 }];
  userName = "";
  type = "0";
  isAdmin = false;
  singleticketcost = 0;
  noOfTickets = 0;
  totalCost = 0;
  numbers: number[] = Object.assign([], this.defaultNumbers);
  randomNumber: number[] = [0];
  dataSet: number[] = Object.assign([], this.defaultNumbers);
  arrayLength = 0;
  selectedItems = {
    jaldhi: [],
    topLine: [],
    middleLine: [],
    bottomLine: [],
    housie: [],
  }
  typeAmount = {
    jaldhi: 0,
    topLine: 0,
    middleLine: 0,
    bottomLine: 0,
    housie: 0,
  }

  gameTypes = ['jaldhi', 'topLine', 'middleLine', 'bottomLine', 'housie'];
  constructor(private db: AngularFireDatabase, private route: Router) { }

  validateGame() {
    this.db.database.ref('games/' + this.gameKey).on('value', (snapshot) => {
        let gamedetails = (snapshot.val());
        if(gamedetails == null){
          this.createGame(true);
        }else{
          if(gamedetails['pin'] == this.pin){
            this.createGame(false);
          }else{
            this.alertMessage='wrong pin entered';
            this.alert = true;
          }
        }
    }, (errorObject) => {
      this.createGame(true);
    });
  }

  validateUserEntry(){
    this.db.database.ref('games/' + this.gameKey).on('value', (snapshot) => {
      let gamedetails = (snapshot.val());
      if(gamedetails == null){
        this.alertMessage='wrong Game Key entered';
        this.alert = true;
      }else{
        this.enterGame();
      }
  }, (errorObject) => {
    this.alertMessage='wrong Game Key entered';
    this.alert = true;
  });
  }

  async createGame(validate:boolean) {
    if (validate) {
      await this.db.object('games/' + this.gameKey).update({
        gameid: this.gameKey,
        pin: this.pin,
        numbers: this.numbers,
        randomNumber: this.randomNumber,
        dataSet: this.dataSet,
        arrayLength: this.arrayLength,
        users: this.users,
        singleticketcost: this.singleticketcost,
        noOfTickets: this.noOfTickets,
        totalCost: this.totalCost,
        selectedItems: JSON.stringify(this.selectedItems),
        typeAmount: JSON.stringify(this.typeAmount)

      });
    }

    (await this.getGameDetails()).subscribe((data) => {
      this.setGameDetails(data);
    });
    this.isAdmin = true;
    this.ispaused = true;
    this.route.navigate(['/home']);


  }

  async enterGame() {

    (await this.getGameDetails()).subscribe((data) => {
      let users = data.users;
      let userFound = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].userName == this.userName) {
          userFound = true;
        }
      }
      if (!userFound) {
        let userData = {
          userName: this.userName,
          tickets: 0,
          won: 0,
        }
        users.push(userData);
        this.addUsers(users)
      }
      this.setGameDetails(data);

    });
    this.isAdmin = false;
    this.route.navigate(['/home']);

  }

  async addUsers(users: any) {
    await this.db.object('games/' + this.gameKey).update({
      users: users
    });
  }

  async updateGameDetails() {
    await this.db.object('games/' + this.gameKey).update({
      gameid: this.gameKey,
      numbers: this.numbers,
      randomNumber: this.randomNumber,
      dataSet: this.dataSet,
      arrayLength: this.arrayLength,
      users: this.users,
      singleticketcost: this.singleticketcost,
      noOfTickets: this.noOfTickets,
      totalCost: this.totalCost,
      selectedItems: JSON.stringify(this.selectedItems),
      typeAmount: JSON.stringify(this.typeAmount)
    });
  }

  async getGameDetails(): Promise<Observable<any>> {
    return this.db.object('games/' + this.gameKey).valueChanges();
  }

  async setGameDetails(data: any) {
    this.numbers = data['numbers'];
    this.randomNumber = data['randomNumber'];
    this.dataSet = data['dataSet'];
    this.arrayLength = data['arrayLength'];
    this.users = data['users'];
    this.singleticketcost = data['singleticketcost'];
    this.noOfTickets = data['noOfTickets'];
    this.totalCost = data['totalCost'];
    if (data['selectedItems'] != undefined)
      this.selectedItems = JSON.parse(data['selectedItems']);
    else {
      this.selectedItems = {
        jaldhi: [],
        topLine: [],
        middleLine: [],
        bottomLine: [],
        housie: [],
      }
    }

    if (data['typeAmount'] != undefined)
      this.typeAmount = JSON.parse(data['typeAmount']);
    else {
      this.typeAmount = {
        jaldhi: 0,
        topLine: 0,
        middleLine: 0,
        bottomLine: 0,
        housie: 0,
      }
    }
    setTimeout(() => {
      this.scrollToView("" + this.randomNumber[this.randomNumber.length - 1]);
    }, 10);
  }


  async scrollToView(num: string) {
    var element = document.getElementById(num);
    if (element != undefined) {
      element.scrollIntoView();
    }
  }


  async startTimer() {
    if (this.dataSet.length == 0) this.pauseTimer();
    if (this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      await this.getNumber();
      this.timeLeft = this.defaulttime;
    }
    this.ispaused = false;

    setTimeout(async () => {
      if (this.ispaused) return;
      await this.startTimer();
    }, 1000)
  }

  pauseTimer() {
    this.ispaused = true;
  }

  async getNumber() {
    if (this.dataSet.length <= 0) return;
    if (this.dataSet.length != 0) {
      let index = Math.floor(Math.random() * (this.arrayLength + 1));
      if ((this.dataSet.length > 0) && (this.randomNumber.indexOf(this.dataSet[index]) > -1)) {
        await this.getNumber();
        return;
      }
      this.randomNumber.push(this.dataSet[index]);
      this.dataSet.splice(index, 1);
      this.arrayLength--;
      await this.updateGameDetails();
      setTimeout(() => {
        this.scrollToView("" + this.randomNumber[this.randomNumber.length - 1]);
      }, 10);
    }
    return;
  }


  async reset() {
    this.numbers = Object.assign([], this.defaultNumbers);
    this.randomNumber = [0];
    this.dataSet = Object.assign([], this.defaultNumbers);
    this.arrayLength = this.dataSet.length;
    this.timeLeft = this.defaulttime;
    this.interval = undefined;
    this.ispaused = true;
    this.singleticketcost = 0;
    this.noOfTickets = 0;
    this.totalCost = 0;
    this.selectedItems = {
      jaldhi: [],
      topLine: [],
      middleLine: [],
      bottomLine: [],
      housie: [],
    }
    this.typeAmount = {
      jaldhi: 0,
      topLine: 0,
      middleLine: 0,
      bottomLine: 0,
      housie: 0,
    }
    this.makeEachUserTicketsToZero();
    await this.updateGameDetails();
  }

  makeEachUserTicketsToZero() {
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].tickets = 0;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  openSettings() {
    this.route.navigate(['/settings']);
  }

  openHome() {
    this.route.navigate(['/home']);
  }

  adminLogin() {
    this.route.navigate(['/admin']);
  }

  userLogin() {
    this.route.navigate(['/userLogin']);
  }

  deleteUser(userName: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userName == userName) {
        this.users.slice(i, 1);
        this.db.object('games/' + this.gameKey + '/users/' + i).remove();
        return;
      }
    }
  }

  checkUserWon(userName: any, type: any) {
    if (type == 'jaldhi') {
      for (let i = 0; i <= this.selectedItems.jaldhi.length; i++) {
        if (this.selectedItems.jaldhi[i]['item_id'] == userName) {
          return true;
        }
      }
    }
    return false;
  }

  calculate() {
    this.totalCost = this.singleticketcost * this.noOfTickets;
    this.updateGameDetails();
  }

  calculateNoOfTickets() {
    let tickets = 0;
    for (let i = 0; i < this.users.length; i++) {
      tickets += +this.users[i].tickets;
    }
    this.noOfTickets = tickets;
    this.calculate();
  }

  calculateWonAmount() {
    let usersWonAmount: Map<string, any> = new Map<string, any>();
    let JaldhiperUserAmount: number = this.typeAmount['jaldhi'] / this.selectedItems['jaldhi'].length;
    for (let i = 0; i < this.selectedItems['jaldhi'].length; i++) {
      let user = this.selectedItems['jaldhi'][i]['userName'];
      let wonprice: number = (usersWonAmount.get(user) ? usersWonAmount.get(user) : 0) + JaldhiperUserAmount;
      usersWonAmount.set(user, wonprice);
    }

    let topLineperUserAmount: number = this.typeAmount['topLine'] / this.selectedItems['topLine'].length;
    for (let i = 0; i < this.selectedItems['topLine'].length; i++) {
      let user = this.selectedItems['topLine'][i]['userName'];
      let wonprice: number = (usersWonAmount.get(user) ? usersWonAmount.get(user) : 0) + topLineperUserAmount;
      usersWonAmount.set(user, wonprice);
    }


    let middleLineperUserAmount: number = this.typeAmount['middleLine'] / this.selectedItems['middleLine'].length;
    for (let i = 0; i < this.selectedItems['middleLine'].length; i++) {
      let user = this.selectedItems['middleLine'][i]['userName'];
      let wonprice: number = (usersWonAmount.get(user) ? usersWonAmount.get(user) : 0) + middleLineperUserAmount;
      usersWonAmount.set(user, wonprice);
    }

    let bottomLineperUserAmount: number = this.typeAmount['bottomLine'] / this.selectedItems['bottomLine'].length;
    for (let i = 0; i < this.selectedItems['bottomLine'].length; i++) {
      let user = this.selectedItems['bottomLine'][i]['userName'];
      let wonprice: number = (usersWonAmount.get(user) ? usersWonAmount.get(user) : 0) + bottomLineperUserAmount;
      usersWonAmount.set(user, wonprice);
    }

    let housieperUserAmount: number = this.typeAmount['housie'] / this.selectedItems['housie'].length;
    for (let i = 0; i < this.selectedItems['housie'].length; i++) {
      let user = this.selectedItems['housie'][i]['userName'];
      let wonprice: number = (usersWonAmount.get(user) ? usersWonAmount.get(user) : 0) + housieperUserAmount;
      usersWonAmount.set(user, wonprice);
    }

    for (let i = 0; i < this.users.length; i++) {
      let user = this.users[i].userName;
      this.users[i].won = usersWonAmount.get(user) ? usersWonAmount.get(user) : 0;
    }

    this.updateGameDetails();
  }

  checkGameTypeWon(type: string, userName: string) {
    if (type == 'jaldhi')
      for (let i = 0; i < this.selectedItems['jaldhi'].length; i++) {
        let user = this.selectedItems['jaldhi'][i]['userName'];
        if (user == userName) return true;
      }

    if (type == 'topLine')
      for (let i = 0; i < this.selectedItems['topLine'].length; i++) {
        let user = this.selectedItems['topLine'][i]['userName'];
        if (user == userName) return true;
      }

    if (type == 'middleLine')
      for (let i = 0; i < this.selectedItems['middleLine'].length; i++) {
        let user = this.selectedItems['middleLine'][i]['userName'];
        if (user == userName) return true;
      }

    if (type == 'bottomLine')
      for (let i = 0; i < this.selectedItems['bottomLine'].length; i++) {
        let user = this.selectedItems['bottomLine'][i]['userName'];
        if (user == userName) return true;
      }

    if (type == 'housie')
      for (let i = 0; i < this.selectedItems['housie'].length; i++) {
        let user = this.selectedItems['housie'][i]['userName'];
        if (user == userName) return true;
      }
    return false;

  }

  addUserByAdmin() {
    let userData = {
      userName: 'New User',
      tickets: 0,
      won: 0,
    }
    this.users.push(userData);
    this.addUsers(this.users)
  }


}
