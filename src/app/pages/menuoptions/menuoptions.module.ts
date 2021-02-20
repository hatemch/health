import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
 
import { IonicModule } from '@ionic/angular';
 
import { OptionsPage } from './menuoptions.page';
 
const routes: Routes = [
  {
    path: 'tabs',
    component: OptionsPage,
    children: [
      {
        path: 'main',
        loadChildren: '../main/principal.module#PrincipalPageModule'
      },
      {
        path: 'main/details',
        loadChildren: '../details/details.module#DetailsPageModule'
      },
      {
        path: 'config',
        loadChildren: '../config/conf.module#confPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/main',
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
  declarations: [OptionsPage]
})
export class OptionsPageModule {}
