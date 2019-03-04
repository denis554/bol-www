import { TestBed, inject } from '@angular/core/testing';

import { GameFactoryService } from './game-factory.service';

describe('GameFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameFactoryService]
    });
  });

  it('should be created', inject([GameFactoryService], (service: GameFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
