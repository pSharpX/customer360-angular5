import { Component, OnInit, Input } from '@angular/core';
import { ViewMode } from '../../item/item.component';
import { fadeInAnimation } from '../../../core/resources/animations/fadeInAnimation';
import { TestDrive } from '../../main/main.component';

@Component({
  selector: 'app-testdrive-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  animations: [
    fadeInAnimation,
  ]
})
export class ItemComponent implements OnInit {

  @Input() public defaultView = ViewMode.TABLE;
  // tslint:disable-next-line:no-input-rename
  @Input('value') item: TestDrive;

  constructor() { }

  ngOnInit() {
  }

}
