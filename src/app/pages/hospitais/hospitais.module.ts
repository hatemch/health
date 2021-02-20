import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HospitaisPage } from './hospitais.page';


const routes: Routes = [
  {
    path: '',
    component: HospitaisPage,
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HospitaisPage]
})
export class HospitaisPageModule {}
