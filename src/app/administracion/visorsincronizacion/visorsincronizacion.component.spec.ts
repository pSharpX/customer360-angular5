import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorsincronizacionComponent } from './visorsincronizacion.component';

describe('VisorsincronizacionComponent', () => {
  let component: VisorsincronizacionComponent;
  let fixture: ComponentFixture<VisorsincronizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorsincronizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorsincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
