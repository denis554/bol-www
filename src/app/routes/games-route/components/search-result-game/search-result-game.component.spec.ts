import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultGameComponent } from './search-result-game.component';

describe('SearchResultGameComponent', () => {
  let component: SearchResultGameComponent;
  let fixture: ComponentFixture<SearchResultGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
