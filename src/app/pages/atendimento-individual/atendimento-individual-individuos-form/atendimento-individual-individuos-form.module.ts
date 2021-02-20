import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AtendimentoIndividualIndividuosFormPage } from "./atendimento-individual-individuos-form.page";

// librerias pra funcionalidade do modulo
import { MatExpansionModule } from "@angular/material/expansion";
import { IonicSelectableModule } from "ionic-selectable";

const routes: Routes = [
  {
    path: "",
    component: AtendimentoIndividualIndividuosFormPage,
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
  declarations: [AtendimentoIndividualIndividuosFormPage],
})
export class AtendimentoIndividualIndividuosFormPageModule {}
