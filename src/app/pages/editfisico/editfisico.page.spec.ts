import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfisicoPage } from './editfisico.page';

describe('EditfisicoPage', () => {
  let component: EditfisicoPage;
  let fixture: ComponentFixture<EditfisicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfisicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfisicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
