import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaNomeacoesPage } from './consulta-nomeacoes.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaNomeacoesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaNomeacoesPage]
})
export class ConsultaNomeacoesPageModule {}
