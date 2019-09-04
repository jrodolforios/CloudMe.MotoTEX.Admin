import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxistasComponent } from './taxistas.component';

describe('TaxistasComponent', () => {
  let component: TaxistasComponent;
  let fixture: ComponentFixture<TaxistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
