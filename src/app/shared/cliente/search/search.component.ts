import { Component, OnInit } from '@angular/core';
import { MessageBoxComponent } from '../../../core/resources/ui/message-box/message-box.component';
import { MessageBoxService } from '../../../core/resources/ui/message-box/message-box.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { window } from 'rxjs/operators/window';
import { AppComponent } from '../../../app.component';
import { ClienteService } from '../../../cliente/cliente.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SearchAdvancedService } from './searchadvanced/searchadvanced.service';
import { GridComponent } from '../../../design/grid/grid.component';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-cliente-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ClienteService, GridComponent]
})
export class SearchComponent implements OnInit {


  opcionSeleccionado: string = '1';
  mostrarSeleccionado: string = '1';
  textoIngresado: string = '';
  minLength: number = 3;
  maxLength: number = 200;
  inputFocusClass: boolean = false;
  placeholderInput: string = 'Buscar Por Nombre';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageboxService: MessageBoxService,
    private service: ClienteService,
    private app: AppComponent,
    private searchAdvService: SearchAdvancedService
  ) {
  }

  ngOnInit() {
  }

  soloAlfanumerico(event) {

    if (event.charCode == 32) {
      return true;
    }

    var regex = new RegExp('^[a-zA-Z0-9]+$');
    var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);

    if (regex.test(str)) {
      return true;
    }

    event.preventDefault();
    return false;
  }

  focusInput(event) {
    this.inputFocusClass = true;
  }

  blurInput(event) {
    this.inputFocusClass = this.textoIngresado.length > 0 ? true : false;
  }

  changeFiltro() {

    this.textoIngresado = '';
    this.mostrarSeleccionado = this.opcionSeleccionado;

    switch (this.mostrarSeleccionado) {
      case '1':
        this.minLength = 3;
        this.maxLength = 200;
        this.placeholderInput = 'Buscar Por Nombre';
        break;
      case '3':
        this.minLength = 3;
        this.maxLength = 200;
        this.placeholderInput = 'Buscar Por Contacto';
        break;
      case '2':
        this.minLength = 3;
        this.maxLength = 14;
        this.placeholderInput = 'Buscar Por N° Documento';
        break;
      case '4':
        this.minLength = 3;
        this.maxLength = 14;
        this.placeholderInput = 'Buscar Por N° Placa';
        break;
    }

    this.inputFocusClass = false;
  }

  clickSearch() {

    if (this.textoIngresado.length === 0) {
      this.messageboxService.open('modalId', 'Advertencia', 'Debe ingresar información en campo de búsqueda.');
      return;
    }

    if (!(this.textoIngresado.length >= this.minLength && this.textoIngresado.length <= this.maxLength)) {
      return;
    }

    this.searchData();
  }

  searchData() {

    this.app.showloader = true;

    this.service.Buscar(this.mostrarSeleccionado, this.textoIngresado)
      .subscribe(res => {

        this.app.showloader = false;

        if (res.length === 0) {
          this.messageboxService.open('modalId', 'Advertencia', 'El Cliente no se encuentra registrado.');

          if (this.app.isWarningMessage) {
            return;
          }
        }

        var filtro = {
          tipofiltro: this.mostrarSeleccionado,
          textofiltro: this.textoIngresado
        };

        // localStorage.removeItem('searchCliente');
        localStorage.removeItem('filterCliente');
        localStorage.removeItem('typeSearch');
        // localStorage.setItem('searchCliente', JSON.stringify(res));
        localStorage.setItem('filterCliente', JSON.stringify(filtro));
        localStorage.setItem('typeSearch', JSON.stringify(1));
        this.router.navigate(['./clientes']);
      });
  }

  colapsarBusquedaAvanzada(event) {
    this.searchAdvService.open('modalAdvancedId');
  }

}
