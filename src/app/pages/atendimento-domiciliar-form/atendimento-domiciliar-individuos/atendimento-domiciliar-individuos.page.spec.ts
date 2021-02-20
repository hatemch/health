import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoDomiciliarIndividuosPage } from './atendimento-domiciliar-individuos.page';

describe('Tab2Page', () => {
  let component: AtendimentoDomiciliarIndividuosPage;
  let fixture: ComponentFixture<AtendimentoDomiciliarIndividuosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentoDomiciliarIndividuosPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoDomiciliarIndividuosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
