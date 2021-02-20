import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDomiciliarAssinaturaPage } from './cadastro-domiciliar-assinatura.page';

describe('CadastroDomiciliarAssinaturaPage', () => {
  let component: CadastroDomiciliarAssinaturaPage;
  let fixture: ComponentFixture<CadastroDomiciliarAssinaturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDomiciliarAssinaturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDomiciliarAssinaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
