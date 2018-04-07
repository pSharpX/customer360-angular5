import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { UserStorageService } from '../../../service/user.service';
import { IUserAuth } from './IUserAuth';

@Injectable()
export class UserLoggedIn implements IUserAuth {
  constructor(private authService: AuthService, private userStorage: UserStorageService) {
  }

  CheckIsUserLoggedIn(user: any): boolean | Observable<boolean> | Promise<boolean> {
    return <Observable<boolean>>this.authService.CheckIsLoggedIn(user);
  }

  HasAuthorization (user: any, component: any): boolean | Observable<boolean> | Promise<boolean> {
    return this.userStorage.hasAuthorization(user, component);
  }
}
