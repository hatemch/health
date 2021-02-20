import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SIGTAPFormPage } from './sigtap-form.page';

const routes: Routes = [
  {
    path: '',
    component: SIGTAPFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SIGTAPFormPage]
})
export class SIGTAPFormPageModule {}
