import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoCumpridoPage } from './compromisso-cumprido.page';

describe('CumpridasrdvsPage', () => {
  let component: CompromissoCumpridoPage;
  let fixture: ComponentFixture<CompromissoCumpridoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromissoCumpridoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissoCumpridoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
