import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as PromocionMainComponent } from './main/main.component';
import { PromocionService } from './promocion.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: PromocionMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PromocionMainComponent
  ],
  providers: [
    PromocionService
  ],
  declarations: [PromocionMainComponent]
})
export class PromocionModule { }
