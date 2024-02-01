import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { catchError, Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  userName: string = '';
  password: string = '';
  user: LoginUser = new LoginUser();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn(): void {
    this.authService.login(this.userName, this.password).subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('loggedin');
        return;
      }
      window.alert('pogresna sifra ili username');
    });
  }

  
}
