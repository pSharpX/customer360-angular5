import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators/take';
import { Location } from '@angular/common';
import { fadeInAnimation } from '../../../resources/animations/fadeInAnimation';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css'],
  animations: [
    fadeInAnimation,
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: { '[@routeAnimation]': '' }
})
export class PageNotFoundComponent implements OnInit {

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
      title: 'Oops! Página no encontrada (404)!',
      message: {
        primary: 'La página a la que está intentando acceder no existe.',
        // tslint:disable-next-line:max-line-length
        secondary: 'Por favor, verifique que la página se encuentre habilitada o contáctese con su encargado de TI si existe algún incoveniente al respecto.'
      },
      iconClass: 'fa-meh-o',
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
