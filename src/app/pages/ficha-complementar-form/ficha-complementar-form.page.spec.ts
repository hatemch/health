import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaComplementarFormPage } from './ficha-complementar-form.page';

describe('FichaComplementarFormPage', () => {
  let component: FichaComplementarFormPage;
  let fixture: ComponentFixture<FichaComplementarFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaComplementarFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaComplementarFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
