import { Component, OnInit, Input } from '@angular/core';
import { ViewMode } from '../../cotizacion/item/item.component';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { Venta } from '../main/main.component';

@Component({
  selector: 'app-venta-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
    fadeInAnimation,
  ]
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() public defaultView = ViewMode.TABLE;
  // tslint:disable-next-line:no-input-rename
  @Input('value') item: Venta;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
