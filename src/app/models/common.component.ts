import { Observable, of } from 'rxjs';

export class CommonComponent {
  public activatedRoute: CommonComponent = null as any;
  constructor() {}

  public setActivatedRoute(common: CommonComponent) {
    this.activatedRoute = common;
  }

  public canLogout(): boolean {
    if (this.activatedRoute) {
      return this.activatedRoute.canLogout();
    }
    return true;
  }
  public canDeactivateComponent(): Observable<boolean> {
    return of(true);
  }

  public canActivateComponent(permission: string): boolean {
    return true;
  }
}
