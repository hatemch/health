import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroIndividualFormPage } from './cadastro-individual-form.page';

// librerias pra funcionalidade do mat-expansion - library to function the mat-expansion
import { MatExpansionModule} from '@angular/material/expansion';

import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: CadastroIndividualFormPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicSelectableModule,
        MatExpansionModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  declarations: [CadastroIndividualFormPage]
})
export class CadastroIndividualFormPageModule {}
