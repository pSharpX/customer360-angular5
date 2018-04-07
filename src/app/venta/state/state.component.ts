import { Component, OnInit, Input } from '@angular/core';
import { Venta } from '../main/main.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-venta-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  private _descripcion: string;
  // tslint:disable-next-line:no-input-rename
  @Input('value') item: Venta;

  constructor() { }

  ngOnInit() {
  }

  get descripcion() {
    this._descripcion = `${this.item.nombreMarca} ${this.item.nombreComercial}`;
    return this._descripcion;
  }

}
