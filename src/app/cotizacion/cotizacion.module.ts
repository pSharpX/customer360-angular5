import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { RoutesMap} from '../core/routes.const';

import { MainComponent as CotizacionMainComponent } from './main/main.component';
import { CotizacionService } from './cotizacion.service';
import { ItemComponent as ItemCotizacionComponent } from './item/item.component';
import { ItemComponent as ItemTestDriveComponent } from './testdrive/item/item.component';
import { TestdriveService } from './testdrive/testdrive.service';
import { AuthGuard } from '../core/util/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: RoutesMap.HOME,
    component: CotizacionMainComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CotizacionMainComponent
  ],
  providers: [
    CotizacionService,
    TestdriveService
  ],
  declarations: [CotizacionMainComponent, ItemCotizacionComponent, ItemTestDriveComponent]
})
export class CotizacionModule { }
