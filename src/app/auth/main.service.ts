import {Injectable} from '@angular/core';
import {BaseService} from '../core/service/base.service';
import {HttpGenericService} from '../core/resources/http/http.generic.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MainService extends BaseService {
  private $controllerName = 'Seguridad';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public ObtenerRoles(usuario: any): Observable<any> {
    const $resource = `${this.$controllerName}/ListarRoles/${usuario}`;
    return this.httpGeneric.Get($resource);
  }
}
