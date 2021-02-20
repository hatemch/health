import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FisicoPage } from './fisico.page';
import { TextMaskModule } from 'angular2-text-mask';

const routes: Routes = [
  {
    path: '',
    component: FisicoPage
  }
];

@NgModule({
  imports: [
    TextMaskModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FisicoPage]
})
export class FisicoPageModule {}
