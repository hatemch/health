import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AtendimentoIndividualFormPage } from "./atendimento-individual-form.page";

// librerias pra funcionalidade do modulo
import { MatExpansionModule } from "@angular/material/expansion";
import { IonicSelectableModule } from "ionic-selectable";
const routes: Routes = [
  {
    path: "",
    component: AtendimentoIndividualFormPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    MatExpansionModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AtendimentoIndividualFormPage],
})
export class AtendimentoIndividualFormPageModule {}
