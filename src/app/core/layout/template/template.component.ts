import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { HttpExtend } from '../../../core/resources/http/http.extend.service';
import { AuthenticationService } from '../../../core/service/authentication.service';
import { TokenKey } from '../../../core/service/tokenKey';
import { HttpConst } from '../../resources/http/http.const';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  animations: [
    trigger('overlayState', [
      state(
        'shown',
        style({
          display: 'block'
          // transform: 'translateX(50%)'
        })
      ),
      state(
        'hidden',
        style({
          display: 'none'
          // transform: 'translateX(50%)'
        })
      ),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  providers: [
    HttpExtend,
    HttpClient
  ]
})
export class TemplateComponent implements OnInit {
  public tokenSample: TokenKey;
  public isMenuCollapsed = true;
  constructor(private httpService: HttpExtend, private http: HttpClient) {}

  ngOnInit() {}

  onMenuCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  authenticate() {
    this.httpService.authenticationService.autenticarUsuario('usuario');
  }

  getToken() {
    // this.http
    //   .get(`${HttpConst.apiUrl}/Seguridad/valuetest`)
    //   .subscribe(response => {
    //     this.tokenSample = JSON.parse(
    //       localStorage.getItem(HttpConst.LOCAL_STORAGE_KEY_TOKEN)
    //     );
    //   });

    this.httpService.get(`${HttpConst.apiUrl}/Seguridad/valuetest`).subscribe((response) => {
      this.tokenSample = JSON.parse(localStorage.getItem(HttpConst.LOCAL_STORAGE_KEY_TOKEN));
      console.log(response);
    });
  }
}
