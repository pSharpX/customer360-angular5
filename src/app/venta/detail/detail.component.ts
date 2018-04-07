import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { VentaService } from '../venta.service';
import { Location } from '@angular/common';
import { SharedService } from '../../core/service/shared.service';
import { Venta } from '../main/main.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishLast';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { Cliente } from '../../cliente/main/main.component';
import { ClienteService } from '../../cliente/cliente.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-venta-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private sharedServiceSubscription: Subscription;
  private routerSubscription: Subscription;
  private clienteSubscription: Subscription;
  private ventaSubscription: Subscription;
  private ventaServiceSubs: Subscription;
  private clienteServiceSubs: Subscription;
  private routerParamsSubscription: Subscription;

  public cliente: Cliente;
  public venta: Venta;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private clienteServicio: ClienteService,
    private ventaServicio: VentaService,
    private sharedService: SharedService
  ) {
    this.clienteSubscription = Observable.combineLatest(
      this.route.params.pluck('idVenta').take(1),
      this.route.parent.parent.params.pluck('id').take(1)
    )
    .map(_data => {
      this.venta = {
        numeroNotaPedido: _data[0]
      };
      return {
        idVenta: _data[0],
        idCliente: _data[1]
      };
    })
    .flatMap(params => {
      return <Observable<Cliente>>this.clienteServicio.Obtener(params.idCliente);
    }).subscribe((cliente: Cliente) => {
      this.cliente = cliente;
      this.ventaSubscription = this.ventaServicio.Obtener(cliente.numeroDocumento, this.venta.numeroNotaPedido)
        .subscribe((venta: Venta) => {
          this.venta = venta;
        });
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.clienteSubscription) {
      this.clienteSubscription.unsubscribe();
    }
    if (this.clienteServiceSubs) {
      this.clienteServiceSubs.unsubscribe();
    }
    if (this.clienteServicio) {
      this.clienteSubscription.unsubscribe();
    }
    if (this.ventaSubscription) {
      this.ventaSubscription.unsubscribe();
    }
  }

  goBack() {
    this.location.back();
  }

}
