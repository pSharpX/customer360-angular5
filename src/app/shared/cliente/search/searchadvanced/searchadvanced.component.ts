import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { SearchAdvancedService } from './searchadvanced.service';
import {
  NgbDateStruct,
  NgbActiveModal,
  NgbDatepickerConfig, NgbDatepickerI18n, NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from '../../../../core/directive/CustomDatepickerI18n';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { ClienteService } from '../../../../cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from '../../../../core/resources/ui/message-box/message-box.service';
import { AppComponent } from '../../../../app.component';
import * as moment from 'moment';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-searchadvanced',
  templateUrl: './searchadvanced.component.html',
  styleUrls: ['./searchadvanced.component.css'],
  providers: [ClienteService, I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class SearchadvancedComponent implements OnInit {

  @ViewChild('fechaentregaDe') datepickerFechaEntregaDe: NgbInputDatepicker;
  @ViewChild('fechaentregaHasta') datepickerFechaEntregaHasta: NgbInputDatepicker;

  @ViewChild('fechaultservicioDe') datepickerFechaUltServicioDe: NgbInputDatepicker;
  @ViewChild('fechaultservicioHasta') datepickerFechaUltServicioHasta: NgbInputDatepicker;

  @ViewChild('fechaultventaDe') datepickerFechaUltVentaDe: NgbInputDatepicker;
  @ViewChild('fechaultventaHasta') datepickerFechaUltVentaHasta: NgbInputDatepicker;

  @Input() modalId: string;
  @Input() blocking = false;
  isOpen = false;
  minLength = 3;
  maxLength = 200;

  valueFechaEntregaDe: Date | NgbDateStruct = null;
  valueFechaEntregaHasta: Date | NgbDateStruct = null;
  valueFechaUltServicioDe: Date | NgbDateStruct = null;
  valueFechaUltServicioHasta: Date | NgbDateStruct = null;
  valueFechaUltVentaDe: Date | NgbDateStruct = null;
  valueFechaUltVentaHasta: Date | NgbDateStruct = null;

  iscontVentasDisplay = true;
  iscontServiciosDisplay = true;
  iscontRepuestosDisplay = true;
  valuePorVentaVehiculos = false;
  valuePorServicios = false;
  valuePorRepuestos = false;
  inputFocusClass = false;
  valueVIN = '';

  listAnioFabricacion: Observable<any[]>;
  listAnioModelo: Observable<any[]>;
  listAsesorComercial: Observable<any[]>;
  listAsesorServicio: Observable<any[]>;
  listDepartamento: Observable<any[]>;
  listProvincia: Observable<any[]>;
  listDistrito: Observable<any[]>;
  listMarcas: Observable<any[]>;
  listModelos: Observable<any[]>;
  listPuntoVenta: Observable<any[]>;
  listAsesorVendedor: Observable<any[]>;

  opcionSelecAnioFabricacion = '00';
  opcionSelecAnioModelo = '00';
  opcionSelecAsesorComercial = '00';
  opcionSelecAsesorServicio = '00';
  opcionSelecDepartamento = '00';
  opcionSelecProvincia = '00';
  opcionSelecDistrito = '00';
  opcionSelecMarcas = '00';
  opcionSelecModelos = '00';
  opcionSelecPuntoVenta = '00';
  opcionSelecAsesorVendedor = '00';

  public max_Date: NgbDateStruct;

  ventasdisplayChange() {
    this.iscontVentasDisplay = !this.valuePorVentaVehiculos;

    if (!this.iscontVentasDisplay) {
      this.datepickerFechaEntregaDe.close();
      this.datepickerFechaEntregaHasta.close();
    }
  }

  serviciosdisplayChange() {
    this.iscontServiciosDisplay = !this.valuePorServicios;

    if (!this.iscontServiciosDisplay) {
      this.datepickerFechaUltServicioDe.close();
      this.datepickerFechaUltServicioHasta.close();
    }
  }

  repuestosdisplayChange() {
    this.iscontRepuestosDisplay = !this.valuePorRepuestos;

    if (!this.iscontRepuestosDisplay) {
      this.datepickerFechaUltVentaDe.close();
      this.datepickerFechaUltVentaHasta.close();
    }
  }

  constructor(
    private app: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: SearchAdvancedService,
    config: NgbDatepickerConfig,
    private clienteService: ClienteService,
    private messageboxService: MessageBoxService) {

    this.max_Date = { year: 2099, month: 12, day: 31 };
  }

  ngOnInit() {
    this.modalService.registerModal(this);

    this.clienteService.ListarFilterAdvanced().subscribe(res => {

      this.listAnioFabricacion = res[0].listAnioFabricacion;
      this.listAnioModelo = res[0].listAnioModelo;
      this.listAsesorComercial = Observable.of(res[0].listAsesorComercial);
      this.listAsesorServicio = res[0].listAsesorServicio;
      this.listDepartamento = res[0].listDepartamento;
      this.listMarcas = res[0].listMarcas;
      this.listModelos = res[0].listModelos;
      this.listPuntoVenta = res[0].listPuntoVenta;
      this.listAsesorVendedor = res[0].listAsesorVendedor;

    });

  }

  close(checkBlocking = false): void {

    this.opcionSelecAnioFabricacion = '00';
    this.opcionSelecAnioModelo = '00';
    this.opcionSelecAsesorComercial = '00';
    this.opcionSelecAsesorServicio = '00';
    this.opcionSelecDepartamento = '00';
    this.opcionSelecProvincia = '00';
    this.opcionSelecDistrito = '00';
    this.opcionSelecMarcas = '00';
    this.opcionSelecModelos = '00';
    this.opcionSelecPuntoVenta = '00';
    this.listProvincia = null;
    this.listDistrito = null;
    this.valueFechaEntregaDe = null;
    this.valueFechaEntregaHasta = null;
    this.valueFechaUltServicioDe = null;
    this.valueFechaUltServicioHasta = null;
    this.valueFechaUltVentaDe = null;
    this.valueFechaUltVentaHasta = null;
    this.valuePorRepuestos = false;
    this.valuePorServicios = false;
    this.valuePorVentaVehiculos = false;
    this.valueVIN = '';
    this.iscontVentasDisplay = true;
    this.iscontServiciosDisplay = true;
    this.iscontRepuestosDisplay = true;
    this.inputFocusClass = false;

    this.datepickerFechaEntregaDe.close();
    this.datepickerFechaEntregaHasta.close();

    this.datepickerFechaUltServicioDe.close();
    this.datepickerFechaUltServicioHasta.close();

    this.datepickerFechaUltVentaDe.close();
    this.datepickerFechaUltVentaHasta.close();

    this.modalService.close(this.modalId, checkBlocking);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
    }
  }

  focusInput(event) {
    this.inputFocusClass = true;
  }

  blurInput(event) {
    this.inputFocusClass = (this.valueVIN == null || this.valueVIN === '') ? false : this.valueVIN.length > 0 ? true : false;
  }

  soloAlfanumerico(event) {

    if (event.charCode === 32) {
      return true;
    }

    const regex = new RegExp('^[a-zA-Z0-9]+$');
    const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);

    if (regex.test(str)) {
      return true;
    }

    event.preventDefault();
    return false;
  }


  onPuntoVentaChange() {
    this.listAsesorComercial = null;
    this.opcionSelecAsesorComercial = '00';
    if (this.opcionSelecPuntoVenta !== '00') {
      this.listAsesorComercial = this.clienteService.obtenerAsesoresComercialPorPuntoVenta(this.opcionSelecPuntoVenta);
    }else {
      this.listAsesorComercial = this.clienteService.obtenerAsesoresComercial();
    }

  }

  onDepartamentoChange() {
    this.listProvincia = null;
    this.listDistrito = null;
    this.opcionSelecProvincia = '00';
    this.opcionSelecDistrito = '00';
    if (this.opcionSelecDepartamento !== '00') {
      this.listProvincia = this.clienteService.obtenerProvincias(this.opcionSelecDepartamento);
    }

  }

  onProvinciaChange() {
    this.listDistrito = null;
    this.opcionSelecDistrito = '00';
    if (this.opcionSelecProvincia !== '00') {
      this.listDistrito = this.clienteService.obtenerDistritos(this.opcionSelecDepartamento, this.opcionSelecProvincia);
    }
  }

  private fromDatetoNgbDateStructure(
    date: Date | NgbDateStruct,
    reverse?: boolean
  ): Date | NgbDateStruct {
    if (!reverse && date instanceof Date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
    }
    date = date as NgbDateStruct;
    const objects = moment(`${date.month}-${date.day}-${date.year}`).toDate();
    return objects;
  }

  convertDate(input: Date | NgbDateStruct): string {

    if (input != null) {
      const fechaStructure = this.fromDatetoNgbDateStructure(input, true).toString();
      const date = new Date(fechaStructure);

      const year = date.getFullYear();
      const rawMonth = date.getMonth() + 1;
      const month = rawMonth < 10 ? '0' + rawMonth : rawMonth;
      const rawDay = date.getDate();
      const day = rawDay < 10 ? '0' + rawDay : rawDay;

      return (year + '-' + month + '-' + day);
    } else {
      return '';
    }
  }

  clickSearch() {
    let countwithData = 0;
    const fechaentregaDe = this.valueFechaEntregaDe == null
      // tslint:disable-next-line:radix
      ? 0 : parseInt(this.convertDate(this.valueFechaEntregaDe).replace('-', '').replace('-', ''));
    const fechaentregaHasta = this.valueFechaEntregaHasta == null
      // tslint:disable-next-line:radix
      ? 0 : parseInt(this.convertDate(this.valueFechaEntregaHasta).replace('-', '').replace('-', ''));
    const fechaservicioDe = this.valueFechaUltServicioDe == null
      // tslint:disable-next-line:radix
      ? 0 : parseInt(this.convertDate(this.valueFechaUltServicioDe).replace('-', '').replace('-', ''));
    const fechaservicioHasta = this.valueFechaUltServicioHasta == null
      // tslint:disable-next-line:radix
      ? 0 : parseInt(this.convertDate(this.valueFechaUltServicioHasta).replace('-', '').replace('-', ''));
    const fechaventaDe = this.valueFechaUltVentaDe == null
      // tslint:disable-next-line:radix
      ? 0 : parseInt(this.convertDate(this.valueFechaUltVentaDe).replace('-', '').replace('-', ''));
    const fechaventaHasta = this.valueFechaUltVentaHasta == null
      // tslint:disable-next-line:radix
      ? 0 : parseInt(this.convertDate(this.valueFechaUltVentaHasta).replace('-', '').replace('-', ''));

    countwithData += this.opcionSelecMarcas === '00' ? 0 : 1;
    countwithData += this.opcionSelecAnioFabricacion === '00' ? 0 : 1;
    countwithData += this.opcionSelecModelos === '00' ? 0 : 1;
    countwithData += this.opcionSelecAnioModelo === '00' ? 0 : 1;
    countwithData += this.valueVIN === '' ? 0 : 1;
    countwithData += this.opcionSelecDepartamento === '00' ? 0 : 1;

    countwithData += this.valuePorVentaVehiculos === false ? 0 : 1;
    countwithData += this.valuePorServicios === false ? 0 : 1;
    countwithData += this.valuePorRepuestos === false ? 0 : 1;

    if (!this.iscontVentasDisplay) {
      countwithData += this.opcionSelecPuntoVenta === '00' ? 0 : 1;
      countwithData += this.opcionSelecAsesorComercial === '00' ? 0 : 1;
      countwithData += this.valueFechaEntregaDe == null ? 0 : 1;

      if (this.valueFechaEntregaDe != null) {
        countwithData += this.valueFechaEntregaHasta == null ? 0 : 1;
      }
    }

    if (!this.iscontServiciosDisplay) {
      countwithData += this.opcionSelecAsesorServicio === '00' ? 0 : 1;
      countwithData += this.valueFechaUltServicioDe == null ? 0 : 1;

      if (this.valueFechaUltServicioDe != null) {
        countwithData += this.valueFechaUltServicioHasta == null ? 0 : 1;
      }
    }

    if (!this.iscontRepuestosDisplay) {
      countwithData += this.opcionSelecAsesorVendedor === '00' ? 0 : 1;
      countwithData += this.valueFechaUltVentaDe == null ? 0 : 1;

      if (this.valueFechaUltVentaDe != null) {
        countwithData += this.valueFechaUltVentaHasta == null ? 0 : 1;
      }
    }

    if (countwithData === 0) {
      $('.messageBoxAdv').attr('style', 'z-index:0');
      this.messageboxService.open('modalId', 'Advertencia', 'Debe ingresar información en alguno de los campos de búsqueda.');
      return;
    }

    if (this.valueFechaEntregaHasta != null) {

      if (this.valueFechaEntregaDe == null) {
        $('.messageBoxAdv').attr('style', 'z-index:0');
        this.messageboxService.open('modalId', 'Advertencia', 'No se ha ingresado fecha de inicio de entrega.');
        return;
      } else {
        if (fechaentregaDe > fechaentregaHasta) {
          $('.messageBoxAdv').attr('style', 'z-index:0');
          this.messageboxService.open('modalId', 'Advertencia', 'La fecha de inicio de entrega no puede ser mayor.');
          return;
        }
      }
    }

    if (this.valueFechaUltServicioHasta != null) {

      if (this.valueFechaUltServicioDe == null) {
        $('.messageBoxAdv').attr('style', 'z-index:0');
        this.messageboxService.open('modalId', 'Advertencia', 'No se ha ingresado fecha de inicio de último servicio.');
        return;
      } else {
        if (fechaservicioDe > fechaservicioHasta) {
          $('.messageBoxAdv').attr('style', 'z-index:0');
          this.messageboxService.open('modalId', 'Advertencia', 'La fecha de inicio de último servicio no puede ser mayor.');
          return;
        }
      }
    }

    if (this.valueFechaUltVentaHasta != null) {

      if (this.valueFechaUltVentaDe == null) {
        $('.messageBoxAdv').attr('style', 'z-index:0');
        this.messageboxService.open('modalId', 'Advertencia', 'No se ha ingresado fecha de inicio de última venta.');
        return;
      } else {
        if (fechaventaDe > fechaventaHasta) {
          $('.messageBoxAdv').attr('style', 'z-index:0');
          this.messageboxService.open('modalId', 'Advertencia', 'La fecha de inicio de última venta no puede ser mayor.');
          return;
        }
      }
    }

    if (this.valueVIN !== '') {
      if (!(this.valueVIN.length >= this.minLength && this.valueVIN.length <= this.maxLength)) {
        return;
      }
    }

    this.searchData();
  }

  searchData() {

    this.app.showloader = true;

    const aniofabricacion = this.opcionSelecAnioFabricacion;
    const aniomodelo = this.opcionSelecAnioModelo;
    const sucursal = this.opcionSelecPuntoVenta;
    const asesorcomercial = this.opcionSelecAsesorComercial;
    const fechaentregaDe = this.valueFechaEntregaDe == null ? '-' : this.convertDate(this.valueFechaEntregaDe);
    const fechaentregaHasta = this.valueFechaEntregaHasta == null ? '-' : this.convertDate(this.valueFechaEntregaHasta);
    const asesorservicio = this.opcionSelecAsesorServicio;
    const fechaservicioDe = this.valueFechaUltServicioDe == null ? '-' : this.convertDate(this.valueFechaUltServicioDe);
    const fechaservicioHasta = this.valueFechaUltServicioHasta == null ? '-' : this.convertDate(this.valueFechaUltServicioHasta);
    const marca = this.opcionSelecMarcas;
    const modelo = this.opcionSelecModelos;
    const departamento = this.opcionSelecDepartamento;
    const provincia = this.opcionSelecProvincia;
    const distrito = this.opcionSelecDistrito;
    const porventavehiculo = this.valuePorVentaVehiculos === false ? 0 : 1;
    const porservicio = this.valuePorServicios === false ? 0 : 1;
    const porrepuesto = this.valuePorRepuestos === false ? 0 : 1;
    const vendedor = this.opcionSelecAsesorVendedor;
    const fechaventaDe = this.valueFechaUltVentaDe == null ? '-' : this.convertDate(this.valueFechaUltVentaDe);
    const fechaventaHasta = this.valueFechaUltVentaHasta == null ? '-' : this.convertDate(this.valueFechaUltVentaHasta);
    const vin = this.valueVIN == null || this.valueVIN === '' ? '-' : this.valueVIN;

    const filtros = '{' +
      aniofabricacion + '|' +
      aniomodelo + '|' +
      sucursal + '|' +
      asesorcomercial + '|' +
      fechaentregaDe + '|' +
      fechaentregaHasta + '|' +
      asesorservicio + '|' +
      fechaservicioDe + '|' +
      fechaservicioHasta + '|' +
      marca + '|' +
      modelo + '|' +
      departamento + '|' +
      provincia + '|' +
      distrito + '|' +
      porventavehiculo + '|' +
      porservicio + '|' +
      porrepuesto + '|' +
      vendedor + '|' +
      fechaventaDe + '|' +
      fechaventaHasta + '|' +
      vin +  '}';

    this.clienteService.BuscarAdvanced(filtros).subscribe(res => {

      this.app.showloader = false;

      if (res.length === 0) {
        $('.messageBoxAdv').attr('style', 'z-index:0');
        this.messageboxService.open('modalId', 'Advertencia', 'El Cliente no se encuentra registrado.');

        if (this.app.isWarningMessage) {
          return;
        }
      }

      // localStorage.removeItem('searchCliente');
      localStorage.removeItem('filterCliente');
      localStorage.removeItem('typeSearch');
      // localStorage.setItem('searchCliente', JSON.stringify(res));
      localStorage.setItem('filterCliente', JSON.stringify(filtros));
      localStorage.setItem('typeSearch', JSON.stringify(2));
      this.router.navigate(['./clientes']);
      this.close();

    });
  }

}
