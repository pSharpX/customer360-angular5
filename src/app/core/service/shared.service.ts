import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ClienteService } from '../../cliente/cliente.service';
import { Cliente } from '../../cliente/main/main.component';

@Injectable()
export class SharedService {
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  private emitResquestSource = new Subject<any>();
  private clienteSource: BehaviorSubject<Cliente>;

  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  requestEmitted$ = this.emitResquestSource.asObservable();

  constructor() {
    this.clienteSource = new BehaviorSubject<any>({});
  }

  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  setRequestedObject(_observer: Observable<any>) {
    this.requestEmitted$ = _observer;
  }

  changeCliente(cliente: any) {
    this.clienteSource.next(cliente);
  }
}
