import { Component, OnInit, Inject } from '@angular/core';
import { Output, Input, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { jQuery } from '../../service/third-party/jquery/jquery.provider';
// import * as $ from 'jquery';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('menuState', [
      state('collapsed, void', style({ transform: 'translateX(-100%)'})),
      state('expanded', style({ transform: 'translateX(0px)'})),
    ]),
    trigger('toggleState', [
      state('expanded, void', style({
        opacity: '1',
        display: 'block',
      })),
      state('collapsed',   style({
        opacity: '0',
        display: 'none',
      })),
      transition('expanded => collapsed', animate('300ms ease-in')),
      transition('collapsed => expanded', animate('300ms ease-out')),
    ])
  ]
})
export class MenuComponent implements OnInit {

  cliente: { id: any };
  @Input()
  collapsed;
  @Output()
  onCollapseEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    @Inject(jQuery) private jquery: JQuery
  ) {
  }

  onCollapseSidebar() {
    this.onCollapseEvent.emit(null);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cliente = {
        id: params['id']
      };
   });
    $('#sidebar').mCustomScrollbar({
      theme: 'minimal'
    });
    // this.$.mCustomScrollbar({
    //   theme: 'minimal'
    // });
  }
}
