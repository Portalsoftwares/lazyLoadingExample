import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  share,
  Subject,
  Subscription,
  takeUntil,
  timer,
} from 'rxjs';
import { ShowNameComponent } from '../widgets/show-name/show-name.component';

@Component({
  selector: 'app-random-page',
  templateUrl: './random-page.component.html',
  styleUrls: ['./random-page.component.css'],
})
export class RandomPageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor() {}

  temporaryName: string = '';
  parentName: string = '';
  firstName: string = 'First Name';
  currentTime = new Date();
  subscription!: Subscription;

  localNgUnsubscribe: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.localNgUnsubscribe.next();
    this.localNgUnsubscribe.complete();
  }

  sale() {
    let a = this.vratiMiKadSeEmituje();
    a.subscribe((x) => {
      console.log(x);
    });
  }

  vratiMiKadSeEmituje(): Observable<string> {
    let response = new Subject<string>();
    timer(0, 1000).subscribe(() => {
      {
        response.next('stanke');
      }
    });
    return response.asObservable();
  }

  @ViewChild('inputElement') inputElement!: ElementRef;

  ngOnInit(): void {
    this.startClock();
  }

  ngAfterViewInit(): void {
    this.onStopTyping().subscribe(() => this.onClick());
  }

  @ViewChild(ShowNameComponent) showNameComponent!: ShowNameComponent;

  recieveName($event: string) {
    this.parentName = $event;
  }

  onClick(): void {
    this.showNameComponent.name = this.temporaryName;
    this.showNameComponent.showName();
  }

  onStopTyping(): Observable<string> {
    return fromEvent(this.inputElement.nativeElement, 'input')
      .pipe(map((event: any) => (event['target'] as HTMLInputElement).value))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged());
  }

  stopClock() {
    this.subscription.unsubscribe();
  }
  startClock() {
    timer(0, 1000)
      .pipe(takeUntil(this.localNgUnsubscribe))
      .pipe(map(() => new Date()))
      .subscribe((time) => {
        this.currentTime = time;
        console.log('test');
      });
  }
}
