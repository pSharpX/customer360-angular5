import { TestBed, async, inject } from '@angular/core/testing';

import { UnSavedChangesGuard } from './unsavedchanges.guard';

describe('UnsavedchangesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnSavedChangesGuard]
    });
  });

  it('should ...', inject([UnSavedChangesGuard], (guard: UnSavedChangesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
