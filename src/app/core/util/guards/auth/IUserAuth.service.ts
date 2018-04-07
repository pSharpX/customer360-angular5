import { Observable } from 'rxjs/Observable';
import { IUserAuth } from './IUserAuth';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class IUserAuthService implements IUserAuth {
  abstract CheckIsUserLoggedIn: (user: any) => Observable<boolean> | Promise<boolean> | boolean;
  abstract HasAuthorization: (user: any, component: any) => Observable<boolean> | Promise<boolean> | boolean;
}
