import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesRouteComponent } from './games-route.component';

describe('GamesRouteComponent', () => {
  let component: GamesRouteComponent;
  let fixture: ComponentFixture<GamesRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
