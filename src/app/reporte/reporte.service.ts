import { Injectable } from '@angular/core';
import { BaseService } from '../core/service/base.service';
import { HttpGenericService } from '../core/resources/http/http.generic.service';

@Injectable()
export class ReporteService extends BaseService {

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

}
