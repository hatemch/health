import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelFormPage } from './responsavel-form.page';

describe('ResponsavelFormPage', () => {
  let component: ResponsavelFormPage;
  let fixture: ComponentFixture<ResponsavelFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsavelFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsavelFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
