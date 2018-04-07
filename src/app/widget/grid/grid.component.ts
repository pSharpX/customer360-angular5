import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output, } from '@angular/core';
import { GridUi, RowUi } from './gridUi';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as FileSaver from 'file-saver';
import { HttpExtend } from '../../core/resources/http/http.extend.service';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { AppComponent } from '../../app.component';
import { MessageBoxService } from '../../core/resources/ui/message-box/message-box.service';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [HttpExtend],
  animations: [
    fadeInAnimation
  ]
})
export class GridComponent implements OnInit {

  @Input() gridPersonalizada: GridUi;
  @Output() synEventChecked = new EventEmitter<any>();

  activeClass = 'nonactive';
  classOrder = 'fa fa-chevron-down ml-2 nonactive';
  checkbox = 'checkbox';
  IconUser = 'iconuser';
  IconTh = 'iconth';

  constructor(
    private httpBase: HttpExtend,
    private app: AppComponent,
    private messageboxService: MessageBoxService
  ) {

  }

  ngOnInit() {

  }

  getPaginacion(cantReg: number, tamanioPagina: number): number {

    const division: number = Math.round(cantReg / tamanioPagina);
    const tm: number = division * tamanioPagina;
    let pageTotal: number;

    if (cantReg < tm) {
      pageTotal = division;
    } else {
      if (cantReg === tm) {
        pageTotal = division;
      } else {
        pageTotal = division + 1;
      }
    }

    this.gridPersonalizada.pageTotal = pageTotal;

    return pageTotal;
  }

  getListPage(cantReg: number, tamanioPagina: number) {

    const pageTotal: number = this.getPaginacion(cantReg, tamanioPagina);
    const items: number[] = [];

    const initial = this.gridPersonalizada.currentPage === 1 ? 1 :
      this.gridPersonalizada.currentPage === pageTotal ? pageTotal - 4 : this.gridPersonalizada.currentPage - 4;

    const final = this.gridPersonalizada.currentPage === 1 ? 5 :
      this.gridPersonalizada.currentPage === pageTotal ? pageTotal : this.gridPersonalizada.currentPage + 5;

    for (let i = initial; i <= final; i++) {
      if (items.length < 5 && i <= pageTotal && i > 0) {
        items.push(i);
      }
    }

    return items;
  }

  validateType(columns: any, id: number) {

    const ind = id - 1;

    return columns[ind].isDesign;
  }

  paginationGrid(page: number) {

    const data = this.gridPersonalizada.rowsData.
      filter(data => data.i > (this.gridPersonalizada.sizePage * (page - 1))
        && data.i <= (page * this.gridPersonalizada.sizePage));

    this.gridPersonalizada.rows = data;

    this.gridPersonalizada.currentPage = page;
  }

  paginationGridPrevious() {

    const page = this.gridPersonalizada.currentPage - 1;
    this.gridPersonalizada.currentPage = (page <= 1 ? 1 : page);

    const data = this.gridPersonalizada.rowsData.
      filter(data => data.i > (this.gridPersonalizada.sizePage * (this.gridPersonalizada.currentPage - 1))
        && data.i <= (this.gridPersonalizada.currentPage * this.gridPersonalizada.sizePage));

    this.gridPersonalizada.rows = data;
  }

  paginationGridNext() {

    const page = this.gridPersonalizada.currentPage + 1;
    const pagetotal = this.gridPersonalizada.pageTotal;
    this.gridPersonalizada.currentPage = (page >= pagetotal ? pagetotal : page);

    const data = this.gridPersonalizada.rowsData.
      filter(data => data.i > (this.gridPersonalizada.sizePage * (this.gridPersonalizada.currentPage - 1))
        && data.i <= (this.gridPersonalizada.currentPage * this.gridPersonalizada.sizePage));

    this.gridPersonalizada.rows = data;
  }

  exportarExcel($event) {

    this.app.showloader = true;

    this.httpBase.getFile(this.gridPersonalizada.urlExport)
      .subscribe(fileData => {
        this.app.showloader = false;
        FileSaver.saveAs(fileData, this.gridPersonalizada.titleFile)
      });
  }

  onEventChangeForRow(i) {
    switch (this.gridPersonalizada.module) {
      case 'VisorSyn':
        this.onCheckFallidoVisorSyn(i);
        break;
    }
  }

  onEventChange() {

    switch (this.gridPersonalizada.module) {
      case 'VisorSyn':
        this.onCheckFallidoVisorSyn(null);
        break;
    }

  }

  onCheckFallidoVisorSyn(i) {

    var ischeckHeader = $('#keyProceso').prop('checked');

    const row = this.gridPersonalizada.rowsData;

    var cantFallidoWithCheck = 0;
    var rowGrid = [];
    var j = 0;

    row.forEach(x => {

      var rowDataOutput = [];
      var key;

      if (i == null) {

        x.rowData.forEach(y => {

          if (y.ind == 1) {
            key = y.data;

            if ((String)(y.valueCompare) == "Fallido") {
              rowDataOutput.push({ data: y.data, Cls: y.Cls, ind: y.ind, valueEl: y.valueEl, valueCompare: y.valueCompare, valueChecked: (ischeckHeader == y.valueChecked ? y.valueChecked : !(y.valueChecked)), visibleChecked: y.visibleChecked });
            } else {
              rowDataOutput.push({ data: y.data, Cls: y.Cls, ind: y.ind, valueEl: y.valueEl, valueCompare: y.valueCompare, valueChecked: y.valueChecked, visibleChecked: y.visibleChecked });
            }
          } else {
            rowDataOutput.push({ data: y.data, Cls: y.Cls, ind: y.ind, styleColor: y.styleColor });
          }

        });

      } else {
        if (i == x.i) {
          x.rowData.forEach(y => {

            if (y.ind == 1) {
              key = y.data;

              if ((String)(y.valueCompare) == "Fallido") {
                rowDataOutput.push({ data: y.data, Cls: y.Cls, ind: y.ind, valueEl: y.valueEl, valueCompare: y.valueCompare, valueChecked: !(y.valueChecked), visibleChecked: y.visibleChecked });
              } else {
                rowDataOutput.push({ data: y.data, Cls: y.Cls, ind: y.ind, valueEl: y.valueEl, valueCompare: y.valueCompare, valueChecked: y.valueChecked, visibleChecked: y.visibleChecked });
              }
            } else {
              rowDataOutput.push({ data: y.data, Cls: y.Cls, ind: y.ind, styleColor: y.styleColor });
            }

          });
        } else {
          rowDataOutput = x.rowData;
        }
      }

      j = j + 1;

      rowGrid.push({
        i: j,
        key: key,
        rowData: rowDataOutput
      });

    });

    this.gridPersonalizada.rowsData = rowGrid;

    const data = this.gridPersonalizada.rowsData.
      filter(data => data.i > (this.gridPersonalizada.sizePage * (this.gridPersonalizada.currentPage - 1))
        && data.i <= (this.gridPersonalizada.currentPage * this.gridPersonalizada.sizePage));

    this.gridPersonalizada.rows = data;

    rowGrid.forEach(x => {
      x.rowData.forEach(y => {
        if (y.ind == 1) {
          if ((String)(y.valueCompare) == "Fallido" && y.valueChecked == true) {
            cantFallidoWithCheck += 1;
          }
        }
      });

    });

    var isDisabledSincronizar = (cantFallidoWithCheck == 0 ? true : false);

    this.synEventChecked.emit(isDisabledSincronizar);
  }

  generatePrintJson(datos) {

    var str = '<ul>';

    for (var p in datos) {
      if (typeof datos[p] == 'string') {
        str += '<li>' + p + ': ' + datos[p] + '</li>';
      }
      else {
        str += '<li>' + p + this.generatePrintJson(datos[p]) + '</li>';
      }
    }

    str += '</ul>'

    return str;
  }


  openModalItemDetail($event, dataView, isFormatJson) {

    $('.messageBoxAdv').attr("style", "z-index:0");

    if (isFormatJson) {
      var genTable = this.generatePrintJson(JSON.parse(dataView));

      $("#messageboxbody").html(genTable);
      $("#messageboxbody").attr('style', 'text-align: left');
      $(".messageBox").attr('style', 'top:12%');
      $(".messageBox .body").attr('style', 'overflow-y: scroll;height: 457px !important;');
      $(".messageBox").addClass('mobilemessageBox');
      $(".messageBox").removeClass('mobilemessageBox2');

      this.messageboxService.open('modalId', 'Información', '');
    } else {
      $(".messageBox").attr('style', 'top:40%');
      $(".messageBox").removeClass('mobilemessageBox');
      $(".messageBox").addClass('mobilemessageBox2');
      this.messageboxService.open('modalId', 'Información', dataView);
    }

  }

  orderColumn($event, id, indice) {

    const row = this.gridPersonalizada.rowsData;
    const data: any[] = [];
    const repeatarray = [];

    row.forEach(x => {
      x.rowData.filter(z => z.ind === indice).forEach(y => {
        data.push({ name: x.key, data: (y.data == null ? '' : y.data.toString()) });
        repeatarray.push((y.data == null ? '' : y.data.toString()));
      });
    });

    if (Array.from(new Set(repeatarray)).length > 1) {

      const sortdata = data.sort(function (a, b) {

        if (!$('#' + id).hasClass('nonactive')) {

          return a.data.localeCompare(b.data);
        }

        if (!$('#' + id).hasClass('active')) {
          return b.data.localeCompare(a.data);
        }
      });

      const finaldata = [];
      let ind = 1;

      sortdata.forEach(x => {

        finaldata.push({
          i: ind,
          key: this.gridPersonalizada.rowsData.filter(y => y.key === x.name)[0].key,
          rowData: this.gridPersonalizada.rowsData.filter(y => y.key === x.name)[0].rowData
        });

        ind += 1;
      });

      const paginaactual = this.gridPersonalizada.currentPage;

      const datapagination = finaldata.
        filter(x => x.i > (this.gridPersonalizada.sizePage * (paginaactual - 1))
          && x.i <= (paginaactual * this.gridPersonalizada.sizePage));

      this.gridPersonalizada.rows = datapagination;
      this.gridPersonalizada.rowsData = finaldata;

    }

    if ($('#' + id).hasClass('nonactive')) {
      $('#' + id).addClass('fa-chevron-up');
      $('#' + id).addClass('active');
      $('#' + id).removeClass('fa-chevron-down');
      $('#' + id).removeClass('nonactive');

      return;
    }

    if ($('#' + id).hasClass('active')) {
      $('#' + id).addClass('nonactive');
      $('#' + id).removeClass('fa-chevron-up');
      $('#' + id).addClass('fa-chevron-down');
      $('#' + id).removeClass('active');

      return;
    }
  }
}
