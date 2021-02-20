import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AtendimentoDomiciliarFormPage } from './atendimento-domiciliar-form.page';

const routes: Routes = [
  {
    path: 'atendimento-domiciliar-form',
    component: AtendimentoDomiciliarFormPage ,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: './tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'atendimento-domiciliar-individuos',
        children: [
          {
            path: '',
            loadChildren: './atendimento-domiciliar-individuos/atendimento-domiciliar-individuos.module#AtendimentoDomiciliarIndividuosPageModule'
          }
        ]
      },
  
      {
        path: '',
        redirectTo: '/atendimento-domiciliar-form/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/atendimento-domiciliar-form/atendimento-domiciliar-form/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtendimentoDomiciliarFormPage]
})
export class AtendimentoDomiciliarFormPageModule {}
