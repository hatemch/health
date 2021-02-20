import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroDomiciliarFotoPage } from './cadastro-domiciliar-foto.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroDomiciliarFotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroDomiciliarFotoPage]
})
export class CadastroDomiciliarFotoPageModule {}
