import { Component, OnInit, Input, HostListener } from '@angular/core';
import {
  NgbDateStruct,
  NgbActiveModal,
  NgbDatepickerConfig, NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from '../../core/directive/CustomDatepickerI18n';
import * as moment from "moment";
import { AdministracionService } from '../administracion.service';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from '../../app.component';
import { HttpConst } from '../../core/resources/http/http.const';
import { MessageBoxService } from '../../core/resources/ui/message-box/message-box.service';
import { GridComponent } from '../../design/grid/grid.component';
import { GridUi } from '../../design/grid/gridUi';
import { ModalService } from '../../core/resources/ui/modal/modal.service';
import { MessageBoxType } from '../../core/resources/ui/message-box/message-box.enum';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-visorsincronizacion',
  templateUrl: './visorsincronizacion.component.html',
  styleUrls: ['./visorsincronizacion.component.css'],
  providers: [AdministracionService, I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, GridComponent]
})
export class VisorsincronizacionComponent implements OnInit {

  valueFechaDesde: Date | NgbDateStruct = null;
  valueFechaHasta: Date | NgbDateStruct = null;
  opcionSelecEstado: string = "00";
  listaEstadoSincronizacionDetalle: Observable<any[]>;
  isDisabledSincronizar: boolean = true;
  public gridUpdate: any;  

  constructor(
    private app: AppComponent,
    config: NgbDatepickerConfig,
    private grid: GridComponent,
    private administracionService: AdministracionService,
    private messageboxService: MessageBoxService,
    private modalService: ModalService,
  ) {

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate() };
    config.outsideDays = "hidden";
    this.gridUpdate = new GridUi();    
  }

  ngOnInit() {

    this.cargarInitial();
    this.listaEstadoSincronizacionDetalle = this.administracionService.ListarEstadoSincronizacionDetalle();
    $("#searchcliente").attr("style", "display:none");
  }

  cargarInitial() {

    this.gridUpdate = {
      module: "VisorSyn",
      urlExport: '',
      titleFile: "Reporte Sincronizacion.xlsx",
      sizePage: 0,
      countReg: 0,
      withDetail: false,
      iconCount: 'iconth',
      currentPage: 1,
      columns: [
        {
          Id: 'keyProceso',
          Name: '',
          Cls: 'col5p',
          ind: 1,
          isDesign: true,
          isOrder: false,
          isValueEl: true,
          isHeaderType: true,
          isVisible: 'hidden',
          Type: {
            name: 'checkbox',
            disabled: false,
            useValue: true
          }
        },
        {
          Id: 'fecha',
          Name: 'Fecha',
          Cls: 'col10p',
          ind: 2,
          isDesign: false,
          isOrder: true,
          isValueEl: false,
          isContraer: false,
          isOpenModal: false,
          isTextoVer: false
        },
        {
          Id: 'tipoSincronizacion',
          Name: 'Tipo Sincronizacion',
          Cls: 'col10p',
          ind: 3,
          isDesign: false,
          isOrder: true,
          isValueEl: false,
          isContraer: false,
          isOpenModal: false,
          isTextoVer: false
        },
        {
          Id: 'idProceso',
          Name: 'IdProceso',
          Cls: 'col10p',
          ind: 4,
          isDesign: false,
          isOrder: true,
          isValueEl: false,
          isContraer: false,
          isOpenModal: false,
          isTextoVer: false
        },
        {
          Id: 'tipoProceso',
          Name: 'Tipo Proceso',
          Cls: 'col25p',
          ind: 5,
          isDesign: false,
          isOrder: true,
          isValueEl: false,
          isContraer: false,
          isOpenModal: false,
          isTextoVer: false
        },
        {
          Id: 'aplicacion',
          Name: 'Aplicacion',
          Cls: 'col15p',
          ind: 6,
          isDesign: false,
          isOrder: false,
          isValueEl: false,
          isContraer: false,
          isOpenModal: false,
          isTextoVer: false
        },
        {
          Id: 'estado',
          Name: 'Estado',
          Cls: 'col10p',
          ind: 7,
          isDesign: false,
          isOrder: false,
          isValueEl: false,
          isContraer: false,
          isOpenModal: false,
          isTextoVer: false
        },
        {
          Id: 'observacion',
          Name: 'Observación',
          Cls: 'col15p',
          ind: 8,
          isDesign: false,
          isOrder: false,
          isValueEl: false,
          isContraer: true,
          isOpenModal: true,
          isTextoVer: false
        },
        {
          Id: 'data',
          Name: 'Data',
          Cls: 'col10p',
          ind: 9,
          isDesign: false,
          isOrder: false,
          isValueEl: false,
          isContraer: false,
          isOpenModal: true,
          isTextoVer: true,
          isFormatJson: true
        }
      ],
      rows: [],
      rowsData: []
    };

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
      var fechaStructure = this.fromDatetoNgbDateStructure(input, true).toString();
      var date = new Date(fechaStructure);

      var year = date.getFullYear();
      var rawMonth = date.getMonth() + 1;
      var month = rawMonth < 10 ? '0' + rawMonth : rawMonth;
      var rawDay = date.getDate();
      var day = rawDay < 10 ? '0' + rawDay : rawDay;

      return (year + '-' + month + '-' + day);
    } else {
      return '';
    }
  }

  onSincronizar() {

    const _settings = {
      title: 'Advertencia',
      message: '¿ Está seguro de efectuar la sincronización ?',
      buttons: [
        {
          text: 'Aceptar',
          id: 'btn_aceptar',
          className: 'btn btn-success',
          iconClassName: 'fa-thumbs-up',
          click: $activeModal => {
            $activeModal.close(true);
          }
        },
        {
          text: 'Cancelar',
          id: 'btn_cancelar',
          className: 'btn btn-danger',
          iconClassName: 'fa-remove',
          click: $activeModal => {
            $activeModal.close(false);
          }
        }
      ],
      type: MessageBoxType.CONFIRMATION
    };
    this.modalService
      .Open(_settings)
      .then(confirmed => {
        if (confirmed) {
          this.procesarSincronizacion();
        }
      })
      .catch(err => {
        console.log(`Error ocurred trying confirm form: ${err}`);
      });
  }

  procesarSincronizacion() {

    var lista: string = "";

    const row = this.gridUpdate.rowsData;

    row.forEach(x => {

      var valueCheckbox;
      var estado;
      var id;

      x.rowData.forEach(y => {
        if (y.ind == 1) {
          valueCheckbox = y.valueChecked;
          id = y.data;
        }

        if (y.ind == 7) {
          estado = y.data;
        }

      });

      if (estado == "Fallido" && (valueCheckbox == true || $("#chk" + x.i).is(':checked'))) {

        lista = lista + id + '|';
      }

    });

    if (lista == "") {
      this.messageboxService.open('modalId', 'Advertencia', 'No se ha seleccionado ningún registro para sincronizar.');
      return;
    }

    this.app.showloader = true;

    this.administracionService.ReprocesarSincronizacion(lista)
      .subscribe(res => {

        this.app.showloader = false;

        var filter = JSON.parse(localStorage.getItem('filterSyn'));

        var fechainicio = filter.fechainicio;
        var fechafin = filter.fechafin;
        var estado = filter.estado;

        this.app.showloader = true;
      
        this.CargarGrilla(fechainicio, fechafin, estado);
       
        this.isDisabledSincronizar = true;

      });
  }

  CargarGrilla(fechainicio, fechafin, estado) {

    var api = `${HttpConst.apiUrl}`;
    var controllerName = 'Sincronizacion';

    var filtrosSyn = {
      fechainicio: fechainicio,
      fechafin: fechafin,
      estado: estado
    };
    
    localStorage.setItem('filterSyn', JSON.stringify(filtrosSyn));

    this.administracionService.BuscarVisorSincronizacion(fechainicio, fechafin, estado)
      .subscribe(res => {

        var isVisibleHeaderCheck = estado != "03" ? "hidden" : "inline";

        this.app.showloader = false;

        this.gridUpdate = {};
        var rows = [];
        var urlGenerateExport = `${api}/${controllerName}/ExportarSincronizacion/${fechainicio}/${fechafin}/${this.opcionSelecEstado}`;

        this.valueFechaDesde = null;
        this.valueFechaHasta = null;
        this.opcionSelecEstado = "00";
        
        const tamanioPagina = 15;
        const cantidadRegistro = res.length;

        if (res != null) {

          for (var j = 0; j < res.length; j++) {
            var dtoSin = res[j];
            var rowDataOutput = [];

            var disabledForState = dtoSin.estado == "Fallido" ? false : true;
            var checkedValue = dtoSin.estado == "Fallido" ? false : true;
            var checkedVisible = dtoSin.estado == "Fallido" ? "inline" : "hidden";
            var colorStyle = dtoSin.estado == "Fallido" ? "red" : "";

            rowDataOutput.push(
              {
                data: dtoSin.idDetalleProceso, Cls: 'col5p', ind: 1, valueEl: disabledForState,
                valueCompare: dtoSin.estado, valueChecked: checkedValue, visibleChecked: checkedVisible
              },
              { data: dtoSin.fecha, Cls: 'col10p', ind: 2 },
              { data: dtoSin.tipoSincronizacion, Cls: 'col10p', ind: 3 },
              { data: dtoSin.idProceso, Cls: 'col10p', ind: 4 },
              { data: dtoSin.tipoProceso, Cls: 'col25p', ind: 5 },
              { data: dtoSin.aplicacion, Cls: 'col15p', ind: 6 },
              { data: dtoSin.estado, Cls: 'col10p', ind: 7, styleColor: colorStyle },
              { data: dtoSin.observacion, Cls: 'col15p', ind: 8 },
              { data: dtoSin.data, Cls: 'col10p', ind: 9 }
            );

            rows.push({
              i: j + 1,
              key: dtoSin.idDetalleProceso,
              rowData: rowDataOutput
            });
          }

          this.gridUpdate = {
            module: "VisorSyn",
            urlExport: urlGenerateExport,
            titleFile: "Reporte Sincronizacion.xlsx",
            sizePage: tamanioPagina,
            countReg: cantidadRegistro,
            iconCount: 'iconth',
            textoNoCount: 'No se encontraron procesos para esta opción.',
            istextoNoCount: cantidadRegistro == 0 ? true : false,
            withDetail: false,
            currentPage: 1,
            columns: [
              {
                Id: 'keyProceso',
                Name: '',
                Cls: 'col5p',
                ind: 1,
                isDesign: true,
                isOrder: false,
                isValueEl: true,
                isHeaderType: true,
                isVisible: isVisibleHeaderCheck,
                Type: {
                  name: 'checkbox',
                  disabled: false,
                  useValue: true
                }
              },
              {
                Id: 'fecha',
                Name: 'Fecha',
                Cls: 'col10p',
                ind: 2,
                isDesign: false,
                isOrder: true,
                isValueEl: false,
                isContraer: false,
                isOpenModal: false,
                isTextoVer: false
              },
              {
                Id: 'tipoSincronizacion',
                Name: 'Tipo Sincronizacion',
                Cls: 'col10p',
                ind: 3,
                isDesign: false,
                isOrder: true,
                isValueEl: false,
                isContraer: false,
                isOpenModal: false,
                isTextoVer: false
              },
              {
                Id: 'idProceso',
                Name: 'IdProceso',
                Cls: 'col10p',
                ind: 4,
                isDesign: false,
                isOrder: true,
                isValueEl: false,
                isContraer: false,
                isOpenModal: false,
                isTextoVer: false
              },
              {
                Id: 'tipoProceso',
                Name: 'Tipo Proceso',
                Cls: 'col25p',
                ind: 5,
                isDesign: false,
                isOrder: true,
                isValueEl: false,
                isContraer: false,
                isOpenModal: false,
                isTextoVer: false
              },
              {
                Id: 'aplicacion',
                Name: 'Aplicacion',
                Cls: 'col15p',
                ind: 6,
                isDesign: false,
                isOrder: false,
                isValueEl: false,
                isContraer: false,
                isOpenModal: false,
                isTextoVer: false
              },
              {
                Id: 'estado',
                Name: 'Estado',
                Cls: 'col10p',
                ind: 7,
                isDesign: false,
                isOrder: false,
                isValueEl: false,
                isContraer: false,
                isOpenModal: false,
                isTextoVer: false
              },
              {
                Id: 'observacion',
                Name: 'Observación',
                Cls: 'col15p',
                ind: 8,
                isDesign: false,
                isOrder: false,
                isValueEl: false,
                isContraer: true,
                isOpenModal: true,
                isTextoVer: false
              },
              {
                Id: 'data',
                Name: 'Data',
                Cls: 'col10p',
                ind: 9,
                isDesign: false,
                isOrder: false,
                isValueEl: false,
                isContraer: false,
                isOpenModal: true,
                isTextoVer: true,
                isFormatJson: true
              }
            ],
            rows: rows,
            rowsData: rows
          };

        }

      });

  }

  synStateButton(value) {
    this.isDisabledSincronizar = value;
  }

  onBuscarClick() {
    
    localStorage.removeItem('filterSyn');
    this.isDisabledSincronizar = true;
    var cont = 0;

    cont += (this.valueFechaDesde == null ? 0 : 1);
    cont += (this.valueFechaHasta == null ? 0 : 1);
    cont += (this.opcionSelecEstado == "00" ? 0 : 1);

    if (cont == 0) {
      this.messageboxService.open('modalId', 'Advertencia', 'Debe ingresar información en campo de búsqueda.');
      return;
    }

    var fechainicio = this.valueFechaDesde == null ? '-' : this.convertDate(this.valueFechaDesde);
    var fechafin = this.valueFechaHasta == null ? '-' : this.convertDate(this.valueFechaHasta);

    if (this.valueFechaHasta != null) {
      if (fechainicio > fechafin) {
        this.messageboxService.open('modalId', 'Advertencia', 'La Fecha Desde debe ser menor a la Fecha Hasta.');
        return;
      }
    }

    this.app.showloader = true;

    var fechainicio = this.valueFechaDesde == null ? '-' : this.convertDate(this.valueFechaDesde);
    var fechafin = this.valueFechaHasta == null ? '-' : this.convertDate(this.valueFechaHasta);
    var estado = this.opcionSelecEstado;

    this.CargarGrilla(fechainicio, fechafin, estado);
  }
}
