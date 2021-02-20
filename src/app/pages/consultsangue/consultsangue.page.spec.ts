import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsanguePage } from './consultsangue.page';

describe('ConsultsanguePage', () => {
  let component: ConsultsanguePage;
  let fixture: ComponentFixture<ConsultsanguePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultsanguePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultsanguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
