import { TestBed, inject } from '@angular/core/testing';

import { CampañaService } from './campaña.service';

describe('CampañaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampañaService]
    });
  });

  it('should be created', inject([CampañaService], (service: CampañaService) => {
    expect(service).toBeTruthy();
  }));
});
