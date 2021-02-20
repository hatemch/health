import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AtividadeColetivaListPage } from "./atividade-coletiva-list.page";

const routes: Routes = [
  {
    path: "",
    component: AtividadeColetivaListPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AtividadeColetivaListPage],
})
export class AtividadeColetivaListPageModule {}
