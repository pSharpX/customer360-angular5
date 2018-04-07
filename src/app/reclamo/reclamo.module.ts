import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as ReclamoMainComponent } from './main/main.component';
import { ReclamoService } from './reclamo.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: ReclamoMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ReclamoMainComponent
  ],
  providers: [
    ReclamoService
  ],
  declarations: [ReclamoMainComponent]
})
export class ReclamoModule { }
