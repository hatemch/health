import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsanguePage } from './editsangue.page';

describe('EditsanguePage', () => {
  let component: EditsanguePage;
  let fixture: ComponentFixture<EditsanguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsanguePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsanguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
