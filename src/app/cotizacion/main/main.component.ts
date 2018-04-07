import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, Renderer, SimpleChanges } from '@angular/core';
import { ViewMode } from '../item/item.component';
import { CotizacionService } from '../cotizacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import * as _ from 'lodash';
import * as FileSaver from 'file-saver';
import { SharedService } from '../../core/service/shared.service';
import { ClienteService } from '../../cliente/cliente.service';
import { TestdriveService } from '../testdrive/testdrive.service';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { ChangeDetectorRef } from '@angular/core';
import { OnChanges, AfterViewChecked } from '@angular/core';
import { Cliente } from '../../cliente/main/main.component';
import { skip } from 'rxjs/operator/skip';
import { RegexService } from '../../core/util/regex/regex.service';

export interface PaginatedItems {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<any>;
}

export interface Cotizacion {
  idCotizacion: any;
  codigoMarca: string;
  nombreMarca: string;
  codigoModelo: string;
  nombreModelo: string;
  nombreColor: string;
  nombreEstado: string;
  añoModelo: any;
  añoFabricacion: any;
  codigoFamilia: string;
  nombreFamilia: string;
  nombreComercial: string;
  nombreCarroceria: string;
  nombreCliente: string;
  numeroDocumento: string;
  tipoCliente: string;
  nombreEmpleado: string;
  nombreJefeVentas: string;
  numeroCotizacion: string;
  fechaRegistro: Date;
  fechaUltimoContacto: Date;
  montoPrecioVenta: number;
  montoPrecioCierre: number;
  cantidad: number;
  codigoTipoVenta: string;
  nombreTipoVenta: string;
  observacion: any;
  idPuntoVenta: any;
  nombrePuntoVenta: string;
  codigoCanalVenta: string;
  nombreCanalVenta: string;
  idUbica: any;
  nombreUbica: any;
}

export interface TestDrive {
  idSolicitud: any;
  periodo: any;
  cantidad: number;
  numeroSolicitud: any;
  nombreMarca: string;
  nombreModelo: string;
  codigoFamiliaCorto: string;
  vin: string;
  nombreUbicacion: string;
  nombreCanalVenta: string;
  asesorPuntoVenta: string;
  nombreAsesor: string;
  numeroDocumento: string;
  nombreCliente: string;
  rucCliente: string;
  razonSocial: string;
  codigoEstado: string;
  nombreEstado: string;
  fechaPruebaManejo: Date;
  fechaInicio: Date;
  fechaFin: Date;
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeInAnimation]
})
export class MainComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  static Delay = 1500;
  public cotizacionesViewMode = ViewMode.TABLE;
  public testDriveViewMode = ViewMode.TABLE;
  private sharedServiceSubscription: Subscription;
  private routerSubscription: Subscription;
  private routerParamsSubscription: Subscription;

  loading = false;
  error: {
    state: boolean,
    codigo?: number,
    title?: string,
    message?: string
  } = {
    state: false,
    codigo: 500,
    title: 'ServerError',
    message: 'Ocurrió un error al intentar establecer conección con el servidor.'
   };

  private cotizacionColumsOrder: any;
  private testdriveColumsOrder: any;
  public cotizacionOrders: any = {
    'numeroCotizacion': true, // it is ascending
    'fechaRegistro': true,
    'nombreMarca': true,
    'nombreModelo': true,
    'añoModelo': true,
    'montoPrecioCierre': true,
    'montoPrecioVenta': true,
    'nombrePuntoVenta': true,
    'nombreEmpleado': true,
    'nombreEstado': true
  };
  public testdriveOrders: any = {
    'fechaPruebaManejo': true, // it is ascending
    'codigoFamiliaCorto': true,
    'nombreMarca': true,
    'nombreModelo': true,
    'asesorPuntoVenta': true,
    'nombreAsesor': true
  };
  public perPage = 6;
  public paginationSize = 5;
  public cotizacionPages: Array<number>;
  public testDrivePages: Array<number>;
  public currentPagCotizaciones: PaginatedItems =  {
    page: 1,
    per_page: this.perPage,
    total: 0,
    total_pages: 1,
    data: [],
  };
  public currentPagTestsDrive: PaginatedItems = {
    page: 1,
    per_page: this.perPage,
    total: 0,
    total_pages: 1,
    data: [],
  };

  public isLoadingCotizaciones = false;
  public isLoadingTestDrive = false;
  public isCotizacionesProcessing = false;
  public isTestDriveProcessing = false;

  public cliente: Cliente;

  public _paginatedTestsDrive: Observable<Array<TestDrive>>;
  public _paginatedCotizaciones: Observable<Array<Cotizacion>>;
  public testsDrive: Observable<Array<TestDrive>>;
  public cotizaciones: Observable<Array<Cotizacion>>;

  constructor(
    private location: Location,
    private router: Router,
    private renderer: Renderer,
    private route: ActivatedRoute,
    private clienteServicio: ClienteService,
    private cotizacionServicio: CotizacionService,
    private testdriveServicio: TestdriveService,
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
        if (_cliente != null && _cliente.idCliente != null) {
          this.cliente = _cliente;
          this.fetchCotizaciones();
          this.fetchTetsDrive();
        }
      }, this.catchErrorEvent, this.catchCompleteEvent);
  }

  ngOnInit() {
    this.clienteServicio.Obtener(this.cliente.idCliente).subscribe(
      (_cliente) => {
      this.cliente = _cliente;
      this.fetchCotizaciones();
      this.fetchTetsDrive();
    }, this.catchErrorEvent, this.catchCompleteEvent);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewChecked(): void {
    this.changeDref.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.routerParamsSubscription) {
      this.routerParamsSubscription.unsubscribe();
    }
    if (this.sharedServiceSubscription) {
      this.sharedServiceSubscription.unsubscribe();
    }
  }

  private catchErrorEvent(err: any): void {
    this.loading = false;
    this.error.state = true;
    this.error.codigo = err.code;
    this.error.title = err.error;
    this.error.message = err.message;
  }

  private catchCompleteEvent(): void {
    this.loading = false;
  }

  public changeViewMode(viewMode: string, value: string): void {
    viewMode = value;
  }

  public fetchCotizaciones() {
    this.cotizaciones = this.cotizacionServicio
      .Listar(this.cliente.numeroDocumento)
      .first()
      .do(() => {
        this.isLoadingCotizaciones = true;
      })
      .debounceTime(500)
      .delay(MainComponent.Delay)
      .catch(err => {
        this.isLoadingCotizaciones = false;
        this.catchErrorEvent(err);
        return Observable.throw(err);
      })
      .finally(() => {
        this.isLoadingCotizaciones = false;
      }).publishLast().refCount();
      // }).publish().refCount();
      this.paginateCotizaciones(this.cotizaciones, this.currentPagCotizaciones.page);
  }

  public fetchTetsDrive() {
    this.testsDrive = this.testdriveServicio
      .Listar(this.cliente.numeroDocumento)
      .first()
      .do(() => {
        this.isLoadingTestDrive = true;
      })
      .debounceTime(500)
      .delay(MainComponent.Delay)
      .catch(err => {
        this.isLoadingTestDrive = false;
        this.catchErrorEvent(err);
        return Observable.throw(err);
      })
      .finally(() => {
        this.isLoadingTestDrive = false;
      }).publishLast().refCount();
      // }).publish().refCount();
      this.paginateTestsDrive(this.testsDrive, this.currentPagTestsDrive.page);
  }

  public exportCotizacionesTo() {
    if (this.cliente && this.cliente.numeroDocumento) {
      this.cotizacionServicio
      .Exportar(this.cliente.numeroDocumento)
      .do(() => {
        this.isCotizacionesProcessing = true;
      })
      .delay(MainComponent.Delay)
      .subscribe(
        (file) => {
          FileSaver.saveAs(file, 'ReporteCotizaciones');
          this.isCotizacionesProcessing = false;
        },
        (error: any) => {
          this.isCotizacionesProcessing = false;
          this.catchErrorEvent(error);
        },
        () => {
          this.isCotizacionesProcessing = false;
        }
      );
    }
  }

  public exportTestsDriveTo() {
    if (this.cliente && this.cliente.numeroDocumento) {
      this.testdriveServicio
      .Exportar(this.cliente.numeroDocumento)
      .do(() => (this.isTestDriveProcessing = true))
      .delay(MainComponent.Delay)
      .subscribe(
        (file) => {
          FileSaver.saveAs(file, 'ReporteTestDrive');
          this.isTestDriveProcessing = false;
        },
        (error: any) => {
          this.isTestDriveProcessing = false;
          this.catchErrorEvent(error);
        },
        () => {
          this.isTestDriveProcessing = false;
        }
      );
    }
  }

  public paginateCotizaciones(_cotizacionesObser: Observable<Array<Cotizacion>>, currentPage?: number) {
    currentPage = currentPage || 1;
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > this.currentPagCotizaciones.total_pages) {
      currentPage = this.currentPagCotizaciones.total_pages;
    }
    this.currentPagCotizaciones.page = currentPage;
    this._paginatedCotizaciones = _cotizacionesObser.map(_cotizaciones => {
      _cotizaciones = this.getSortedItems(_cotizaciones, this.cotizacionColumsOrder);
      this.currentPagCotizaciones = this.getPaginatedItems(
        _cotizaciones,
        this.currentPagCotizaciones.page
      );
      this.cotizacionPages = this.buildPaginationPages(this.currentPagCotizaciones.total_pages);
      return this.currentPagCotizaciones.data;
    })
    .publish()
    .refCount();
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

  // public isNotSkiptToPageBetweenPaginationSize(skipTo: number) {
  //   if (this.ventaPages && skipTo <= this.currentPagVentas.total_pages && !(_.includes(this.ventaPages, skipTo))) {
  //     return true;
  //   }
  //   return false;
  // }

  public goToTestDrivePage(page: any) {
    if (this.regexService.IsDigit(page)) {
      page = +page;
      if (_.isNumber(page)) {
        const skipTo = page;
        if (skipTo > 0 && skipTo <= this.currentPagTestsDrive.total_pages) {
          this.paginateTestsDrive(this.testsDrive, skipTo);
        }
      }
    }
  }

  public goToCotizacionPage(page: any) {
    page = +page;
    if (_.isNumber(page)) {
      const skipTo = page;
      if (skipTo > 0 && skipTo <= this.currentPagCotizaciones.total_pages) {
        this.paginateCotizaciones(this.cotizaciones, skipTo);
      }
    }
  }

  public paginateTestsDrive(_testsDriveObser: Observable<Array<TestDrive>>, currentPage?: number) {
    currentPage = currentPage || 1;
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > this.currentPagTestsDrive.total_pages) {
      currentPage = this.currentPagTestsDrive.total_pages;
    }
    this.currentPagTestsDrive.page = currentPage || 1;
    this._paginatedTestsDrive = _testsDriveObser.map(_testsdrive => {
      _testsdrive = this.getSortedItems(_testsdrive, this.testdriveColumsOrder);
      this.currentPagTestsDrive = this.getPaginatedItems(
        _testsdrive,
        this.currentPagTestsDrive.page
      );
      this.testDrivePages = this.buildPaginationPages(this.currentPagTestsDrive.total_pages);
      return this.currentPagTestsDrive.data;
    })
    .publish()
    .refCount();
  }

  public sortCotizaciones(_head: string) {
    this.cotizacionColumsOrder = {};
    this.cotizacionColumsOrder[_head] = this.cotizacionOrders[_head];
    _.forEach(this.cotizacionOrders, (_value, _key) => {
      if (_key !== _head) {
        this.cotizacionColumsOrder[_key] = _value;
      }
    });
    this.paginateCotizaciones(this.cotizaciones, 1);
  }

  public sortTestsDrive(_head: string) {
    this.testdriveColumsOrder = {};
    this.testdriveColumsOrder[_head] = this.testdriveOrders[_head];
    _.forEach(this.testdriveOrders, (_value, _key) => {
      if (_key !== _head) {
        this.testdriveColumsOrder[_key] = _value;
      }
    });
    this.paginateTestsDrive(this.testsDrive, 1);
  }

  // public isSkiptToPageBetween(skipTo: number) {
  //   if (this.)
  //   return false;
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
    _values = _values.map((v) => (v) ? 'asc' : 'desc' );
    return _.chain(items)
      .orderBy(_keys, _values)
      .value();
  }
}
