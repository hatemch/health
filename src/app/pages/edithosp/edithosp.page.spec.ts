import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithospPage } from './edithosp.page';

describe('EdithospPage', () => {
  let component: EdithospPage;
  let fixture: ComponentFixture<EdithospPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdithospPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdithospPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
