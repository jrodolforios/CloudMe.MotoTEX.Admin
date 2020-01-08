import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregamentoComponent } from './carregamento.component';

describe('CarregamentoComponent', () => {
  let component: CarregamentoComponent;
  let fixture: ComponentFixture<CarregamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarregamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
