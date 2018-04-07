import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RoutesMap} from '../core/routes.const';
import { MainComponent as DescuentoMainComponent } from './main/main.component';
import { DescuentoService } from './descuento.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: DescuentoMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    DescuentoMainComponent
  ],
  providers: [
    DescuentoService
  ],
  declarations: [DescuentoMainComponent]
})
export class DescuentoModule { }
