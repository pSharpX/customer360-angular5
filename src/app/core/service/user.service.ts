import { Injectable } from '@angular/core';
import { UserRol, UserProfile } from '../../auth/auth.model';
import { HttpConst } from '../resources/http/http.const';
import { TokenKey } from './tokenKey';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserStorageService {

  constructor() {
  }

  public saveToken(_token: TokenKey) {
    if (_token && _token.accessToken) {
      localStorage.removeItem(HttpConst.LOCAL_STORAGE_KEY_TOKEN);
      localStorage.setItem(HttpConst.LOCAL_STORAGE_KEY_TOKEN, this.convertToBase64(_token));
    }
  }

  public getToken(): TokenKey {
    if (localStorage.getItem(HttpConst.LOCAL_STORAGE_KEY_TOKEN)) {
      const token = atob(atob(localStorage.getItem(HttpConst.LOCAL_STORAGE_KEY_TOKEN)));
      return <TokenKey>JSON.parse(token);
    }
    return null;
  }

  private convertToBase64(_object: any): string {
    if (_object) {
      return btoa(btoa(JSON.stringify(_object)));
    }
    return null;
  }

  public getUserProfile(): UserProfile {
    if (localStorage.getItem(HttpConst.DATOS_USUARIO)) {
      const _userProfile = atob(atob(localStorage.getItem(HttpConst.DATOS_USUARIO)));
      return <UserProfile>JSON.parse(_userProfile);
    }
    return null;
  }

  public saveUserProfile(_usrProfile: UserProfile) {
    if (_usrProfile && _usrProfile.infoPersonal) {
      localStorage.removeItem(HttpConst.DATOS_USUARIO);
      localStorage.setItem(HttpConst.DATOS_USUARIO, this.convertToBase64(_usrProfile));
    }
  }

  public getUserRol(): UserRol {
    if (localStorage.getItem(HttpConst.USUARIO_ROL)) {
      const _userRol = atob(atob(localStorage.getItem(HttpConst.USUARIO_ROL)));
      return <UserRol>JSON.parse(_userRol);
    }
    return null;
  }

  public saveUserRol(_usrRol: UserRol) {
    if (_usrRol && _usrRol.user) {
      localStorage.removeItem(HttpConst.USUARIO_ROL);
      localStorage.setItem(HttpConst.USUARIO_ROL, this.convertToBase64(_usrRol));
    }
  }

  public clearUserData() {
    if (localStorage.length > 0) {
      localStorage.clear();
    }
  }

  public createUserRol(_roles: Array<any>): UserRol {
    let _usrRoles: UserRol = null;
    if (_roles && _roles != null && _roles.length > 0) {
      _usrRoles = {};
      _usrRoles.user = {
        usuarioId: _roles[0].usuarioId,
        usuario: _roles[0].usuario,
        nombre: _roles[0].nombre,
        perfil: _roles[0].perfil
      };
      _usrRoles.pages = _roles.map((_value, _key) => {
        return {
          menu: _value.menu,
          pagina: _value.pagina
        };
      });
    }
    return _usrRoles;
  }

  public hasAuthorization(user: any, component: any): boolean | Observable<boolean> | Promise<boolean> {
    let hasAuthorization = false;
    const pages = this.getUserRol().pages;
    if (pages && pages.length > 0) {
      this.getUserRol().pages.forEach((rol) => {
        if (rol.pagina === component) {
          hasAuthorization = true;
          return;
        }
      });
    }
    return hasAuthorization;
  }
}
