import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroDomiciliarAssinaturaPage } from './cadastro-domiciliar-assinatura.page';
import {SignaturePadModule} from "angular2-signaturepad";
import {IonicSelectableModule} from "ionic-selectable";

const routes: Routes = [
  {
    path: '',
    component: CadastroDomiciliarAssinaturaPage
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
  declarations: [CadastroDomiciliarAssinaturaPage]
})
export class CadastroDomiciliarAssinaturaPageModule {}
