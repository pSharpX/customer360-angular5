import { Component, OnInit } from '@angular/core';
import { MessageBoxType } from '../message-box/message-box.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public settings: {
    title: string;
    message: string;
    buttons: Array<any>;
    type: MessageBoxType;
  };
  constructor(public activeModal: NgbActiveModal) {
    const _default = {
      title: 'Modal Title',
      message: 'On Modal Body Message',
      buttons: [
        {
          text: 'OK',
          id: 'ok_button_id',
          name: 'ok_button_name',
          className: 'btn btn-outline-success',
          click: () => {
            this.activeModal.close(true);
          }
        },
        {
          text: 'Close',
          id: 'close_button_id',
          name: 'close_button_name',
          className: 'btn btn-secondary',
          click: () => {
            this.activeModal.close(false);
          }
        }
      ],
      type: MessageBoxType.CONFIRMATION
    };
    this.settings = _default;
  }

  dismiss($reason) {
    this.activeModal.dismiss($reason);
  }

  close($reason) {
    this.activeModal.close(false);
  }

  ngOnInit() {}
}
