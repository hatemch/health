import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AtividadeColetivaListPage } from "./atividade-coletiva-list.page";

describe("AtividadeColetivaFormPage", () => {
  let component: AtividadeColetivaListPage;
  let fixture: ComponentFixture<AtividadeColetivaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtividadeColetivaListPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeColetivaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
