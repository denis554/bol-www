import { TestBed, inject } from '@angular/core/testing';

import { AppBootstrapService } from './app-bootstrap.service';

describe('AppBootstrapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppBootstrapService]
    });
  });

  it('should be created', inject([AppBootstrapService], (service: AppBootstrapService) => {
    expect(service).toBeTruthy();
  }));
});
