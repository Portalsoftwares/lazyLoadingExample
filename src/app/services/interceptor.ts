import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('https://bcd-api.procampaign.com')) {
      return next.handle(req);
    }

    const userToken = this.authService.authToken;
    if (!userToken) {
      return next.handle(req);
    }
    return next
      .handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        })
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            this.authService.logout();
          }
          console.log(error);
          return throwError(() => {
            return new Error(error);
          });
        })
      );
  }
}
