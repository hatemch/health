import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeColetivaFormPage } from './atividade-coletiva-form.page';

describe('AtividadeColetivaFormPage', () => {
  let component: AtividadeColetivaFormPage;
  let fixture: ComponentFixture<AtividadeColetivaFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeColetivaFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeColetivaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
