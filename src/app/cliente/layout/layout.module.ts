import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { RoutesMap } from '../../core/routes.const';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DetailComponent as ClienteDetailComponent } from './detail/detail.component';
import { UpdateComponent as ClienteUpdateComponent } from './update/update.component';

import { CustomReuseStrategy } from '../../core/router/custom-reuse-strategy';
import { UnSavedChangesGuard } from '../../core/util/guards/unsavedchanges/unsavedchanges.guard';
import { AuthGuard } from '../../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    redirectTo: RoutesMap.DETAIL,
    canActivate: [AuthGuard],
  },
  {
    path: RoutesMap.DETAIL,
    component: ClienteDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: RoutesMap.EDIT,
    component: ClienteUpdateComponent,
    canDeactivate: [UnSavedChangesGuard],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ClienteDetailComponent,
    ClienteUpdateComponent,
  ],
  providers: [],
  declarations: [ClienteDetailComponent, ClienteUpdateComponent]
})
export class LayoutModule { }
