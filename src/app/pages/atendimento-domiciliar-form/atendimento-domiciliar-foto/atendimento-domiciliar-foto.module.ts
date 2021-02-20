import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtendimentoDomiciliarFotoPage } from './atendimento-domiciliar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoDomiciliarFotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtendimentoDomiciliarFotoPage]
})

export class AtendimentoDomiciliarFotoPageModule {}
