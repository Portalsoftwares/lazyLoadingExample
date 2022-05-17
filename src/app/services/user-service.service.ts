import { NumberFormatStyle } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../layouts/form/user.model';
import { CommonComponent } from '../models/common.component';
import { LoginUser } from '../models/login-user';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  users: Array<User> = new Array<User>();
  currentUser!: string;
  activatedRoute!: CommonComponent;
  private _loggedOut: Subject<void> = new Subject<void>();

  public get loggedOut(): Observable<void> {
    return this._loggedOut.asObservable();
  }

  constructor(private router: Router, private authService: AuthService) {}

  logOut(): void {
    this.activatedRoute.canDeactivateComponent().subscribe((x) => {
      if (!x) {
        return;
      }
      this.router.navigateByUrl('login');
      this.authService.authToken = '';
      this._loggedOut.next();
      localStorage.removeItem('token');
    });
  }

  public objectShallowEquality(object1: User, object2: User) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if ((object1 as any)[key] !== (object2 as any)[key]) {
        return false;
      }
    }

    return true;
  }
}
