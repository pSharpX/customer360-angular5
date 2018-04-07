import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisorsincronizacionComponent } from './visorsincronizacion/visorsincronizacion.component';
import { SharedModule } from '../shared/shared.module';
import { RoutesMap } from '../core/routes.const';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from '../widget/widget.module';
import { GridComponent } from '../widget/grid/grid.component';
import { AdministracionService } from './administracion.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: VisorsincronizacionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    VisorsincronizacionComponent
  ],
  providers: [AdministracionService],
  declarations: [VisorsincronizacionComponent],
  entryComponents: [GridComponent]
})
export class AdministracionModule { }
