import { Injectable } from '@angular/core';
import { HttpExtend } from '../core/resources/http/http.extend.service';
import { Observable } from 'rxjs/Observable';
import { CitaModel } from './cita.model';
import { HttpGenericService } from '../core/resources/http/http.generic.service';
import { BaseService } from '../core/service/base.service';

@Injectable()
export class CitaService extends BaseService {
  private $controllerName = 'Citas';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idCita: string): Observable<any> {
    const $resource = `${this.$controllerName}/ListarCita/${idCita}`;
    return this.httpGeneric.Get($resource);
  }

}
