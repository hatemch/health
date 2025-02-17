import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Consulta_nomeacoesPage } from './consulta-nomeacoes.page';

describe('ConsultrdvPage', () => {
  let component: Consulta_nomeacoesPage;
  let fixture: ComponentFixture<Consulta_nomeacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Consulta_nomeacoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Consulta_nomeacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
