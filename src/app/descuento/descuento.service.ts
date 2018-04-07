import { Injectable } from '@angular/core';
import { DescuentoModel } from './descuento.model';
import { Observable } from 'rxjs/Observable';
import { HttpGenericService } from '../core/resources/http/http.generic.service';
import { BaseService } from '../core/service/base.service';

@Injectable()
export class DescuentoService extends BaseService {
  private $controllerName = 'Descuentos';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idDescuento: string): Observable<any> {
    const $resource = `${this.$controllerName}/ListarDescuentos/${idDescuento}`;
    return this.httpGeneric.Get($resource);
  }
}
