import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

const urlLocal: string = 'http://localhost:59654/';
const routeCliente: string = 'api/Clientes/';
const actionSearchcliente: string = 'BuscarClientes/';

@Injectable()
export class ClienteService {

  constructor(private http: Http) { }

  searchCliente(tipofiltro: string, textofiltro: string): Observable<any> {

    let url = urlLocal + routeCliente + actionSearchcliente + tipofiltro + '/' + textofiltro;

    return this.http.get(url);
  }


}
