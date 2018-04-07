import {Component, OnInit, state} from '@angular/core';
import {Input} from '@angular/core';
import {ClienteService} from '../../../cliente/cliente.service';
import {TipoPersona} from '../../../cliente/cliente.model';
import {Cliente} from '../../../cliente/main/main.component';

@Component({
  selector: 'app-cliente-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  es_persona_juridica = false;
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
  loading = false;
  @Input('cliente')
  cliente: Cliente;

  ultimoServicio = {
    descripcion: 'Venta de repuesto HYUNDAI 2046',
    lugar: 'SEDE LOS OLIVOS',
    fecha: '01/01/2017',
    fechaUltimaActualizacion: '05/22/2017',
    estado: 'expediente'
  };

  constructor(private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.loading = true;
    this.clienteService.Obtener(this.cliente.idCliente).subscribe(
      (data) => {
        this.cliente = data;
        if (this.cliente.tipoPersona === TipoPersona.JURIDICA) {
          this.es_persona_juridica = true;
        }
    }, (err) => {
      this.error.state = true;
      this.error.codigo = err.code;
      this.error.title = err.error;
      this.error.message = err.message;
    }, () => {
      this.loading = false;
    });
  }
}
