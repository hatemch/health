import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FichaComplementarFormPage } from './ficha-complementar-form.page';
import {MatExpansionModule} from '@angular/material';
import {IonicSelectableModule} from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: FichaComplementarFormPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MatExpansionModule,
        IonicSelectableModule
    ],
  declarations: [FichaComplementarFormPage]
})
export class FichaComplementarFormPageModule {}
