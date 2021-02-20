import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanguePage } from './sangue.page';

describe('SanguePage', () => {
  let component: SanguePage;
  let fixture: ComponentFixture<SanguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanguePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
