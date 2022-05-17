import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../models/common.component';
import { LoginUser } from '../models/login-user';
import { CanDeactivateService } from '../services/popup-services/confirmation-popup.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends CommonComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private canDeactivateService: CanDeactivateService
  ) {
    super();
  }
  user: LoginUser = new LoginUser();

  ngOnInit(): void {}
  logout() {
    // this.canDeactivateService.openPopup().subscribe();
    this.userService.logOut();
  }
}
