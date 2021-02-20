import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaComplementarPage } from './ficha-complementar.page';

describe('FichaComplementarPage', () => {
  let component: FichaComplementarPage;
  let fixture: ComponentFixture<FichaComplementarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaComplementarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaComplementarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
