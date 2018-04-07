import { Injectable } from '@angular/core';
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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import { TokenKey } from '../../service/tokenKey';
import { AuthenticationService } from '../../service/authentication.service';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { HttpConst } from './http.const';
import { UserStorageService } from '../../service/user.service';

@Injectable()
export class HttpBaseService extends Http {
  static hostName = environment.apiUrl;
  authenticationService: AuthenticationService;

  constructor(
    backend: XHRBackend,
    options: RequestOptions,
    authenticationService: AuthenticationService,
    private userStorage: UserStorageService
  ) {
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

  request(
    url: string | Request,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    let token = this.userStorage.getToken();
    const expiresOnDate = moment(token.expiresOn);
    const current = moment();
    const isSameOrBefore = current.isSameOrBefore(expiresOnDate);
    const difference = current.diff( expiresOnDate, HttpConst.TIMEOUT_UNIT_OF_TIME, true);
    if (!isSameOrBefore && (difference <= HttpConst.TIMEOUT)) {
      const reqRefreshToken: Observable<Response> = this.authenticationService
      .refreshToken()
      .mergeMap((response: boolean) => {
        if (response) {
          token = this.userStorage.getToken();
          if (typeof url === 'string') {
            if (!options) {
              options = { headers: new Headers() };
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
      return reqRefreshToken;
    }

    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', `Bearer ${token.accessToken}`);
    } else {
      url.headers.set('Authorization', `Bearer ${token.accessToken}`);
    }

    return super.request(url, options).catch(error => {
      if (error.status === 401) {
        return this.authenticationService
          .refreshToken()
          .mergeMap((result: boolean) => {
            token = this.userStorage.getToken();
            if (typeof url === 'string') {
              if (!options) {
                options = { headers: new Headers() };
              }
              options.headers.set('Authorization', `Bearer ${token.accessToken}`);
            } else {
              url.headers.set('Authorization', `Bearer ${token.accessToken}`);
            }
            if (result) {
              return this.request(url, options);
            } else {
              return Observable.throw('refresh token');
            }
          });
      } else {
        return Observable.throw(error);
      }
    });
  }

  private addAuthenticationHeader(
    url: string | Request,
    token: TokenKey,
    options?: RequestOptionsArgs
  ) {
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', `Bearer ${token.accessToken}`);
    } else {
      url.headers.set('Authorization', `Bearer ${token.accessToken}`);
    }
  }
}
