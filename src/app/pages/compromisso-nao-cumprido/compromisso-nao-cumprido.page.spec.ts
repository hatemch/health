import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoNaoCumpridoPage } from './compromisso-nao-cumprido.page';

describe('NaocumpridasrdvsPage', () => {
  let component: CompromissoNaoCumpridoPage;
  let fixture: ComponentFixture<CompromissoNaoCumpridoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromissoNaoCumpridoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissoNaoCumpridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
