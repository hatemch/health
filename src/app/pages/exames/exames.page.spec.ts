import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamesPage } from './exames.page';

describe('ExamesPage', () => {
  let component: ExamesPage;
  let fixture: ComponentFixture<ExamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
