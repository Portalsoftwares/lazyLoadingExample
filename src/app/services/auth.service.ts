import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CxResponse } from '../models/CxResponse';
import { LoginUser } from '../models/login-user';
import { ApiService } from './api.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: LoginUser;

  constructor(private apiService: ApiService) {}
  authToken: string = '';

  login(username: string, password: string): Observable<any> {
    return this.apiService.login(username, password).pipe(
      map((x) => {
        this.setToken(x.access_token);
        return true;
      })
    );
  }

  initService(): void {
    let token = localStorage.getItem('token');
    this.setToken(token ?? '');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  getLoggedUser(): Observable<void> {
    return this.apiService.getLoggedUser().pipe(
      map((x) => {
        this.currentUser = x;
      })
    );
  }

  logout(): void {}
}
