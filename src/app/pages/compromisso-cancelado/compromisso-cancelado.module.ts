import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompromissoCanceladoPage } from './compromisso-cancelado.page';

const routes: Routes = [
  {
    path: '',
    component: CompromissoCanceladoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompromissoCanceladoPage]
})
export class CompromissoCanceladoPageModule {}
