import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lazy-component',
  templateUrl: './lazy-component.component.html',
  styleUrls: ['./lazy-component.component.css'],
})
export class LazyComponentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectBack() {
    this.router.navigateByUrl('/loggedin');
  }
}
