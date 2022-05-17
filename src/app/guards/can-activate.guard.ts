import { GuardModel } from './../models/guard-model';
import { UserServiceService } from './../services/user-service.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {

  constructor(private userService: UserServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      let data: GuardModel = route.data as GuardModel;
      if(this.userService.currentUser===data.naziv){
        return true;
      }

    return false;
  }
}
