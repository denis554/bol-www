import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRouteComponent } from './game-route.component';

describe('GameRouteComponent', () => {
  let component: GameRouteComponent;
  let fixture: ComponentFixture<GameRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
