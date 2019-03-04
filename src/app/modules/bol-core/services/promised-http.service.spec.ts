import { TestBed, inject } from '@angular/core/testing';

import { PromisedHttpService } from './promised-http.service';

describe('PromisedHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromisedHttpService]
    });
  });

  it('should be created', inject([PromisedHttpService], (service: PromisedHttpService) => {
    expect(service).toBeTruthy();
  }));
});
