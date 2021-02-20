import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtendimentoIndividualCidadePage } from './atendimento-individual-cidade.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoIndividualCidadePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtendimentoIndividualCidadePage]
})
export class AtendimentoIndividualCidadePageModule {}
