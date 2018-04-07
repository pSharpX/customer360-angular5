import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterViewChecked,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VentaService } from '../venta.service';
import { ViewMode } from '../../cotizacion/item/item.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { SharedService } from '../../core/service/shared.service';
import { ClienteService } from '../../cliente/cliente.service';
import { Cliente } from '../../cliente/main/main.component';
import { RegexService } from '../../core/util/regex/regex.service';

export interface PaginatedItems {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<any>;
}

export interface Venta {
  fechaFacturacion?: string;
  nombreColor?: string;
  numeroNotaPedido?: any;
  vin?: string;
  nombreMarca?: string;
  codigoFamiliaCorto?: string;
  nombreFamiliaCorto?: string;
  nombreModelo?: string;
  nombreComercial?: string;
  codigoCanalVenta?: string;
  nombreCanalVenta?: string;
  nombrePuntoVenta?: string;
  nombreAsesor?: string;
  codigoTipoComprobante?: string;
  nombreTipoComprobante?: string;
  comprobanteSerie?: string;
  comprobanteNumero?: string;
  codigoTipoCliente?: string;
  nombreTipoCliente?: string;
  numeroDocumento?: string;
  nombreCliente?: string;
  fechaEmision?: Date;
  nombreMoneda?: string;
  importeVenta?: number;
  cantidad?: number;
  nombreFormaPago?: string;
  añoFabricacion?: string;
  añoModelo?: string;
  montoPrecioCierre?: number;
  montoPrecioLista?: number;
  montoPrecioVenta?: number;
  codigoPedido?: string;
  nombreTipoVenta?: string;
  nombreEstadoComercial?: string;
  fechaCancelacion?: Date;
  estadoNotaPedido?: string;
  nombreEmpresa?: string;
  numeroPlaca?: string;
  periodo?: string;
  nombreClasificacionVenta?: string;
  marcaGerencial?: string;
  entregaInmediata?: string;
  fechaSolicitudPlaca?: Date;
  fechaAsignacionPlaca?: Date;
  nombreCita?: string;
  estadoPDI?: string;
  fechaSolicitudPDI?: Date;
  fechaFinPDI?: Date;
  estadoDespacho?: string;
  libreWarrant?: string;
  nombreUbicacion?: string;
  fechaReserva?: Date;
  fechaETA?: Date;
  fechaArribo?: Date;
  desaduanada?: string;
  fechaLiberacionWarrant?: Date;
  fechaEstimacionInicioPDI?: Date;
  fechaEstimacionFinPDI?: Date;
  fechaSolicitudDespacho?: Date;
  fechaEstimacionDespacho?: Date;
  fechaDespacho?: Date;
  fechaCita?: Date;
  fechaEntrega?: Date;
}

@Component({
  selector: 'app-venta-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeInAnimation]
})
export class MainComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  static Delay = 1500;
  public ventaViewMode = ViewMode.TABLE;
  public historialViewMode = ViewMode.TABLE;
  private clienteServiceSubscription: Subscription;
  private sharedServiceSubscription: Subscription;
  private routerSubscription: Subscription;
  private routerParamsSubscription: Subscription;

  private ventaColumsOrder: any;
  private historialColumsOrder: any;
  public ventaOrders: any = {
    nombreComercial: true, // it is ascending
    numeroNotaPedido: true,
    nombreTipoVenta: true,
    fechaFacturacion: true,
    fechaEntrega: true,
    estadoDespacho: true,
    fechaEstimacionDespacho: true
  };
  public historialOrders: any = {
    nombreComercial: true, // it is ascending
    numeroNotaPedido: true,
    nombreTipoVenta: true,
    fechaFacturacion: true,
    fechaEntrega: true,
    estadoDespacho: true,
    fechaEstimacionDespacho: true
  };
  public isLoadingVentas = false;
  public isLoadingHistorial = false;
  public isVentasProcessing = false;
  public isHistorialProcessing = false;
  public cliente: Cliente;
  public _cliente: Observable<Cliente>;

  public perPage = 6;
  public paginationSize = 5;
  public ventaPages: Array<number>;
  public historialPages: Array<number>;
  public currentPagVentas: PaginatedItems = {
    page: 1,
    per_page: this.perPage,
    total: 0,
    total_pages: 1,
    data: []
  };
  public currentPagHistorial: PaginatedItems = {
    page: 1,
    per_page: this.perPage,
    total: 0,
    total_pages: 1,
    data: []
  };
  public _paginatedVentas: Observable<Array<Venta>>;
  public _paginatedHistorial: Observable<Array<Venta>>;
  public ventas: Observable<Array<Venta>>;
  public _historial: Observable<Array<Venta>>;

  public historial = [
    {
      descripcion: 'Vehiculo HYUNDAI 349595-C',
      codigo: '10475',
      tipo: 'Venta',
      fecha_facturacion: '04/12/2017',
      fecha_entrega: '12/03/2018',
      estado: 'A Tiempo',
      fecha_estado: '12/03/2018',
      asesor: 'José Perez'
    },
    {
      descripcion: 'Vehiculo HYUNDAI 349595-C',
      codigo: '10475',
      tipo: 'Venta',
      fecha_facturacion: '04/12/2017',
      fecha_entrega: '12/03/2018',
      estado: 'A Tiempo',
      fecha_estado: '12/03/2018',
      asesor: 'José Perez'
    },
    {
      descripcion: 'Vehiculo HYUNDAI 349595-C',
      codigo: '10475',
      tipo: 'Venta',
      fecha_facturacion: '04/12/2017',
      fecha_entrega: '12/03/2018',
      estado: 'A Tiempo',
      fecha_estado: '12/03/2018',
      asesor: 'José Perez'
    },
    {
      descripcion: 'Vehiculo HYUNDAI 349595-C',
      codigo: '10475',
      tipo: 'Venta',
      fecha_facturacion: '04/12/2017',
      fecha_entrega: '12/03/2018',
      estado: 'A Tiempo',
      fecha_estado: '12/03/2018',
      asesor: 'José Perez'
    },
    {
      descripcion: 'Vehiculo HYUNDAI 349595-C',
      codigo: '10475',
      tipo: 'Venta',
      fecha_facturacion: '04/12/2017',
      fecha_entrega: '12/03/2018',
      estado: 'A Tiempo',
      fecha_estado: '12/03/2018',
      asesor: 'José Perez'
    },
    {
      descripcion: 'Vehiculo HYUNDAI 349595-C',
      codigo: '10475',
      tipo: 'Venta',
      fecha_facturacion: '04/12/2017',
      fecha_entrega: '12/03/2018',
      estado: 'A Tiempo',
      fecha_estado: '12/03/2018',
      asesor: 'José Perez'
    }
  ];
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private ventaServicio: VentaService,
    private clienteServicio: ClienteService,
    private sharedService: SharedService,
    private regexService: RegexService,
    private changeDref: ChangeDetectorRef
  ) {
    this.routerParamsSubscription = this.route.params.subscribe(params => {
      this.cliente = {
        idCliente: params['id']
      };
    });
    this.sharedServiceSubscription = this.sharedService.requestEmitted$.subscribe(
      (_cliente: Cliente) => {
        this.cliente = _cliente;
        this.fetchVentas();
      }
    );
  }

  ngOnInit() {
    // console.log('venta component oninint');
    // this._cliente = this.route.paramMap
    //   .pluck('id')
    //   .mergeMap((_idCliente: any) => {
    //     console.log(_idCliente);
    //     return <Observable<Cliente>>this.sharedService.requestEmitted$;
    //   });

    // Observable.concat(this._cliente).subscribe((_cliente: Cliente) => {
    //   console.log(_cliente);
    //   this.cliente = _cliente;
    //   this.fetchVentas();
    // });
    this.clienteServiceSubscription = this.clienteServicio
      .Obtener(this.cliente.idCliente)
      .subscribe(_cliente => {
        this.cliente = _cliente;
        this.fetchVentas();
      });
  }

  ngAfterViewChecked(): void {
    this.changeDref.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    if (this.routerParamsSubscription) {
      this.routerParamsSubscription.unsubscribe();
    }
    if (this.sharedServiceSubscription) {
      this.sharedServiceSubscription.unsubscribe();
    }
    if (this.clienteServiceSubscription) {
      this.clienteServiceSubscription.unsubscribe();
    }
  }

  public changeViewMode(viewMode: string, value: string): void {
    viewMode = value;
  }

  public fetchVentas() {
    this.ventas = this.ventaServicio
      .Listar(this.cliente.numeroDocumento)
      .first()
      .do(() => {
        this.isLoadingVentas = true;
      })
      .debounceTime(500)
      .delay(MainComponent.Delay)
      .catch(err => {
        this.isLoadingVentas = false;
        return Observable.throw(err);
      })
      .finally(() => {
        this.isLoadingVentas = false;
      })
      .publishLast()
      .refCount();
    this.paginateVentas(this.ventas, this.currentPagVentas.page);
  }

  public exportVentasTo() {
    this.ventaServicio
      .Exportar(this.cliente.numeroDocumento)
      .do(() => (this.isVentasProcessing = true))
      .delay(MainComponent.Delay)
      .subscribe(
        file => {
          FileSaver.saveAs(file, 'ReporteVentas');
          this.isVentasProcessing = false;
        },
        (error: any) => {
          this.isVentasProcessing = false;
        },
        () => {
          this.isVentasProcessing = false;
        }
      );
  }

  public paginateVentas(
    _ventasObser: Observable<Array<Venta>>,
    currentPage?: number
  ) {
    currentPage = currentPage || 1;
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > this.currentPagVentas.total_pages) {
      currentPage = this.currentPagVentas.total_pages;
    }
    this.currentPagVentas.page = currentPage;
    this._paginatedVentas = _ventasObser
      .map(_ventas => {
        _ventas = this.getSortedItems(_ventas, this.ventaColumsOrder);
        this.currentPagVentas = this.getPaginatedItems(
          _ventas,
          this.currentPagVentas.page
        );
        this.ventaPages = this.buildPaginationPages(
          this.currentPagVentas.total_pages
        );
        return this.currentPagVentas.data;
      })
      .publish()
      .refCount();
  }

  public sortVentas(_head: string) {
    this.ventaColumsOrder = {};
    this.ventaColumsOrder[_head] = this.ventaOrders[_head];
    _.forEach(this.ventaOrders, (_value, _key) => {
      if (_key !== _head) {
        this.ventaColumsOrder[_key] = _value;
      }
    });
    this.paginateVentas(this.ventas, 1);
  }

  private buildPaginationPages(totalPages: number): Array<number> {
    let pages: Array<number> = null;
    if (totalPages > 0) {
      pages = [];
      let counter = 1;
      // if (this.isNotSkiptToPageBetweenPaginationSize(this.currentPagVentas.page)) {

      // }
      while (counter <= totalPages && counter <= this.paginationSize) {
        pages.push(counter);
        counter++;
      }
    }
    return pages;
  }

  public isNotSkiptToPageBetweenPaginationSize(skipTo: number) {
    if (
      this.ventaPages &&
      skipTo <= this.currentPagVentas.total_pages &&
      !_.includes(this.ventaPages, skipTo)
    ) {
      return true;
    }
    return false;
  }

  public goToVentaPage(page: any) {
    if (this.regexService.IsDigit(page)) {
      page = +page;
      if (_.isNumber(page)) {
        const skipTo = page;
        if (skipTo > 0 && skipTo <= this.currentPagVentas.total_pages) {
          this.paginateVentas(this.ventas, skipTo);
        }
      }
    }
  }

  // public goToHistorialPage(page: any) {
  //   page = +page;
  //   if (_.isNumber(page)) {
  //     const skipTo = page;
  //     if (skipTo > 0 && skipTo <= this.currentPagHistorial.total_pages) {
  //       this.paginateVentas(this.his, skipTo);
  //     }
  //   }
  // }

  private getPaginatedItems(items: Array<any>, _page?: number) {
    const page = _page || 1,
      offset = (page - 1) * this.perPage,
      paginatedItems = _.chain(items)
        .drop(offset)
        .take(this.perPage)
        .value();
    return {
      page: page,
      per_page: this.perPage,
      total: items.length,
      total_pages: Math.ceil(items.length / this.perPage),
      data: paginatedItems
    };
  }

  private getSortedItems(items: Array<any>, _orders: any): Array<any> {
    if (!_orders) {
      _orders = {};
    }
    const _keys = Object.keys(_orders);
    let _values = Object.values(_orders);
    _values = _values.map(v => (v ? 'asc' : 'desc'));
    return _.chain(items)
      .orderBy(_keys, _values)
      .value();
  }
}
