import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompromissoCumpridoPage } from './compromisso-cumprido.page';

const routes: Routes = [
  {
    path: '',
    component: CompromissoCumpridoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompromissoCumpridoPage]
})
export class CompromissoCumpridoPageModule {}
