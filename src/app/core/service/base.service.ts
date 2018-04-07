import { Injectable } from '@angular/core';
import { HttpGenericService } from '../resources/http/http.generic.service';

@Injectable()
export class BaseService {
  protected httpGeneric: HttpGenericService<any>;
  constructor(_httpGeneric: HttpGenericService<any>) {
    this.httpGeneric = _httpGeneric;
  }

  obtenerGeneros() {
    const $resource = `TablaGenerales/ListarGenero`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerEstadoCiviles() {
    const $resource = `TablaGenerales/ListarEstadoCivil`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerPaises() {
    const $resource = `Ubigeos/ListarPais`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerDepartamentos() {
    const $resource = `Ubigeos/ListarDepartamento`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerProvincias(departamento: any) {
    const $resource = `Ubigeos/ListarProvincia/${departamento}`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerDistritos(departamento: any, provincia: any) {
    const $resource = `Ubigeos/ListarDistrito/${departamento}/${provincia}`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerAsesoresComercial() {
    const $resource = `Asesores/ListarAsesorComercial`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerAsesoresComercialPorPuntoVenta(puntoVenta: any) {
    const $resource = `Asesores/ListarAsesorComercial/${puntoVenta}`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerAsesoresServicio() {
    const $resource = `Asesores/ListarAsesorServicio`;
    return this.httpGeneric.GetAll($resource);
  }

  obtenerAsesoresVenta() {
    const $resource = `Asesores/ListarAsesorVenta`;
    return this.httpGeneric.GetAll($resource);
  }
}
