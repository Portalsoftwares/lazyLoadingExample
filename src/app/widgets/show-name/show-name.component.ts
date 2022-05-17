import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.css'],
})
export class ShowNameComponent implements OnInit {
  @Input() userName: string = '';
  @Output() parentName = new EventEmitter<string>();
  name: string = '';
  sale: string = '';
  color: string = 'black';
  constructor() {}

  ngOnInit(): void {}

  showName() {
    this.sale = this.name;
    this.parentName.emit(this.name);
  }
}
