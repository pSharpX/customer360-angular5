import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchadvancedComponent } from './searchadvanced.component';

describe('SearchadvancedComponent', () => {
  let component: SearchadvancedComponent;
  let fixture: ComponentFixture<SearchadvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchadvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchadvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
