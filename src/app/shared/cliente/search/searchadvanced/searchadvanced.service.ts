import { Injectable } from '@angular/core';
import { SearchadvancedComponent } from './searchadvanced.component';

@Injectable()
export class SearchAdvancedService {
  private modals: Array<SearchadvancedComponent>;

  constructor() {
    this.modals = [];
  }

  registerModal(newModal: SearchadvancedComponent): void {
    const modal = this.findModal(newModal.modalId);

    if (modal) {
      this.modals.splice(this.modals.indexOf(modal));
    }

    this.modals.push(newModal);
  }

  open(modalId: string): void {

    const modal = this.findModal(modalId);

    if (modal) {
      modal.isOpen = true;
    }
  }

  close(modalId: string, checkBlocking = false): void {
    const modal = this.findModal(modalId);

    if (modal) {
      if (checkBlocking && modal.blocking) {
        return;
      }

      modal.isOpen = false;
    }
  }

  private findModal(modalId: string): SearchadvancedComponent {

    for (const modal of this.modals) {
      if (modal.modalId === modalId) {
        return modal;
      }
    }
    return null;
  }
}
