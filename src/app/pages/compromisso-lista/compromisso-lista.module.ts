import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompromissoListaPage } from './compromisso-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CompromissoListaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompromissoListaPage]
})
export class CompromissoListaPageModule {}
