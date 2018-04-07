import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as ReporteMainComponent } from './main/main.component';
import { ReporteService } from './reporte.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: ReporteMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RoutesMap.REPORTE_1,
    redirectTo: RoutesMap.HOME,
  },
  {
    path: RoutesMap.REPORTE_2,
    component: ReporteMainComponent,
  },
  {
    path: RoutesMap.REPORTE_3,
    component: ReporteMainComponent,
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ReporteMainComponent
  ],
  providers: [
    ReporteService
  ],
  declarations: [ReporteMainComponent]
})
export class ReporteModule { }
