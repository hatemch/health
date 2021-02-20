import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoCanceladoPage } from './compromisso-cancelado.page';

describe('CancelarrdvsPage', () => {
  let component: CompromissoCanceladoPage;
  let fixture: ComponentFixture<CompromissoCanceladoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromissoCanceladoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissoCanceladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
