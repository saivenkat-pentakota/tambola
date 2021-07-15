import { MainServiceService } from 'src/app/services/main-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameguardGuard implements CanActivate {

  constructor(private service:MainServiceService ,private route:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.service.gameKey ==undefined || this.service.gameKey ==''){
        this.route.navigate(['/userLogin']);
        return false;
      }
    return true;
  }

}
