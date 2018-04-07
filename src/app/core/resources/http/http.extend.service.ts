import {Injectable} from '@angular/core';
import {
  Http,
  XHRBackend,
  XHRConnection,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Headers,
  ResponseContentType
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import {TokenKey} from '../../service/tokenKey';
import {AuthenticationService} from '../../service/authentication.service';
import * as moment from 'moment';
import {HttpConst} from './http.const';
import {ResponseModel} from './response.model';
import {Router} from '@angular/router';
import { UserStorageService } from '../../service/user.service';

@Injectable()
export class HttpExtend extends Http {
  authenticationService: AuthenticationService;

  constructor(backend: XHRBackend,
              options: RequestOptions,
              authenticationService: AuthenticationService,
              private userStorage: UserStorageService,
              private router: Router) {
    super(backend, options);
    this.authenticationService = authenticationService;
  }

  public getFile(url: string): Observable<Blob> {
    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });

    return this.get(url, options).map(
      (response: Response) => <Blob>response.blob()
    );
  }

  request(url: string | Request,
          options?: RequestOptionsArgs): Observable<Response> {
    let token = this.userStorage.getToken();
    if (token != null) {
      const expiresOnDate = moment(token.expiresOn);
      const current = moment();
      const isSameOrBefore = current.isSameOrBefore(expiresOnDate);
      const difference = current.diff(expiresOnDate, HttpConst.TIMEOUT_UNIT_OF_TIME, true);
      if (!isSameOrBefore && (difference <= HttpConst.TIMEOUT)) {
        const reqRefreshToken: Observable<Response> = this.authenticationService
          .refreshToken()
          .mergeMap((response: boolean) => {
            if (response) {
              token = this.userStorage.getToken();
              if (typeof url === 'string') {
                if (!options) {
                  options = {headers: new Headers()};
                }
                options.headers.set('Authorization', `Bearer ${token.accessToken}`);
              } else {
                url.headers.set('Authorization', `Bearer ${token.accessToken}`);
              }
              return super.request(url, options);
            } else {
              return Observable.throw('refresh token');
            }
          });
        return reqRefreshToken.catch((_error) => {
          const handledError = this.handleError(_error);
          if (handledError && handledError.code === 401) {
            this.catchSessionExpired();
          } else if (handledError && handledError.code === 500) {
            // this.catchServerError();
          }
          return Observable.throw(_error);
        });
      }

      if (typeof url === 'string') {
        if (!options) {
          options = {headers: new Headers()};
        }
        options.headers.set('Authorization', `Bearer ${token.accessToken}`);
      } else {
        url.headers.set('Authorization', `Bearer ${token.accessToken}`);
      }
    }

    return super.request(url, options).catch((_error) => {
      const handledError = this.handleError(_error);
      if (handledError && handledError.code === 401) {
        this.catchSessionExpired();
      } else if (handledError && handledError.code === 500) {
        // this.catchServerError();
      }
      return Observable.throw(_error);
    });
  }

  private addAuthenticationHeader(url: string | Request,
                                  token: TokenKey,
                                  options?: RequestOptionsArgs) {
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token.accessToken}`);
    } else {
      url.headers.set('Authorization', `Bearer ${token.accessToken}`);
    }
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
