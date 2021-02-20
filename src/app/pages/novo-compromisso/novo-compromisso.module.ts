import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovoCompromissoPage } from './novo-compromisso.page';

const routes: Routes = [
  {
    path: '',
    component: NovoCompromissoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovoCompromissoPage]
})
export class NovoCompromissoPageModule {}
