import { TestBed, inject } from '@angular/core/testing';

import { AdministracionService } from './administracion.service';

describe('AdministracionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministracionService]
    });
  });

  it('should be created', inject([AdministracionService], (service: AdministracionService) => {
    expect(service).toBeTruthy();
  }));
});
