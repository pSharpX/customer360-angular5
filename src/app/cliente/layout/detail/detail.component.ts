import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../../cliente.service';
import {ClienteModel, PaisConstante, TipoPersona} from '../../cliente.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
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
  es_persona_juridica = false;
  is_ubigeo_empty = true;
  cliente: {
    idCliente: any,
    nombre: string,
    nombreCompleto: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    razonSocial: string,
    tipoPersona: string,
    tipoPersonaNombre: string,
    fechaNacimiento: Date,
    correo: string,
    numeroDocumento: string,
    ruc: string,
    genero: string,
    asesor: string,
    telefono: string,
    celular: string,
    estadoCivil: string,
    direccion: string,
    distrito: string,
    codigoDistrito: any,
    provincia: string,
    codigoProvincia: any,
    departamento: string,
    codigoDepartamento: any,
    codigoPostal: string,
    pais: string,
    idPais: any,
    contactoDocumento: string,
    nombreContacto: string,
    apellidoPaternoContacto: string,
    apellidoMaternoContacto: string,
    sexoContacto: string,
    sexoContactoNombre: string,
    telefonoContacto: string,
    celularContacto: string,
    correoContacto: string
  };

  private routerParentParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private location: Location
  ) {}

  ngOnInit() {
    this.routerParentParamsSubscription = this.route.parent.params.subscribe((params) => {
      this.ObtenerCliente(params['id']);
    });
  }

  ngOnDestroy(): void {
    if (this.routerParentParamsSubscription) {
      this.routerParentParamsSubscription.unsubscribe();
    }
  }

  private ObtenerCliente(id: any) {
    this.loading = true;
    this.clienteService.Obtener(id).subscribe(
      (_cliente) => {
        this.cliente = {
          idCliente: _cliente.idCliente,
          nombre: _cliente.nombre,
          nombreCompleto: _cliente.nombreCompleto,
          numeroDocumento: _cliente.numeroDocumento,
          apellidoPaterno: _cliente.apellidoPaterno,
          apellidoMaterno: _cliente.apellidoMaterno,
          tipoPersona: _cliente.tipoPersona,
          tipoPersonaNombre: _cliente.tipoPersonaNombre,
          razonSocial: _cliente.razonSocial,
          ruc: _cliente.ruc,
          telefono: _cliente.telefono,
          celular: _cliente.celular,
          correo: _cliente.correo,
          estadoCivil: _cliente.estadoCivil,
          asesor: _cliente.asesor,
          genero: _cliente.genero,
          fechaNacimiento: _cliente.fechaNacimiento,
          direccion: _cliente.direccion,
          distrito: _cliente.distrito,
          codigoDistrito: _cliente.codigoDistrito,
          provincia: _cliente.provincia,
          codigoProvincia: _cliente.codigoProvincia,
          departamento: _cliente.departamento,
          codigoDepartamento: _cliente.codigoDepartamento,
          codigoPostal: _cliente.codigoPostal,
          pais: _cliente.pais,
          idPais: _cliente.idPais,
          contactoDocumento: _cliente.contactoDocumento,
          nombreContacto: _cliente.nombreContacto,
          apellidoPaternoContacto: _cliente.apellidoPaternoContacto,
          apellidoMaternoContacto: _cliente.apellidoMaternoContacto,
          sexoContacto : _cliente.sexoContacto,
          sexoContactoNombre: _cliente.sexoContactoNombre,
          telefonoContacto: _cliente.telefonoContacto,
          celularContacto: _cliente.celularContacto,
          correoContacto: _cliente.correoContacto
        };
        if (this.cliente.tipoPersona === TipoPersona.JURIDICA) {
          this.es_persona_juridica = true;
        }
        if (this.cliente.idPais !== PaisConstante.PERU) {
          this.is_ubigeo_empty = false;
        }
      }, (err: any) => {
        this.loading = false;
        this.error.state = true;
        this.error.codigo = err.code;
        this.error.title = err.error;
        this.error.message = err.message;
      }, () => {
        this.loading = false;
      }
    );
  }
}
