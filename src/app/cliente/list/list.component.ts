import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { HttpConst } from '../../core/resources/http/http.const';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { AppComponent } from '../../app.component';
import { GridComponent } from '../../design/grid/grid.component';
import { GridUi } from '../../design/grid/gridUi';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ClienteService, GridComponent],
  animations: [
    fadeInAnimation,
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@routeAnimation]': '' }
})
export class ListComponent implements OnInit, OnDestroy {
  public isMenuCollapsed = true;
  public gridUpdate: any;
  private routerSubscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private grid: GridComponent,
    private app: AppComponent,
    private service: ClienteService, ) {

    this.app.isWarningMessage = false;

    this.gridUpdate = new GridUi();
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.loadGridUI();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onMenuCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  formattedDate(date: any) {
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    const year = String(date.getFullYear());

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return `${day}/${month}/${year}`;
  }

  searchCliente(tipo, term) {

    this.service.Buscar(tipo, term).subscribe(res => {
      this.generateGrid(res);
    });

  }

  searchClienteAdvanced(filtros) {

    this.service.BuscarAdvanced(filtros).subscribe(res => {    
      this.generateGrid(res);
    });

  }

  generateGrid(output) {

    var typeSearch = JSON.parse(localStorage.getItem('typeSearch'));
    var filter = JSON.parse(localStorage.getItem('filterCliente'));

    var api = `${HttpConst.apiUrl}`;
    var controllerName = 'Clientes';
    var urlGenerateExport = '';

    switch (typeSearch) {
      case 1:
        urlGenerateExport = `${api}/${controllerName}/ExportarClientes/${filter.tipofiltro}/${filter.textofiltro}`
        break;
      case 2:
        urlGenerateExport = `${api}/${controllerName}/ExportarClientesAdvanced/${filter}`;
        break;
    }

    this.gridUpdate = {};
    var rows = [];

    if (output != null) {
      for (var j = 0; j < output.length; j++) {
        var dtoCliente = output[j];
        var rowDataOutput = [];
        var nombreCompleto =
          dtoCliente.nombreCompleto +
          ' ' +
          dtoCliente.apellidoPaterno +
          ' ' +
          dtoCliente.apellidoMaterno;
        var ventaVehiculo = dtoCliente.ventaVehiculo;
        const servicio = dtoCliente.servicio;
        const ventaRepuesto = dtoCliente.ventaRepuesto;
        const numeroDocumento =
          dtoCliente.tipoDocumento + ' - ' + dtoCliente.numeroDocumento;
        const fechaContacto = this.formattedDate(
          new Date(dtoCliente.fechaUltimoContacto)
        );
        const idCliente = dtoCliente.idCliente;

        rowDataOutput.push(
          { data: numeroDocumento, Cls: 'col15p', ind: 1 },
          { data: nombreCompleto, Cls: 'col35p', ind: 2 },
          { data: ventaVehiculo, Cls: 'col10p', ind: 3 },
          { data: servicio, Cls: 'col10p', ind: 4 },
          { data: ventaRepuesto, Cls: 'col10p', ind: 5 },
          { data: fechaContacto, Cls: 'col10p', ind: 6 },
          { data: dtoCliente.codigoUltimoContacto, Cls: 'col10p', ind: 7 }
        );

        rows.push({
          i: j + 1,
          key: idCliente,
          rowData: rowDataOutput
        });
      }

      const tamanioPagina = 15;
      const cantidadRegistro = output.length;

      this.gridUpdate = {
        urlExport: urlGenerateExport,
        titleFile: "Reporte Clientes.xlsx",
        sizePage: tamanioPagina,
        countReg: cantidadRegistro,
        withDetail: true,
        currentPage: 1,
        iconCount: 'iconuser',
        columns: [
          {
            Id: 'numDocumento',
            Name: 'Num Doc.',
            Cls: 'col15p',
            ind: 1,
            isDesign: false,
            isOrder: true
          },
          {
            Id: 'nombreCompleto',
            Name: 'Cliente',
            Cls: 'col35p',
            ind: 2,
            isDesign: false,
            isOrder: true
          },
          {
            Id: 'ventaVehiculo',
            Name: 'Ventas Veh.',
            Cls: 'col10p',
            ind: 3,
            isDesign: true,
            isOrder: false,
            Type: {
              name: 'checkbox',
              disabled: true
            }
          },
          {
            Id: 'servicio',
            Name: 'Servicios',
            Cls: 'col10p',
            ind: 4,
            isDesign: true,
            isOrder: false,
            Type: {
              name: 'checkbox',
              disabled: true
            }
          },
          {
            Id: 'ventaRepuesto',
            Name: 'Repuestos',
            Cls: 'col10p',
            ind: 5,
            isDesign: true,
            isOrder: false,
            Type: {
              name: 'checkbox',
              disabled: true
            }
          },
          {
            Id: 'fechaUltContacto',
            Name: 'Fec. Último contacto',
            Cls: 'col10p',
            ind: 6,
            isDesign: false,
            isOrder: true
          },
          {
            Id: 'codigoUltContacto',
            Name: 'Tipo últ. Contacto',
            Cls: 'col10p',
            ind: 7,
            isDesign: false,
            isOrder: true
          }
        ],
        rows: rows,
        rowsData: rows
      };
    }

    this.app.showloader = false;
  }

  loadGridUI() {

    this.app.showloader = true;
    var typeSearch = JSON.parse(localStorage.getItem('typeSearch'));
    var filter = JSON.parse(localStorage.getItem('filterCliente'));

    switch (typeSearch) {
      case 1:

        this.searchCliente(filter.tipofiltro, filter.textofiltro);

        break;
      case 2:

        this.searchClienteAdvanced(filter);

        break;
    }
  }
}
