import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as AuthMainComponent } from './main/main.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import { AuthService } from './auth.service';
import {MainService} from './main.service';
import { LogoutComponent } from './logout/logout.component';
import { ExpiredSessionGuard } from '../core/util/guards/expiredsession/expiredsession.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: AuthenticationComponent,
  },
  {
    path: RoutesMap.AUTH_LOGIN,
    component: AuthenticationComponent,
  },
  {
    path: RoutesMap.AUTH_LOGOUT,
    component: LogoutComponent,
    canDeactivate: [ExpiredSessionGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AuthenticationComponent
  ],
  providers: [
    AuthService,
    MainService
  ],
  declarations: [AuthMainComponent, AuthenticationComponent, LogoutComponent]
})
export class AuthModule { }
