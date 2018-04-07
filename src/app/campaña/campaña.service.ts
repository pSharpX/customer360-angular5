import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CampañaModel } from './campa\u00F1a.model';
import { BaseService } from '../core/service/base.service';
import { HttpGenericService } from '../core/resources/http/http.generic.service';

@Injectable()
export class CampañaService extends BaseService {
  private $controllerName = 'Campañas';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public get(idCampaña: string): Observable<any> {
    const $resource = `${this.$controllerName}/ListarCampañas/${idCampaña}`;
    return this.httpGeneric.Get($resource);
  }
}
