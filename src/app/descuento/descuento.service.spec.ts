import { TestBed, inject } from '@angular/core/testing';

import { DescuentoService } from './descuento.service';

describe('DescuentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DescuentoService]
    });
  });

  it('should be created', inject([DescuentoService], (service: DescuentoService) => {
    expect(service).toBeTruthy();
  }));
});
