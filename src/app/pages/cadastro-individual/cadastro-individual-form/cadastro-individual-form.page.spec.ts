import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIndividualFormPage } from './cadastro-individual-form.page';

describe('CadastroIndividualFormPage', () => {
  let component: CadastroIndividualFormPage;
  let fixture: ComponentFixture<CadastroIndividualFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroIndividualFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroIndividualFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
