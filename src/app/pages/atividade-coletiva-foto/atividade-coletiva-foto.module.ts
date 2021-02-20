import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtividadeColetivaFotoPage } from './atividade-coletiva-foto.page';

const routes: Routes = [
  {
    path: '',
    component: AtividadeColetivaFotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtividadeColetivaFotoPage]
})
export class AtividadeColetivaFotoPageModule {}
