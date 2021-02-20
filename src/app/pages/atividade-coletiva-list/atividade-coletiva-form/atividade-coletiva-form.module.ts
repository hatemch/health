import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AtividadeColetivaFormPage } from "./atividade-coletiva-form.page";
import { IonicSelectableModule } from "ionic-selectable";
import { MatExpansionModule } from "@angular/material";

const routes: Routes = [
  {
    path: "",
    component: AtividadeColetivaFormPage,
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
  declarations: [AtividadeColetivaFormPage],
})
export class AtividadeColetivaFormPageModule {}
