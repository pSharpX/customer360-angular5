import { Injectable } from '@angular/core';
import { ReclamoModel } from './reclamo.model';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../core/service/base.service';
import { HttpGenericService } from '../core/resources/http/http.generic.service';

@Injectable()
export class ReclamoService extends BaseService {
  private $controllerName = 'Reclamos';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idReclamo: string): Observable<any> {
    const $resource = `${this.$controllerName}/ListarReclamos/${idReclamo}`;
    return this.httpGeneric.Get($resource);
  }
}
