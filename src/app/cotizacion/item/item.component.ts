import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { fadeInAnimation } from '../../core/resources/animations/fadeInAnimation';
import { Cotizacion } from '../main/main.component';

export class ViewMode {
  static LIST = 'list';
  static TABLE = 'table';
  static THUMBNAIL = 'thumbnail';
}

@Component({
  selector: 'app-cotizacion-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
    fadeInAnimation,
  ]
})
export class ItemComponent implements OnInit, OnDestroy {

  @Input() public defaultView = ViewMode.TABLE;
  // tslint:disable-next-line:no-input-rename
  @Input('value') item: Cotizacion;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
