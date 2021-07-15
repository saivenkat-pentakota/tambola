import { GameguardGuard } from './guard/gameguard.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { SubSettingsComponent } from './components/sub-settings/sub-settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainpageComponent,
    SettingsComponent,
    SubSettingsComponent,
    ProfileComponent,
    GameDetailsComponent,
    AdminloginComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Tambola'),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [GameguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
