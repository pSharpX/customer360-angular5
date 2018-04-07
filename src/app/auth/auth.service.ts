import { Injectable } from '@angular/core';
import { BaseService } from '../core/service/base.service';
import { HttpGenericService } from '../core/resources/http/http.generic.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService extends BaseService {
  private $controllerName = 'Seguridad';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public CheckIsLoggedIn(user: any): Observable<boolean> {
    const $resource = `${this.$controllerName}/ListarRoles/${user}`;
    return this.httpGeneric
      .Get($resource)
      .map((loggedIn) => {
        return true;
      }).catch(_error => {
        console.log(_error);
        const isLogged = false;
        return Observable.throw(isLogged);
      }).mergeMap((isLogged) => Observable.of(isLogged || false));
  }

  public HasAuthorization(user: any, component): Observable<boolean> {
    const $resource = `${this.$controllerName}/ListarRoles/${user}`;
    return this.httpGeneric
      .Get($resource)
      .map((loggedIn) => {
        return true;
      }).catch(_error => {
        return Observable.throw(_error);
      }).mergeMap(() => Observable.of(true));
  }

}
