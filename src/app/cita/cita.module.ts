import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as CitaMainComponent } from './main/main.component';
import { CitaService } from './cita.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: CitaMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CitaMainComponent
  ],
  providers: [
    CitaService
  ],
  declarations: [CitaMainComponent]
})
export class CitaModule { }
