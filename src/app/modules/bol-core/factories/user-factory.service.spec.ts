import { TestBed, inject } from '@angular/core/testing';

import { UserFactoryService } from './user-factory.service';

describe('UserFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFactoryService]
    });
  });

  it('should be created', inject([UserFactoryService], (service: UserFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
