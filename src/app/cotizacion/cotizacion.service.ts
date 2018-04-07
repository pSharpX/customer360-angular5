import { Injectable } from '@angular/core';
import { CotizacionModel } from './cotizacion.model';
import { HttpExtend } from '../core/resources/http/http.extend.service';
import { Observable } from 'rxjs/Observable';
import { HttpConst } from '../core/resources/http/http.const';
import { HttpGenericService } from '../core/resources/http/http.generic.service';
import { BaseService } from '../core/service/base.service';

@Injectable()
export class CotizacionService extends BaseService {
  private $controllerName = 'Cotizaciones';
  private $controllerParentName = 'Clientes';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idCliente: string, idCotizacion: string): Observable<any> {
    const $resource = `${this.$controllerParentName}/${idCliente}/${this.$controllerName}/${idCotizacion}`;
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
