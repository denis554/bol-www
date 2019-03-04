import { TestBed, inject } from '@angular/core/testing';

import { BolCoreEventsService } from './bol-core-events.service';

describe('BolCoreEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BolCoreEventsService]
    });
  });

  it('should be created', inject([BolCoreEventsService], (service: BolCoreEventsService) => {
    expect(service).toBeTruthy();
  }));
});
