import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AtividadeColetivaIndividuoListPage } from "./atividade-coletiva-individuo-list.page";
import { IonicSelectableModule } from "ionic-selectable";
import { MatExpansionModule } from "@angular/material";

const routes: Routes = [
  {
    path: "",
    component: AtividadeColetivaIndividuoListPage,
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
  declarations: [AtividadeColetivaIndividuoListPage],
})
export class AtividadeColetivaIndividuoListPageModule {}
