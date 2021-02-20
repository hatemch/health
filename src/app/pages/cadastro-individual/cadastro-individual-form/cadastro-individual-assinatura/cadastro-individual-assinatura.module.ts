import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroIndividualAssinaturaPage } from './cadastro-individual-assinatura.page';
import {SignaturePadModule} from "angular2-signaturepad";
import {IonicSelectableModule} from "ionic-selectable";

const routes: Routes = [
  {
    path: '',
    component: CadastroIndividualAssinaturaPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        SignaturePadModule,
        IonicSelectableModule
    ],
  declarations: [CadastroIndividualAssinaturaPage]
})
export class CadastroIndividualAssinaturaPageModule {}
