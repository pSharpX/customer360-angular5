import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from '../../service/authentication.service';
import { TokenKey } from '../../service/tokenKey';
import * as moment from 'moment';
import { HttpConst } from './http.const';
import { ResponseModel } from './response.model';
import { UserStorageService } from '../../service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private userStorage: UserStorageService,
    private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.userStorage.getToken();
    const expiresOnDate = moment(token.expiresOn);
    const current = moment();
    const isSameOrBefore = current.isSameOrBefore(expiresOnDate);
    const difference = current.diff(expiresOnDate, HttpConst.TIMEOUT_UNIT_OF_TIME, true);
    if (!isSameOrBefore && (difference <= HttpConst.TIMEOUT)) {
      const refreshTokenReq: Observable<HttpEvent<any>> = this.authService
      .refreshToken()
      .mergeMap((response: boolean) => {
        if (response) {
          token = this.userStorage.getToken();
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.userStorage.getToken().accessToken}`
            }
          });

          return next.handle(authTokenReq)
          .do(this._next, this._error);
          // .catch((response: any) => {
          //   if (response instanceof HttpErrorResponse) {
          //     if (response.status === 500) {
          //       return <ResponseModel>{
          //         Code: 500,
          //         Success: false,
          //         Error: 500,
          //         Message: response.error,
          //         Data: {},
          //         Paging: {},
          //       };
          //     } else if (response.status === 401) {
          //       return <ResponseModel>{
          //         Code: 401,
          //         Success: false,
          //         Error: 401,
          //         Message: response.error,
          //         Data: {},
          //         Paging: {},
          //       };
          //     }
          //     console.log('Processing http error', response);
          //   }
          //   return Observable.throw(response);
          // });
        } else {
          return Observable.throw('refresh token');
        }
      });
      return refreshTokenReq;
    }

    const authTokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userStorage.getToken().accessToken}`
      }
    });
    return next.handle(authTokenReq)
    // .map((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //     return <ResponseModel>event.body;
    //   }
    // })
    .do(this._next, this._error);
    // .catch((err) => {
    //   if (err instanceof HttpErrorResponse) {
    //     if (err.status === 500) {
    //       return <ResponseModel>{
    //         Code: 500,
    //         Success: false,
    //         Error: 500,
    //         Message: err.error,
    //         Data: {},
    //         Paging: {},
    //       };
    //     } else if (err.status === 401) {
    //       return <ResponseModel>{
    //         Code: 401,
    //         Success: false,
    //         Error: 401,
    //         Message: err.error,
    //         Data: {},
    //         Paging: {},
    //       };
    //     }
    //     console.log('Processing http error', err);
    //   }
    //   return Observable.throw(err);
    // });
  }

  private do(next: (event: HttpEvent<any>) => void, err: (error: any) => void) {

  }

  private _next(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      // do stuff with response if you want
    }
  }

  private _error(err: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // redirect to the login route
        // or show a modal
        return err;
      }
    }
  }

  private _redefineResponse(): Observable<Response> {
    return Observable.throw('error');
  }

  private catchSessionExpired() {
    this.router.navigate(['expired']);
  }

  private catchServerError() {
    this.router.navigate(['500']);
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
