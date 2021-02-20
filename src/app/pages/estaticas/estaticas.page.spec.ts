import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstaticasPage } from './estaticas.page';

describe('EstaticasPage', () => {
  let component: EstaticasPage;
  let fixture: ComponentFixture<EstaticasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstaticasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstaticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
