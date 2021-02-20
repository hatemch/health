import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoListaPage } from './compromisso-lista.page';

describe('RdvsPage', () => {
  let component: CompromissoListaPage;
  let fixture: ComponentFixture<CompromissoListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromissoListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
