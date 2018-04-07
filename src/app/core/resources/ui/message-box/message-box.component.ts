import { Component, Input, OnInit, HostListener } from '@angular/core';
import { MessageBoxService } from './message-box.service';

@Component({
  selector: 'app-modal',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  @Input() modalId: string;
  @Input() modalTitle: string;
  @Input() blocking = false;
  @Input() modalbody: string;
  isOpen = false;

  @HostListener('keyup') onMouseEnter(event) {
    this.keyup(event);
  }

  constructor(private modalService: MessageBoxService) {
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
    }
  }
}

