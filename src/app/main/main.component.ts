import {Component, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import {AppComponent} from '../app.component';
import {HttpExtend} from '../core/resources/http/http.extend.service';
import {fadeInAnimation} from '../core/resources/animations/fadeInAnimation';
import {ClienteService} from '../cliente/cliente.service';
import {Observable} from 'rxjs/Observable';
import {HttpConst} from '../core/resources/http/http.const';
import {Subscription} from 'rxjs/Subscription';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';
import { UserStorageService } from '../core/service/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ClienteService],
  animations: [
    fadeInAnimation,
    trigger('overlayState', [
      state('shown, void', style({
        opacity: '1',
        display: 'block',
      })),
      state('hidden', style({
        opacity: '0',
        display: 'none',
      })),
      transition('shown => hidden', animate('300ms ease-in')),
      transition('hidden => shown', animate('300ms ease-out')),
    ])
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'[@routeAnimation]': ''}
})
export class MainComponent implements OnInit, OnDestroy {

  public isMenuCollapsed = false;
  public isNotificationPanelCollapsed = false;
  private infoPersonal: string;
  private rolePersonal: string;
  public departamentos: Observable<any[]>;

  constructor(private httpService: HttpExtend,
              private clienteService: ClienteService,
              private userStorageService: UserStorageService,
              private appComponent: AppComponent) {
    this.appComponent.showloader = true;
    this.appComponent.isWarningMessage = true;
  }

  ngOnInit() {
    this.appComponent.showloader = false;
    if (localStorage.getItem(HttpConst.DATOS_USUARIO)) {
      const _userProfile = this.userStorageService.getUserProfile();
      this.infoPersonal = _userProfile.infoPersonal;
      this.rolePersonal = _userProfile.rolePersonal;
    }
  }

  ngOnDestroy(): void {

  }

  onMenuCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  onNotificationPanelCollapse(event) {
    if (event) {
      event.preventDefault();
    }
    this.isNotificationPanelCollapsed = !this.isNotificationPanelCollapsed;
  }

  onCollapse() {
    if (this.isMenuCollapsed) {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
    if (this.isNotificationPanelCollapsed) {
      this.isNotificationPanelCollapsed = !this.isNotificationPanelCollapsed;
    }
  }
}
