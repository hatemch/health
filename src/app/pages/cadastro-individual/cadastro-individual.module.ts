import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroIndividualPage } from './cadastro-individual.page';
const routes: Routes = [
  {
    path: '',
    component: CadastroIndividualPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroIndividualPage]
})
export class CadastroIndividualPageModule {}
