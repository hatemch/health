import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtendimentoIndividualIndividuosProntobookPage } from './atendimento-individual-individuos-prontobook.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoIndividualIndividuosProntobookPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtendimentoIndividualIndividuosProntobookPage]
})
export class AtendimentoIndividualIndividuosProntobookPageModule {}
