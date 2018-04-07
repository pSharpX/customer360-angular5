import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent as ClienteSearchComponent } from './cliente/search/search.component';
import { StateComponent as ClienteStateComponent } from './cliente/state/state.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimelineComponent } from './venta/timeline/timeline.component';
import { MessageBoxComponent } from '../core/resources/ui/message-box/message-box.component';
import { SearchadvancedComponent } from './cliente/search/searchadvanced/searchadvanced.component';
import { SearchAdvancedService } from './cliente/search/searchadvanced/searchadvanced.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    SearchAdvancedService
  ],
  exports: [
    MessageBoxComponent, ClienteSearchComponent, ClienteStateComponent, SearchadvancedComponent
  ],
  declarations: [MessageBoxComponent, ClienteSearchComponent, ClienteStateComponent, TimelineComponent, SearchadvancedComponent]
})
export class SharedModule { }
