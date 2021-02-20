import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoIndividualIndividuosFormPage } from './atendimento-individual-individuos-form.page';

describe('AtendimentoIndividualIndividuosFormPage', () => {
  let component: AtendimentoIndividualIndividuosFormPage;
  let fixture: ComponentFixture<AtendimentoIndividualIndividuosFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoIndividualIndividuosFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoIndividualIndividuosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
