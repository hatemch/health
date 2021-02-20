import { AtendimentoDomiciliarPage } from './atendimento-domiciliar.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('AtendimentoDomiciliarPage', () => {
  let component: AtendimentoDomiciliarPage;
  let fixture: ComponentFixture<AtendimentoDomiciliarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoDomiciliarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoDomiciliarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
