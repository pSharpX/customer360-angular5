import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../resources/animations/fadeInAnimation';

@Component({
  selector: 'app-server-error',
  templateUrl: './500.component.html',
  styleUrls: ['./500.component.css'],
  animations: [
    fadeInAnimation,
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@routeAnimation]': '' }
})
export class ServerErrorComponent implements OnInit {

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
  constructor() {
    this.pageInfo = {
      author: 'Gildemeister',
      title: 'Error en el Servidor!',
      message: {
        primary: 'Se produjo un error al intentar comunicarse con el servidor, o el Servidor no se encuentra disponible.',
        secondary: 'Por favor, contáctese con su encargado de TI si existe algún incoveniente al respecto.'
      },
      iconClass: 'fa-exclamation-triangle',
      contact: {
        name: 'Christian Rivera',
        phone: '972615761',
        iconClass: 'fa-phone'
      }
    };
  }

  ngOnInit() {
  }

}
