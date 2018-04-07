import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { UserStorageService } from '../../../service/user.service';
import { IUserAuthService } from './IUserAuth.service';
import * as moment from 'moment';
import { HttpConst } from '../../../resources/http/http.const';

@Injectable()
export class UserAuthLocalService implements IUserAuthService {
  constructor(private userStorage: UserStorageService) {
  }

  CheckIsUserLoggedIn(user: any): boolean | Observable<boolean> | Promise<boolean> {
    let isLoggedIn = false;
    const token = this.userStorage.getToken();
    if (token !== null) {
      const currentDate = moment();
      let expiredDate = token.expiresOn || null;
      if (expiredDate !== null) {
        expiredDate = moment(expiredDate);
        const isSameOrBefore = currentDate.isSameOrBefore(expiredDate);
        const difference = currentDate.diff( expiredDate, HttpConst.TIMEOUT_UNIT_OF_TIME, true);
        if (isSameOrBefore || (difference <= HttpConst.TIMEOUT)) {
          isLoggedIn = true;
        }
      }
    }
    return isLoggedIn;
  }

  HasAuthorization (user: any, component: any): boolean | Observable<boolean> | Promise<boolean> {
    return this.userStorage.hasAuthorization(user, component);
  }
}
