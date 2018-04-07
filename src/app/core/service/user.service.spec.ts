import { TestBed, inject } from '@angular/core/testing';

import { UserStorageService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStorageService]
    });
  });

  it('should be created', inject([UserStorageService], (service: UserStorageService) => {
    expect(service).toBeTruthy();
  }));
});
