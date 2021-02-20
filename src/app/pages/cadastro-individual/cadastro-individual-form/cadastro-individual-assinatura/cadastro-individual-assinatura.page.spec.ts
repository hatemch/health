import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIndividualAssinaturaPage } from './cadastro-individual-assinatura.page';

describe('CadastroIndividualAssinaturaPage', () => {
  let component: CadastroIndividualAssinaturaPage;
  let fixture: ComponentFixture<CadastroIndividualAssinaturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroIndividualAssinaturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroIndividualAssinaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
