import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Novo_compromissoPage } from './novo-compromisso.page';

describe('NovordvPage', () => {
  let component: Novo_compromissoPage;
  let fixture: ComponentFixture<Novo_compromissoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Novo_compromissoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Novo_compromissoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
