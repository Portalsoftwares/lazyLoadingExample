import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserServiceService } from 'src/app/services/user-service.service';
import { CommonComponent } from 'src/app/models/common.component';
import { CanDeactivateService } from 'src/app/services/popup-services/confirmation-popup.service';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent extends CommonComponent implements OnInit {
  editUserModel: User = new User();
  initialUserModel: User = new User();
  editMode: boolean = false;
  users!: Array<User>;
  initialUsers: Array<User> = new Array<User>();
  selectedUser: number = -1;
  constructor(
    private userService: UserServiceService,
    private canDeactivateService: CanDeactivateService
  ) {
    super();
    this.users = this.userService.users;
  }

  ngOnInit(): void {
    this.userService.loggedOut.subscribe(() => {
      console.log('desilo se');
    });
    this.initialUserModel = this.deepCopy(this.editUserModel);
  }
  updateUser() {
    this.users[this.selectedUser] = this.editUserModel;
    this.editUserModel = new User();
    this.editMode = false;
  }

  addUser() {
    this.users.push(this.editUserModel);
    this.editUserModel = new User();
  }

  editUser(i: number) {
    this.selectedUser = i;
    this.editMode = true;
    this.editUserModel = this.deepCopy(this.users[i]);
  }

  cancelEdit() {
    this.selectedUser = -1;
    this.editMode = false;
    this.editUserModel = new User();
  }

  clearUsers() {
    this.users = new Array<User>();
    this.userService.users = new Array<User>();
  }

  private deepCopy(object: any): any {
    return JSON.parse(JSON.stringify(object));
  }

  public override canDeactivateComponent(): Observable<boolean> {
    if (!this.editMode) {
      return of(true);
    }

    return this.canDeactivateService.openPopup().pipe(
      map(() => {
        return true;
      })
    );
  }

  public override canLogout(): boolean {
    if (
      JSON.stringify(this.editUserModel) ==
      JSON.stringify(this.initialUserModel)
    ) {
      return true;
    } else {
      this.canDeactivateService.openPopup();
      return false;
    }
  }

  private modelChanged() {
    let selectedUser = JSON.stringify(
      this.userService.users[this.selectedUser]
    );
    let editUser = JSON.stringify(this.editUserModel);
    return selectedUser != editUser;
  }
}
