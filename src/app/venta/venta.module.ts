import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent as VentaMainComponent } from './main/main.component';
import { StateComponent as VentaStateComponent } from './state/state.component';
import { DetailComponent as VentaDetailComponent } from './detail/detail.component';

import { RoutesMap } from '../core/routes.const';
import { VentaService } from './venta.service';
import { ItemComponent as ItemVentaComponent } from './item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: VentaMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':idVenta',
    children: [
      {
        path: RoutesMap.DETAIL,
        component: VentaDetailComponent
      }
    ],
    canActivateChild: [AuthGuard],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    VentaMainComponent
  ],
  providers: [
    VentaService
  ],
  declarations: [VentaMainComponent, VentaStateComponent, VentaDetailComponent, ItemVentaComponent]
})
export class VentaModule {}
