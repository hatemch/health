import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaisPage } from './hospitais.page';

describe('HospitaisPage', () => {
  let component: HospitaisPage;
  let fixture: ComponentFixture<HospitaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
