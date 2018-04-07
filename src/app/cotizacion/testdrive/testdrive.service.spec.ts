import { TestBed, inject } from '@angular/core/testing';

import { TestdriveService } from './testdrive.service';

describe('TestdriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestdriveService]
    });
  });

  it('should be created', inject([TestdriveService], (service: TestdriveService) => {
    expect(service).toBeTruthy();
  }));
});
