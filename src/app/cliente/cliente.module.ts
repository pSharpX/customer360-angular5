import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { RoutesMap } from '../core/routes.const';

import { MainComponent as ClienteMainComponent } from './main/main.component';
import { ListComponent as ClienteListComponent } from './list/list.component';

import { ClienteService } from './cliente.service';
import { CustomReuseStrategy } from '../core/router/custom-reuse-strategy';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';
import { GridComponent } from '../widget/grid/grid.component';
import { WidgetModule } from '../widget/widget.module';

const routes: Routes = [
  {
    path: ':id',
    canActivate: [AuthGuard],
    children: [
      {
        path: RoutesMap.HOME,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: './layout/layout.module#LayoutModule',
      },
      {
        path: RoutesMap.COTIZACIONES,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../cotizacion/cotizacion.module#CotizacionModule',
      },
      {
        path: RoutesMap.VENTAS,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../venta/venta.module#VentaModule',
      },
      {
        path: RoutesMap.PROMOCIONES,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../promocion/promocion.module#PromocionModule',
      },
      {
        path: RoutesMap.CAMPAÑAS,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../campaña/campaña.module#CampañaModule',
      },
      {
        path: RoutesMap.DESCUENTOS,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../descuento/descuento.module#DescuentoModule',
      },
      {
        path: RoutesMap.RECLAMOS,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../reclamo/reclamo.module#ReclamoModule',
      },
      {
        path: RoutesMap.CITAS,
        component: ClienteMainComponent,
        canLoad: [AuthGuard],
        loadChildren: '../cita/cita.module#CitaModule',
      },
    ],
  },
  {
    path: RoutesMap.HOME,
    component: ClienteListComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    WidgetModule
  ],
  exports: [
    ClienteMainComponent,
    ClienteListComponent
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    ClienteService,
  ],
  declarations: [ClienteMainComponent, ClienteListComponent],
  entryComponents: [GridComponent]
})
export class ClienteModule { }
