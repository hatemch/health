import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoIndividualCidadePage } from './atendimento-individual-cidade.page';

describe('AtendimentoIndividualCidadePage', () => {
  let component: AtendimentoIndividualCidadePage;
  let fixture: ComponentFixture<AtendimentoIndividualCidadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoIndividualCidadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoIndividualCidadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
