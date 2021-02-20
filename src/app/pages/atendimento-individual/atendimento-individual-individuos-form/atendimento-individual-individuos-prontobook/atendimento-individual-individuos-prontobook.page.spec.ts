import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoIndividualIndividuosProntobookPage } from './atendimento-individual-individuos-prontobook.page';

describe('AtendimentoIndividualIndividuosProntobookPage', () => {
  let component: AtendimentoIndividualIndividuosProntobookPage;
  let fixture: ComponentFixture<AtendimentoIndividualIndividuosProntobookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoIndividualIndividuosProntobookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoIndividualIndividuosProntobookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
