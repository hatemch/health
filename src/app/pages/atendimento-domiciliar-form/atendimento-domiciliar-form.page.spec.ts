import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoDomiciliarFormPage } from './atendimento-domiciliar-form.page';

describe('AtendimentoDomiciliarFormPage', () => {
  let component: AtendimentoDomiciliarFormPage;
  let fixture: ComponentFixture<AtendimentoDomiciliarFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoDomiciliarFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoDomiciliarFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
