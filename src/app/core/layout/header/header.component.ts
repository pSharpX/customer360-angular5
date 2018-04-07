import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { HostBinding } from '@angular/core';
import { UserStorageService } from '../../service/user.service';
import { UserProfile } from '../../../auth/auth.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @HostBinding('class.mb-3')
  @HostBinding('class.mb-md-5') classList = true;
  // tslint:disable-next-line:no-output-rename
  @Output('collapse') notificationPanelCollapse: EventEmitter<any> = new EventEmitter<any>();

  private datoPersonal: UserProfile;
  public infoPersonal: string;
  public rolePersonal: string;

  constructor(private userStorageService: UserStorageService) {
    this.datoPersonal = this.userStorageService.getUserProfile();
    this.infoPersonal = this.datoPersonal.infoPersonal;
    this.rolePersonal = this.datoPersonal.rolePersonal;
  }

  ngOnInit() {
  }

  onNotificationPanelCollapse (event) {
    this.notificationPanelCollapse.emit(event);
  }
}
