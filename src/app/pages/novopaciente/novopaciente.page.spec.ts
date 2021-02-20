import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovopacientePage } from './novopaciente.page';

describe('NovopacientePage', () => {
  let component: NovopacientePage;
  let fixture: ComponentFixture<NovopacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovopacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovopacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
