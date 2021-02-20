import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderPage } from './atender.page';

describe('AtenderPage', () => {
  let component: AtenderPage;
  let fixture: ComponentFixture<AtenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
