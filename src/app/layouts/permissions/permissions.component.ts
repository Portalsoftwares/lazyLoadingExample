import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  selectedUser!: number;
  users: Array<UserPermissions> = new Array<UserPermissions>();
  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.users.push(new UserPermissions(1,'Pera'))
    this.users.push(new UserPermissions(2,'Sale'))
    this.users.push(new UserPermissions(3,'Stanke'))
  }

  setUser(event: any): void {
    this.selectedUser = event.target.value;
    this.userService.currentUser = this.users[this.selectedUser-1].name;
  }
}

export class UserPermissions {
  id!: number;
  name!: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
