import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { CanLoad, CanActivateChild } from '@angular/router';
import { UserLoggedIn } from './UserLoggedIn';
import { Router } from '@angular/router';
import { ResponseModel } from '../../../resources/http/response.model';
import { UserStorageService } from '../../../service/user.service';
import { LocationStrategy } from '@angular/common';
import { RegexService } from '../../regex/regex.service';
import { IUserAuthService } from './IUserAuth.service';

export interface Auth {
  accessToken?: string;
  refreshToken?: string;
  expiresOn?: Date;
}

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    private userLoggedInService: UserLoggedIn,
    private userAuthService: IUserAuthService,
    private userStorage: UserStorageService,
    private locationStrategy: LocationStrategy,
    private regexService: RegexService,
    private router: Router
  ) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // return this.CheckIsUserLoggedIn(this.userStorage.getUserProfile().infoPersonal);
    const component = this.CatchUrlWithOutParams(state);
    const userProfile = this.userStorage.getUserProfile();
    if (userProfile === null || userProfile.infoPersonal === null) {
      this.CatchNotLoggedInUser();
      return false;
    }

    const isLoggedIn = this.CheckIsUserLoggedIn(userProfile.infoPersonal);
    const isAuthorized = this.CheckIfHasAutorization(userProfile.infoPersonal, component);
    if ((isLoggedIn instanceof Observable) && (isAuthorized instanceof Observable)) {
      return (<Observable<boolean>>isLoggedIn).mergeMap(
        (loggedIn: boolean) => {
          if (!loggedIn) {
            this.CatchNotLoggedInUser();
            return Observable.of(false);
          }
          return (<Observable<boolean>>isAuthorized).map(
            (authorized: boolean) => {
              if (!authorized) {
                this.CatchUnAuthorizedUser();
              }
              return authorized;
            }
          );
        }
      );
    } else {
      if (!isLoggedIn) {
        this.CatchNotLoggedInUser();
        return isLoggedIn;
      }

      if (!isAuthorized) {
        this.CatchUnAuthorizedUser();
      }
      return (isLoggedIn && isAuthorized);
    }
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    const userProfile = this.userStorage.getUserProfile();
    if (userProfile === null || userProfile.infoPersonal === null) {
      this.CatchNotLoggedInUser();
      return false;
    }
    const isLoggedIn = this.CheckIsUserLoggedIn(userProfile.infoPersonal);
    if (!(isLoggedIn instanceof Observable)) {
      if (!isLoggedIn) {
        this.CatchNotLoggedInUser();
      }
      return isLoggedIn;
    }
    return (<Observable<boolean>>isLoggedIn).map(
      (loggedIn: boolean) => {
        if (!loggedIn) {
          this.CatchNotLoggedInUser();
        }
        return loggedIn;
      }
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const component = this.CatchUrlWithOutParams(state);
    const userProfile = this.userStorage.getUserProfile();
    if (userProfile === null || userProfile.infoPersonal === null) {
      this.CatchNotLoggedInUser();
      return false;
    }

    const isLoggedIn = this.CheckIsUserLoggedIn(userProfile.infoPersonal);
    const isAuthorized = this.CheckIfHasAutorization(userProfile.infoPersonal, component);
    if ((isLoggedIn instanceof Observable) && (isAuthorized instanceof Observable)) {
      return (<Observable<boolean>>isLoggedIn).mergeMap(
        (loggedIn: boolean) => {
          if (!loggedIn) {
            this.CatchNotLoggedInUser();
            return Observable.of(false);
          }
          return (<Observable<boolean>>isAuthorized).map(
            (authorized: boolean) => {
              if (!authorized) {
                this.CatchUnAuthorizedUser();
              }
              return authorized;
            }
          );
        }
      );
    } else {
      if (!isLoggedIn) {
        this.CatchNotLoggedInUser();
        return isLoggedIn;
      }

      if (!isAuthorized) {
        this.CatchUnAuthorizedUser();
      }
      return (isLoggedIn && isAuthorized);
    }
  }

  private CheckIsUserLoggedIn(user: any):  Observable<boolean> | Promise<boolean> | boolean {
    // return this.userLoggedInService.CheckIsUserLoggedIn(user);
    return this.userAuthService.CheckIsUserLoggedIn(user);
  }

  private CheckIfHasAutorization(user: any, component: any): Observable<boolean> | Promise<boolean> | boolean {
    // return this.userLoggedInService.HasAuthorization(user, component);
    return this.userAuthService.HasAuthorization(user, component);
  }

  private catchError(_error) {
    console.log(_error);
    return Observable.of(true);
  }

  private CatchUnAuthorizedUser() {
    this.router.navigate(['401']);
  }

  private CatchNotLoggedInUser() {
    this.router.navigate(['expired']);
  }

  private CatchUrlWithOutParams(state: RouterStateSnapshot): string {
    const routes = state.url.split('/').filter((value) => {
      if (value !== '' && !(this.regexService.IsDigit(value))) {
        return true;
      }
      return false;
    });
    if (routes && routes.length > 0) {
      return routes.join('/');
    }
    return '';
  }

  private handleError(error: any): ResponseModel {
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return <ResponseModel>{
      code: error.status || 500,
      error: errMsg,
      success: false,
      data: {},
      message: errMsg,
      paging: {}
    };
  }
}
