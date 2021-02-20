import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompromissoNaoCumpridoPage } from './compromisso-nao-cumprido.page';

const routes: Routes = [
  {
    path: '',
    component: CompromissoNaoCumpridoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompromissoNaoCumpridoPage]
})
export class CompromissoNaoCumpridoPageModule {}
