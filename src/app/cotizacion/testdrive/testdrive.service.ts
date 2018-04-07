import { Injectable } from '@angular/core';
import { BaseService } from '../../core/service/base.service';
import { HttpGenericService } from '../../core/resources/http/http.generic.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestdriveService extends BaseService {
  private $controllerName = 'TestsDrive';
  private $controllerParentName = 'Clientes';

  constructor(httpGeneric: HttpGenericService<any>) {
    super(httpGeneric);
  }

  public Obtener(idCliente: string, idTestdrive: string): Observable<any> {
    const $resource = `${this.$controllerParentName}/${idCliente}/${this.$controllerName}/${idTestdrive}`;
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
