import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../../core/resources/ui/modal/modal.service';
import { UserStorageService } from '../../core/service/user.service';
import { CanComponentDeactivate } from '../../core/util/guards/unsavedchanges/componentdeactivate.model';
import { MessageBoxType } from '../../core/resources/ui/message-box/message-box.enum';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  currentView = false;
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
  constructor(private modalService: ModalService, private userStorageService: UserStorageService) {
    this.userStorageService.clearUserData();
    this.showLoaderToClose = false;
    this.pageInfo = {
      author: 'Gildemeister',
      title: 'Sessión finalizada!',
      iconClass: 'fa-sign-out',
      message: {
        primary: 'Acaba de cerrar sessión.',
        secondary: 'Por favor, contáctese con su encargado de TI si existe algún incoveniente al respecto.'
      },
      contact: {
        name: 'Christian Rivera',
        phone: '972615761',
        iconClass: 'fa-phone'
      }
    };
    this.timer = Observable.interval(1000).take(3);
    this.timerSubs = this.timer.subscribe((_number) => {
      this.counter = (3 - _number);
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
        'Su session ha finalizado, y no puede seguir navegando a travez de Cliente360. Vuelva a iniciar sessión.',
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
    window.close();
  }

}
