import { TestBed, inject } from '@angular/core/testing';

import { ReclamoService } from './reclamo.service';

describe('ReclamoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReclamoService]
    });
  });

  it('should be created', inject([ReclamoService], (service: ReclamoService) => {
    expect(service).toBeTruthy();
  }));
});
