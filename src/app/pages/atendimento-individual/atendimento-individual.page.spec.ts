import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoIndividualPage } from './atendimento-individual.page';

describe('AtendimentoIndividualPage', () => {
  let component: AtendimentoIndividualPage;
  let fixture: ComponentFixture<AtendimentoIndividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoIndividualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
