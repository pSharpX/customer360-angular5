import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../../resources/animations/fadeInAnimation';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { OnDestroy } from '@angular/core';
import { CanDeactivate } from '@angular/router/src/interfaces';
import { CanComponentDeactivate } from '../../../../util/guards/unsavedchanges/componentdeactivate.model';
import { MessageBoxType } from '../../../../resources/ui/message-box/message-box.enum';
import { ModalService } from '../../../../resources/ui/modal/modal.service';
import { UserStorageService } from '../../../../service/user.service';

@Component({
  selector: 'app-session-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.css'],
  animations: [
    fadeInAnimation,
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@routeAnimation]': '' }
})
export class SessionExpiredComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  showLoaderToClose: boolean;
  counter: number;
  timer: Observable<number>;
  timerSubs: Subscription;
  pageInfo: {
    author?: string,
    title: string,
    message?: {
      primary: string,
      secondary?: string
    },
    iconClass?: string,
    contact?: {
      name?: string,
      phone?: string,
      iconClass?: string
    }
  };
  currentView = false;
  constructor(private modalService: ModalService, private userStorageService: UserStorageService) {
    this.showLoaderToClose = false;
    this.pageInfo = {
      author: 'Gildemeister',
      title: 'Su sessión ha expirado!',
      message: {
        primary: 'Su sessión caducó. Para poder ingresar nuevamente inicie session desde SGA con sus credenciales respectivas.',
        secondary: 'Por favor, contáctese con su encargado de TI si existe algún incoveniente al respecto.'
      },
      contact: {
        name: 'Christian Rivera',
        phone: '972615761',
        iconClass: 'fa-phone'
      }
    };
    this.timer = Observable.interval(1000).take(5);
    this.timerSubs = this.timer.subscribe((_number) => {
      this.counter = (5 - _number);
    }, (_error => {
      console.log(_error);
      // return Observable.throw(_error);
    }), () => {
      this.showLoaderToClose = true;
      Observable.interval(1000)
        .take(1)
        .subscribe(() => {}, (_error) => {}, () => {
          this.close();
        });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.timerSubs) {
      this.timerSubs.unsubscribe();
    }
  }

  canDeactivate (): boolean | Observable<boolean> | Promise<boolean> {
    const _settings = {
      title: 'Información',
      message:
        'Su session ha expirado, y no puede seguir navegando a travez de Cliente360. Vuelva a iniciar sessión.',
      buttons: [
        {
          text: 'Aceptar',
          id: 'btn_aceptar',
          className: 'btn btn-info',
          iconClassName: 'fa-thumbs-up',
          click: $activeModal => {
            $activeModal.close(false);
          }
        }
      ],
      type: MessageBoxType.WARNING
    };
    return this.modalService.Open(_settings);
  }

  private close() {
    this.userStorageService.clearUserData();
    window.close();
  }
}
