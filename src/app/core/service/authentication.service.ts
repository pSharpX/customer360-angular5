import { Injectable } from '@angular/core';
import {
  Http,
  XHRBackend,
  XHRConnection,
  RequestOptions,
  Request,
  ResponseContentType,
  RequestOptionsArgs,
  Response,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TokenKey } from './tokenKey';
import { HttpConst } from '../resources/http/http.const';
import { environment } from '../../../environments/environment';
import { UserProfile, UserRol } from '../../auth/auth.model';
import * as _ from 'lodash';

@Injectable()
export class AuthenticationService {

  urlRefresToken = `${environment.apiUrl}/Seguridad/RefrescarToken/`;
  urlGenerarToken = `${environment.apiUrl}/Seguridad/GenerarToken/`;
  urlAutenticarUsuario = `${environment.apiUrl}/Seguridad/AutenticacionUsuario/`;

  constructor(private http: Http) { }

  public autenticarUsuario(usuario: any) {
    return this.http.get(this.urlAutenticarUsuario + usuario);
  }

  public generarToken(usuario: any) {
    return this.http.get(this.urlGenerarToken + usuario);
  }

  public refreshToken(): Observable<boolean> {
    const tokenlocal: TokenKey = this.getToken();
    return this.http.get(this.urlRefresToken + tokenlocal.refreshToken)
      .map(response => {
        const _token = <TokenKey>response.json();
        this.saveToken(_token);
        return true;
      });
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
      const _userProfile = <UserProfile>JSON.parse(localStorage.getItem(HttpConst.DATOS_USUARIO));
      return _userProfile;
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

  public createUserRol(_roles: Array<any>): UserRol {
    let _usrRoles: UserRol = null;
    if (_roles && _.isArray(_roles) && _roles.length > 0) {
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
}
