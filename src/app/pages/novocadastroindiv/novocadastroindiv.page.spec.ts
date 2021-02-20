import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovocadastroindivPage } from './novocadastroindiv.page';

describe('NovocadastroindivPage', () => {
  let component: NovocadastroindivPage;
  let fixture: ComponentFixture<NovocadastroindivPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovocadastroindivPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovocadastroindivPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
