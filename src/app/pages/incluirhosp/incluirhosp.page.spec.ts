import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirhospPage } from './incluirhosp.page';

describe('IncluirhospPage', () => {
  let component: IncluirhospPage;
  let fixture: ComponentFixture<IncluirhospPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncluirhospPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirhospPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
