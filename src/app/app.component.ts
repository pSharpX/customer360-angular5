import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {window} from 'rxjs/operator/window';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {OnDestroy} from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [fadeInAnimation]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  title = 'app';

  public showloader = false;
  public isWarningMessage = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  constructor(private changeDref: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    this.changeDref.detectChanges();
  }


  ngOnDestroy() {
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

}
