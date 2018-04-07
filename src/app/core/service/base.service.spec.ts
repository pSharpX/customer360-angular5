import { TestBed, inject } from '@angular/core/testing';

import { BaseService } from './base.service';

describe('Base.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService]
    });
  });

  it('should be created', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));
});
