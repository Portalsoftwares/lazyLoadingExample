import { Component, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/models/common.component';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styles: [],
})
export class ParentComponent extends CommonComponent implements OnInit {
  constructor(private userService: UserServiceService) {
    super();
  }

  ngOnInit(): void {}

  getChildRoute(component: CommonComponent) {
    this.userService.activatedRoute = component;
  }
}
