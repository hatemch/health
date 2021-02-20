import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeColetivaIndividuoListPage } from './atividade-coletiva-individuo-list.page';

describe('AtividadeColetivaIndividuoListPage', () => {
  let component: AtividadeColetivaIndividuoListPage;
  let fixture: ComponentFixture<AtividadeColetivaIndividuoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadeColetivaIndividuoListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeColetivaIndividuoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
