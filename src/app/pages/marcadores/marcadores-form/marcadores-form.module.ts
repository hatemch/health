import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MatExpansionModule} from '@angular/material/expansion';
import { MarcadoresFormPage } from './marcadores-form.page';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: MarcadoresFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    IonicSelectableModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MarcadoresFormPage]
})
export class MarcadoresFormPageModule {}
