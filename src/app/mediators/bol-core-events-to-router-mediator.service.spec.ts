import { TestBed, inject } from '@angular/core/testing';

import { BolCoreEventsToRouterMediatorService } from './bol-core-events-to-router-mediator.service';

describe('BolCoreEventsToRouterMediatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BolCoreEventsToRouterMediatorService]
    });
  });

  it('should be created', inject([BolCoreEventsToRouterMediatorService], (service: BolCoreEventsToRouterMediatorService) => {
    expect(service).toBeTruthy();
  }));
});
