import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeColetivaFotoPage } from './atividade-coletiva-foto.page';

describe('AtividadeColetivaFotoPage', () => {
  let component: AtividadeColetivaFotoPage;
  let fixture: ComponentFixture<AtividadeColetivaFotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeColetivaFotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeColetivaFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
