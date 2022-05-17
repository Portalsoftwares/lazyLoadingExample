import { CanActivateGuard } from './guards/can-activate.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { FormComponent } from './layouts/form/form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormGuardGuard } from './guards/form-guard.guard';
import { AccessDeniedComponent } from './layouts/access-denied/access-denied.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { UserLoggedComponent } from './user-logged/user-logged.component';
import { RandomPageComponent } from './random-page/random-page.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { ParentComponent } from './layouts/parent/parent.component';
import { LoginPageGuard } from './guards/login-page.guard';
import { LazyComponentComponent } from './lazy-module/lazy-component/lazy-component.component';
import { TranslateComponentComponent } from './translate-component/translate-component.component';
import { PermissionsComponent } from './layouts/permissions/permissions.component';

const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: () =>
      import('./lazy-module/lazy-module.module').then(
        (m) => m.LazyModuleModule
      ),
    component: LazyComponentComponent,
  },

  {
    path: 'translate',
    component: TranslateComponentComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginPageGuard],
  },
  {
    path: '',
    component: ParentComponent,
    canActivate: [LoggedInGuard],
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: 'random',
        component: RandomPageComponent,
      },
      {
        path: 'loggedin',
        component: UserLoggedComponent,
        canActivate: [CanActivateGuard],
        data: {
          naziv: 'Pera',
        },
      },
      {
        path: 'aca',
        component: DashboardComponent,
        canActivate: [CanActivateGuard],
        data: {
          naziv: 'Sale',
        },
      },
      {
        path: 'form',
        component: FormComponent,
        canActivate: [CanActivateGuard],
        data: {
          naziv: 'Stanke',
        },
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
      },
    ],
  },

  { path: 'denied', component: AccessDeniedComponent },
  {
    path: 'lazy',
    loadChildren: () =>
      import('./lazy-module/lazy-module.module').then(
        (m) => m.LazyModuleModule
      ),
  },
  { path: '**', redirectTo: 'aca' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
