import { Observable } from 'rxjs/Observable';

export interface IUserAuth {
  CheckIsUserLoggedIn: (user: any) => Observable<boolean> | Promise<boolean> | boolean;
  HasAuthorization: (user: any, component: any) => Observable<boolean> | Promise<boolean> | boolean;
}
