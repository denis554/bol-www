import { TestBed, inject } from '@angular/core/testing';

import { RouterHelperService } from './router-helper.service';

describe('RouterHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterHelperService]
    });
  });

  it('should be created', inject([RouterHelperService], (service: RouterHelperService) => {
    expect(service).toBeTruthy();
  }));
});
