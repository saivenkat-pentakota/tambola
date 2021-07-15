import { GameDetailsComponent } from './components/game-details/game-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { GameguardGuard } from './guard/gameguard.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  {path: 'userLogin', component: MainpageComponent},
  {path: 'home', component: HomeComponent ,canActivate:[GameguardGuard]},
  {path: '', redirectTo: '/userLogin', pathMatch: 'full'},
  {path: 'settings',component:SettingsComponent,canActivate:[GameguardGuard]},
  {path: 'admin',component:AdminloginComponent},
  {path: 'user',component:UserComponent},
  {path: 'game-details',component:GameDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
