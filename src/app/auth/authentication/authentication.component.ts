import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStorageService } from '../../core/service/user.service';
import { MainService } from '../main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TokenKey } from '../../core/service/tokenKey';
import { UserProfile, UserRol } from '../auth.model';
import { HttpConst } from '../../core/resources/http/http.const';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private routerParamsSubscription: Subscription;
  private mainServiceSubs: Subscription;
  public infoPersonal: string;
  public rolePersonal: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private userStorageService: UserStorageService
  ) {
    this.routerParamsSubscription = this.route.queryParams.subscribe(params => {
      if (params['key'] !== null && params['usr'] !== null) {
        const token = decodeURIComponent(params['key']);
        const accesToken = <TokenKey>JSON.parse(atob(token));
        const usrEncode = decodeURIComponent(params['usr']);
        const user = atob(usrEncode);
        /** Primero se ejecuta el methodo saveToken para que los request siguientes lo utilicen desde el localstorage */
        this.userStorageService.saveToken(accesToken);
        this.mainServiceSubs = this.mainService
          .ObtenerRoles(user)
          .map(_roles => {
            return this.userStorageService.createUserRol(_roles);
          })
          .subscribe(
            (_usrRoles: UserRol) => {
              if (_usrRoles) {
                const _usrProfile: UserProfile = {
                  infoPersonal: _usrRoles.user.nombre,
                  rolePersonal: _usrRoles.user.perfil
                };
                this.userStorageService.saveUserProfile(_usrProfile);
                this.userStorageService.saveUserRol(_usrRoles);
                if (localStorage.getItem(HttpConst.USUARIO_ROL)) {
                  this.infoPersonal = _usrProfile.infoPersonal;
                  this.rolePersonal = _usrProfile.rolePersonal;
                  const datoPersonal = {
                    infoPersonal: this.infoPersonal,
                    rolePersonal: this.rolePersonal
                  };
                } else {
                  console.log('error');
                }
              }
              router.navigate(['/']);
            },
            (error: any) => {
              console.log(error);
            }
          );
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.routerParamsSubscription) {
      this.routerParamsSubscription.unsubscribe();
    }
    if (this.mainServiceSubs) {
      this.mainServiceSubs.unsubscribe();
    }
  }
}
