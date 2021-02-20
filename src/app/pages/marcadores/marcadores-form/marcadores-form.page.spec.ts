import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcadoresFormPage } from './marcadores-form.page';

describe('MarcadoresFormPage', () => {
  let component: MarcadoresFormPage;
  let fixture: ComponentFixture<MarcadoresFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcadoresFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcadoresFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
