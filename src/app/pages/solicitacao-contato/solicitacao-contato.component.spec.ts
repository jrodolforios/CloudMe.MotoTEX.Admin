import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoContatoComponent } from './solicitacao-contato.component';

describe('SolicitacaoContatoComponent', () => {
  let component: SolicitacaoContatoComponent;
  let fixture: ComponentFixture<SolicitacaoContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacaoContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
