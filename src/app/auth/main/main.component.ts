import { Component, OnDestroy, OnInit, Renderer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpConst } from '../../core/resources/http/http.const';

import { Observable } from 'rxjs/Observable';
import { MainService } from '../main.service';
import { TokenKey } from '../../core/service/tokenKey';
import { UserRol, UserProfile } from '../auth.model';
import { UserStorageService } from '../../core/service/user.service';

@Component({
  selector: 'app-auth-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor( ) {  }

  ngOnInit() {}

  ngOnDestroy(): void {  }


}
