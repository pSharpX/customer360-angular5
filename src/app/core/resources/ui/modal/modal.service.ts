import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { MessageBoxType } from '../message-box/message-box.enum';

@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) {
  }

  Open(_settings: any): Promise<any> {
    const modalRef = this.modalService.open(ModalComponent, { backdrop: 'static' });
    const activeModal: NgbActiveModal = modalRef.componentInstance.activeModal;
    if (_settings && _settings.buttons &&  (_settings.buttons instanceof Array)) {
      _settings.buttons = _settings.buttons.map(button => {
        if (button && typeof button.click === 'function') {
          const $click = button.click;
          button.click = () => {
            $click(modalRef);
          };
        }
        return button;
      });
    }
    modalRef.componentInstance.settings = _settings;

    return modalRef.result;
  }
}
