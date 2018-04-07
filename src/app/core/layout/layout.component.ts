import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('overlayState', [
      state('shown, void', style({
        opacity: '1',
        display: 'block',
      })),
      state('hidden',   style({
        opacity: '0',
        display: 'none',
      })),
      // transition('hidden <=> shown', [animate(300, style({opacity: '0', display: 'none'})), animate(300)])
      transition('shown => hidden', animate('300ms ease-in')),
      transition('hidden => shown', animate('300ms ease-out')),
    ])
  ]
})
export class LayoutComponent implements OnInit {

  public isMenuCollapsed = false;
  public isNotificationPanelCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

  onMenuCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  onNotificationPanelCollapse(event) {
    if (event) {
      event.preventDefault();
    }
    this.isNotificationPanelCollapsed = !this.isNotificationPanelCollapsed;
  }

  onCollapse() {
    if (this.isMenuCollapsed === true) {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
    if (this.isNotificationPanelCollapsed === true) {
      this.isNotificationPanelCollapsed = !this.isNotificationPanelCollapsed;
    }
  }
}
