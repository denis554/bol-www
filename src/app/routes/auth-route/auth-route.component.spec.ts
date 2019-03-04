import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRouteComponent } from './auth-route.component';

describe('AuthRouteComponent', () => {
  let component: AuthRouteComponent;
  let fixture: ComponentFixture<AuthRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
