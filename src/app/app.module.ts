import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeColorDirective } from './directives/change-color.directive';
import { HeaderComponent } from './header/header.component';
import { AccessDeniedComponent } from './layouts/access-denied/access-denied.component';
import { FormComponent } from './layouts/form/form.component';
import { ParentComponent } from './layouts/parent/parent.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RandomPageComponent } from './random-page/random-page.component';
import { InterceptorService } from './services/interceptor';
import { SharedModule } from './shared/shared.module';
import { UserLoggedComponent } from './user-logged/user-logged.component';
import { TranslateComponentComponent } from './translate-component/translate-component.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ComfirmationPopupComponent } from './popups/confirmation-popup/confirmation-popup.component';
import { PermissionsComponent } from './layouts/permissions/permissions.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    ChangeColorDirective,
    FormComponent,
    HeaderComponent,
    AccessDeniedComponent,
    LoginPageComponent,
    UserLoggedComponent,
    RandomPageComponent,
    ParentComponent,
    TranslateComponentComponent,
    ComfirmationPopupComponent,
    PermissionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
