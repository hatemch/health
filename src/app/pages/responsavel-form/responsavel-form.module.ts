import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResponsavelFormPage } from './responsavel-form.page';

const routes: Routes = [
  {
    path: '',
    component: ResponsavelFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResponsavelFormPage]
})
export class ResponsavelFormPageModule {}
