import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SIGTAPFormPage } from './sigtap-form.page';

describe('SIGTAPFormPage', () => {
  let component: SIGTAPFormPage;
  let fixture: ComponentFixture<SIGTAPFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SIGTAPFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SIGTAPFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
