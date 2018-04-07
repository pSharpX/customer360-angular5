import { Injectable } from '@angular/core';
import { VentaModel } from './venta.model';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../core/service/base.service';
import { HttpGenericService } from '../core/resources/http/http.generic.service';

@Injectable()
export class VentaService extends BaseService {
  private $controllerName = 'Ventas';
  private $controllerParentName = 'Clientes';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idCliente: string, idVenta: string): Observable<any> {
    const $resource = `${this.$controllerParentName}/${idCliente}/${this.$controllerName}/${idVenta}`;
    return this.httpGeneric.Get($resource);
  }

  public Listar(idCliente: string): Observable<any[]> {
    const $resource = `${this.$controllerParentName}/${idCliente}/${this.$controllerName}`;
    return this.httpGeneric.GetAll($resource);
  }

  public Buscar(idCliente: string, tipo: string, term: string): Observable<any[]> {
    const $resource = `${this.$controllerParentName}/${idCliente}/${this.$controllerName}/Buscar/${tipo}/${term}`;
    return this.httpGeneric.Search($resource);
  }

  public Exportar(idCliente: string): Observable<any> {
    const $resource = `${this.$controllerParentName}/${idCliente}/${this.$controllerName}/exportar`;
    return this.httpGeneric.GetFile($resource);
  }
}
