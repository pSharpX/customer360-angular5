import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { slideInDownAnimation } from '../../core/resources/animations/slideInDownAnimation';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { slideInOutAnimation } from '../../core/resources/animations/slideInOutAnimation';

import { RoutesMap } from '../../core/routes.const';
import { ClienteService } from '../cliente.service';
import { StateComponent } from '../../shared/cliente/state/state.component';
import { SharedService } from '../../core/service/shared.service';
import { NavigationStart } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/concat';

export interface Cliente {
  idCliente: any;
  nombre?: string;
  nombreCompleto?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  razonSocial?: string;
  tipoPersona?: string;
  tipoPersonaNombre?: string;
  fechaNacimiento?: Date;
  correo?: string;
  numeroDocumento?: string;
  ruc?: string;
  genero?: string;
  asesor?: string;
  telefono?: string;
  celular?: string;
  estadoCivil?: string;
  direccion?: string;
  distrito?: string;
  codigoDistrito?: any;
  provincia?: string;
  codigoProvincia?: any;
  departamento?: string;
  codigoDepartamento?: any;
  codigoPostal?: string;
  pais?: string;
  idPais?: any;
  contactoDocumento?: string;
  nombreContacto?: string;
  apellidoPaternoContacto?: string;
  apellidoMaternoContacto?: string;
  sexoContacto?: string;
  sexoContactoNombre?: string;
  telefonoContacto?: string;
  celularContacto?: string;
  correoContacto?: string;
}

@Component({
  selector: 'app-cliente-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeInAnimation]
})
export class MainComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  public idCliente: Observable<any>;
  public _cliente: Observable<Cliente>;
  public clienteSource: Observable<Cliente>;
  public cliente: Cliente;
  @ViewChild('clienteRouteLink') aLink: ElementRef;
  @ViewChild(StateComponent) stateClienteViewChild: StateComponent;
  private route_path: string;
  private clientes_routes = [];
  private routerSubscription: Subscription;
  private routerParamsSubscription: Subscription;
  private sharedServiceSubscription: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private renderer: Renderer,
    private route: ActivatedRoute,
    private clienteServicio: ClienteService,
    private sharedService: SharedService
  ) {
    this._cliente = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.cliente = {
          idCliente: params.get('id')
        };
        this.clientes_routes = [
          `/${RoutesMap.CLIENTE}/${this.cliente.idCliente}/${RoutesMap.DETAIL}`,
          `/${RoutesMap.CLIENTE}/${this.cliente.idCliente}/${RoutesMap.EDIT}`,
        ];
        return this.clienteServicio.Obtener(params.get('id')).publishLast().refCount();
      });

    Observable.concat(this._cliente).subscribe((_cliente: Cliente) => {
      this.cliente = _cliente;
      this.clienteSource = Observable
        .from([this.cliente])
        .publishLast()
        .refCount();
      this.sharedService.setRequestedObject(this.clienteSource);
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.clientes_routes.includes(location.path())) {
          this.route_path = location.path();
          this.addClassToClienteRouteLink();
        }
      }
    });
    this.sharedServiceSubscription = this.sharedService.changeEmitted$.subscribe((_cliente: Cliente) => {
      if (_cliente && _cliente.idCliente) {
        this.stateClienteViewChild.cliente = _cliente;
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.routerParamsSubscription) {
      this.routerParamsSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.sharedServiceSubscription) {
      this.sharedServiceSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {
    // console.log(this.stateClienteViewChild);
  }

  addClassToClienteRouteLink(_className?: string) {
    if (this.aLink) {
      if (this.clientes_routes.includes(this.route_path)) {
        this.aLink.nativeElement.classList.add(_className ? _className : 'router-active');
      }
    }
  }

  removeClassToClienteRouteLink(_className?: string) {
    if (this.aLink) {
      if (this.clientes_routes.includes(this.route_path)) {
        this.aLink.nativeElement.classList.remove(_className ? _className : 'router-active');
      }
    }
  }
}
