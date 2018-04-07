import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { UserStorageService } from '../../../service/user.service';
import { IUserAuthService } from './IUserAuth.service';

@Injectable()
export class UserAuthRemoteService implements IUserAuthService {
  constructor(private authService: AuthService) {
  }

  CheckIsUserLoggedIn(user: any): boolean | Observable<boolean> | Promise<boolean> {
    return <Observable<boolean>>this.authService.CheckIsLoggedIn(user);
  }

  HasAuthorization (user: any, component: any): boolean | Observable<boolean> | Promise<boolean> {
    return <Observable<boolean>>this.authService.HasAuthorization(user, component);
  }
}
