import { Injectable } from '@angular/core';
import { MessageBoxComponent } from './message-box.component';

declare var JQuery: any;
declare var $: any;

@Injectable()
export class MessageBoxService {
  private modals: Array<MessageBoxComponent>;

  constructor() {
    this.modals = [];
  }

  registerModal(newModal: MessageBoxComponent): void {
    const modal = this.findModal(newModal.modalId);

    if (modal) {
      this.modals.splice(this.modals.indexOf(modal));
    }

    this.modals.push(newModal);
  }

  open(modalId: string, modalTitle: string, modalbody: string): void {

    this.modals[0].modalTitle = modalTitle;
    this.modals[0].modalbody = modalbody;
    const modal = this.findModal(modalId);

    if (modal) {
      modal.isOpen = true;
    }
  }

  close(modalId: string, checkBlocking = false): void {

    $('.messageBoxAdv').attr("style", "z-index:1100");
    $("#messageboxbody").html('');
    $("#messageboxbody").attr('style', 'text-align: center');
    $('.messageBox').removeAttr("style");
    $('.messageBox .body').removeAttr("style");
    $(".messageBox").removeClass('mobilemessageBox');
    $(".messageBox").removeClass('mobilemessageBox2');

    const modal = this.findModal(modalId);

    if (modal) {
      if (checkBlocking && modal.blocking) {
        return;
      }
      modal.isOpen = false;
    }
  }

  private findModal(modalId: string): MessageBoxComponent {

    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }
}
