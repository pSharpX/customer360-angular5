import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appKeyValidator]'
})
export class KeyValidatorDirective {

  constructor() {
    console.log('creade');
   }

  @HostListener('keyup', ['$event']) onKeyPress($event) {
    console.log('dd');
  }

}
