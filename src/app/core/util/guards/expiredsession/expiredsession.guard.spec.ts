import { TestBed, async, inject } from '@angular/core/testing';

import { ExpiredsessionGuard } from './expiredsession.guard';

describe('ExpiredsessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpiredsessionGuard]
    });
  });

  it('should ...', inject([ExpiredsessionGuard], (guard: ExpiredsessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
