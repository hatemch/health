import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtendimentoIndividualTabsPage } from './atendimento-individual-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoIndividualTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtendimentoIndividualTabsPage]
})
export class AtendimentoIndividualTabsPageModule {}
