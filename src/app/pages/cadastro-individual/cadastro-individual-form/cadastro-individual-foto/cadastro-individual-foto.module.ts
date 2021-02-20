import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroIndividualFotoPage } from './cadastro-individual-foto.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroIndividualFotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroIndividualFotoPage]
})
export class CadastroIndividualFotoPageModule {}
