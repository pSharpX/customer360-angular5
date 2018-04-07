import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../resources/animations/fadeInAnimation';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './401.component.html',
  styleUrls: ['./401.component.css'],
  animations: [
    fadeInAnimation,
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@routeAnimation]': '' }
})
export class UnAuthorizedComponent implements OnInit {

  pageInfo: {
    author?: string,
    title: string,
    message?: {
      primary: string,
      secondary?: string
    },
    iconClass?: string,
    contact?: {
      name?: string,
      phone?: string,
      iconClass?: string
    }
  };
  currentView = false;
  constructor(private location: Location, private router: Router) {
    this.pageInfo = {
      author: 'Gildemeister',
      title: 'No autorizado!',
      message: {
        primary: 'No cuenta con los permisos o no está autorizado para visualizar esta página.',
        secondary: 'Por favor, contáctese con su encargado de TI si existe algún incoveniente al respecto.'
      },
      contact: {
        name: 'Christian Rivera',
        phone: '972615761',
        iconClass: 'fa-phone'
      }
    };
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
