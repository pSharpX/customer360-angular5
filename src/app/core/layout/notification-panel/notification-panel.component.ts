import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css'],
  animations: [
    trigger('notificationState', [
      state('collapsed, void', style({
        transform: 'translateX(0%)',
      })),
      state('expanded', style({
        transform: 'translateX(-100%)',
      })),
      // transition('inactive <=> active', [animate(200, style({transform: 'translateX(-250px)'})), animate(200)])
      // transition('expanded => collapsed', animate('300ms ease-in')),
      // transition('collapsed => expanded', animate('300ms ease-out')),
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
      // transition('inactive <=> active', [animate(200, style({transform: 'translateX(-250px)'})), animate(200)])
      transition('expanded => collapsed', animate('300ms ease-in')),
      transition('collapsed => expanded', animate('300ms ease-out')),
    ])
  ]
})
export class NotificationPanelComponent implements OnInit {
  @Input()
  collapsed;
  @Output()
  onCollapseEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  onCollapseSidebar() {
    this.onCollapseEvent.emit();
  }

  ngOnInit() {
    $('#notification-sidebar').mCustomScrollbar({
      theme: 'minimal'
    });
  }

}
