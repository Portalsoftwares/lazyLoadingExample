import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonComponent } from 'src/app/models/common.component';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends CommonComponent implements OnInit {
  access: boolean = false;
  firstName: string = 'First Name';
  lastName: string = 'Last Name';
  parentName: string = '';

  constructor(private authService: ApiService) {
    super();
  }

  ngOnInit(): void {
    this.authService.isCheckboxChecked = false;
  }

  recieveName($event: string) {
    this.parentName = $event;
  }

  allowAccess() {
    this.access = !this.access;
    this.authService.isCheckboxChecked = this.access;
  }

  public override canDeactivateComponent(): Observable<boolean> {
    if (!this.parentName) {
      return of(false);
    }
    return of(true);
  }
}
