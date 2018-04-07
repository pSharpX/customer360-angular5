import { Injectable } from '@angular/core';
import { PromocionModel } from './promocion.model';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../core/service/base.service';
import { HttpGenericService } from '../core/resources/http/http.generic.service';

@Injectable()
export class PromocionService extends BaseService {
  private $controllerName = 'Promociones';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idPromocion: string): Observable<any> {
    const $resource = `${this.$controllerName}/ListarPromociones/${idPromocion}`;
    return this.httpGeneric.Get($resource);
  }
}
