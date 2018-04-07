import { Injectable } from '@angular/core';
import { HttpGenericService } from '../core/resources/http/http.generic.service';
import { BaseService } from '../core/service/base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http/src/http';

@Injectable()
export class AdministracionService extends BaseService {

  private $controllerNameSin = 'Sincronizacion';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public ListarEstadoSincronizacionDetalle(): Observable<any> {
    const $resource = `${this.$controllerNameSin}/ListarEstadoSynDetalle/`;
    return this.httpGeneric.GetAll($resource);
  }

  public BuscarVisorSincronizacion(fechainicio: string, fechafin: string, codestadosyndet: string): Observable<any> {
    const $resource = `${this.$controllerNameSin}/BuscarSincronizacion/${fechainicio}/${fechafin}/${codestadosyndet}`;
    return this.httpGeneric.GetAll($resource);
  }

  public ReprocesarSincronizacion(listaid: string): Observable<any> {
    const $resource = `${this.$controllerNameSin}/Reprocesar/${listaid}`;
    return this.httpGeneric.Update($resource, null);
  }

}
