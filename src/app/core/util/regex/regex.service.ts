import { Injectable } from '@angular/core';

@Injectable()
export class RegexService {

  private digitRegex = /^\d+$/;
  constructor() { }

  public IsDigit(input: string): boolean {
    return (this.digitRegex.test(input));
  }

}
