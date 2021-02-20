import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroDomiciliarFormPage } from './cadastro-domiciliar-form.page';
import { MatExpansionModule} from '@angular/material/expansion';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    MatExpansionModule,
    RouterModule.forChild([{ path: '', component: CadastroDomiciliarFormPage
    }])
  ],
  declarations: [CadastroDomiciliarFormPage]
})
export class CadastroDomiciliarFormPageModule {}
