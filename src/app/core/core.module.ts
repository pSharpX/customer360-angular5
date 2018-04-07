import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './layout/menu/menu.component';
import {
  NotificationPanelComponent
} from './layout/notification-panel/notification-panel.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './layout/error/404/404.component';
import { MainComponent as AuthMainComponent } from '../auth/main/main.component';
import { MainComponent } from '../main/main.component';

import { RoutesMap } from './routes.const';
import { TemplateComponent } from './layout/template/template.component';
import { ModalComponent } from './resources/ui/modal/modal.component';
import { LoadingBoxComponent } from './resources/ui/loading-box/loading-box.component';
import { MessageBoxService } from './resources/ui/message-box/message-box.service';

import { HttpExtend } from './resources/http/http.extend.service';
import { AuthenticationService } from './service/authentication.service';
import { Http } from '@angular/http/src/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpBaseInterceptor } from './resources/http/http.interceptor';
import { HttpGenericService } from './resources/http/http.generic.service';

import { SharedService } from './service/shared.service';
import { ModalService } from './resources/ui/modal/modal.service';
import { LoadingService } from './resources/ui/loading-box/loading.service';
import { KeyValidatorDirective } from './directive/key-validator.directive';
import { AuthGuard } from './util/guards/auth/auth.guard';
import { UserLoggedIn } from './util/guards/auth/UserLoggedIn';
import { UnSavedChangesGuard } from './util/guards/unsavedchanges/unsavedchanges.guard';
import { UnAuthorizedComponent } from './layout/error/401/401.component';
import { SessionExpiredComponent } from './layout/error/session/expired/expired.component';
import { ServerErrorComponent } from './layout/error/500/500.component';
import { UserStorageService } from './service/user.service';
import { ExpiredSessionGuard } from './util/guards/expiredsession/expiredsession.guard';
import { RegexService } from './util/regex/regex.service';
import { jQueryProvider } from './service/third-party/jquery/jquery.provider';
import { IUserAuthService } from './util/guards/auth/IUserAuth.service';
import { UserAuthLocalService } from './util/guards/auth/user-auth.local.service';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RoutesMap.AUTH,
    component: AuthMainComponent,
    loadChildren: '../auth/auth.module#AuthModule'
  },
  {
    path: RoutesMap.CLIENTE,
    component: LayoutComponent,
    canLoad: [AuthGuard],
    loadChildren: '../cliente/cliente.module#ClienteModule',
  },
  {
    path: RoutesMap.REPORTE,
    component: LayoutComponent,
    canLoad: [AuthGuard],
    loadChildren: '../reporte/reporte.module#ReporteModule',
  },
  {
    path: RoutesMap.ADMINISTRACION,
    component: LayoutComponent,
    canLoad: [AuthGuard],
    loadChildren: '../administracion/administracion.module#AdministracionModule'
  },
  {
    path: RoutesMap.TEMPLATE,
    component: TemplateComponent
  },
  {
    path: RoutesMap.AUTH_GUEST,
    component: UnAuthorizedComponent,
  },
  {
    path: RoutesMap.SESSION_EXPIRED,
    component: SessionExpiredComponent,
    canDeactivate: [ExpiredSessionGuard]
  },
  {
    path: RoutesMap.SERVER_ERROR,
    component: ServerErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MenuComponent,
    NotificationPanelComponent,
  ],
  providers: [
    AuthenticationService,
    UserStorageService,
    HttpExtend,
    HttpGenericService,
    MessageBoxService,
    ModalService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpBaseInterceptor,
      multi: true
    },
    {
      provide: IUserAuthService,
      useClass: UserAuthLocalService
    },
    UserLoggedIn,
    AuthGuard,
    UnSavedChangesGuard,
    ExpiredSessionGuard,
    SharedService,
    RegexService,
    // registering 3rd-party libraries
    jQueryProvider,
  ],
  entryComponents: [ModalComponent, LoadingBoxComponent],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    UnAuthorizedComponent,
    MenuComponent,
    NotificationPanelComponent,
    TemplateComponent,
    ModalComponent,
    LoadingBoxComponent,
    KeyValidatorDirective,
    SessionExpiredComponent,
    ServerErrorComponent,
  ]
})
export class CoreModule { }
