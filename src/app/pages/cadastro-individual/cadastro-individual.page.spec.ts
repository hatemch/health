import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIndividualPage } from './cadastro-individual.page';

describe('CadastroIndividualPage', () => {
  let component: CadastroIndividualPage;
  let fixture: ComponentFixture<CadastroIndividualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroIndividualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
