import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as CampañaMainComponent } from './main/main.component';

import { CampañaService } from './campaña.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: CampañaMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CampañaMainComponent
  ],
  providers: [

  ],
  declarations: [CampañaMainComponent]
})
export class CampañaModule { }
