import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate-component',
  templateUrl: './translate-component.component.html',
  styleUrls: ['./translate-component.component.css'],
})
export class TranslateComponentComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'serbian']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  translateToSerbian(): void {
    this.translate.use('srb');
  }

  translateToEnglish(): void {
    this.translate.use('en');
  }
  ngOnInit(): void {}
}
