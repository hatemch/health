import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroDomiciliarPage } from './cadastro-domiciliar.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDomiciliarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroDomiciliarPage]
})
export class CadastroDomiciliarPageModule {}
