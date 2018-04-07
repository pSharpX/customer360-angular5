import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpGenericService } from '../core/resources/http/http.generic.service';
import { BaseService } from '../core/service/base.service';

@Injectable()
export class ClienteService extends BaseService {
  private $controllerName = 'Clientes';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idCliente: any): Observable<any> {
    const $resource = `${this.$controllerName}/Listar/${idCliente}`;
    return this.httpGeneric.Get($resource);
  }

  public Listar(): Observable<any[]> {
    const $resource = `${this.$controllerName}/Listar/`;
    return this.httpGeneric.GetAll($resource);
  }

  public Buscar(tipo: string, term: string): Observable<any[]> {
    const $resource = `${this.$controllerName}/BuscarClientes/${tipo}/${term}`;
    return this.httpGeneric.Search($resource);
  }

  public ListarFilterAdvanced(): Observable<any[]> {
    const $resource = `${this.$controllerName}/CargarListaFilter/`;
    return this.httpGeneric.GetAll($resource);
  }

  public BuscarAdvanced(filtro: string): Observable<any[]> {
    const $resource = `${this.$controllerName}/BuscarClientesAdvanced/${filtro}`;
    return this.httpGeneric.Search($resource);
  }

  public Modificar(cliente: any): Observable<any> {
    const $resource = `${this.$controllerName}/Actualizar/`;
    return this.httpGeneric.Update($resource, cliente);
  }

  public Nuevo(cliente: any): Observable<any> {
    const $resource = `${this.$controllerName}/Insertar/`;
    return this.httpGeneric.Create($resource, cliente);
  }

  public Eliminar(idCliente: any): Observable<any> {
    const $resource = `${this.$controllerName}/${idCliente}`;
    return this.httpGeneric.Delete($resource);
  }

}
