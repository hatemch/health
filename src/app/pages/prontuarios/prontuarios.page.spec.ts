import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntuariosPage } from './prontuarios.page';

describe('ProntuariosPage', () => {
  let component: ProntuariosPage;
  let fixture: ComponentFixture<ProntuariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProntuariosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
