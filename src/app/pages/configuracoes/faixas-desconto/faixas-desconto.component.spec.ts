import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaixasDescontoComponent } from './faixas-desconto.component';

describe('FaixasDescontoComponent', () => {
  let component: FaixasDescontoComponent;
  let fixture: ComponentFixture<FaixasDescontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaixasDescontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaixasDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
