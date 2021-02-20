import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtendimentoDomiciliarIndividuosPage } from './atendimento-domiciliar-individuos.page';
import {MatExpansionModule} from '@angular/material';
import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: AtendimentoDomiciliarIndividuosPage}]),
        MatExpansionModule,
        IonicSelectableModule
    ],
  declarations: [AtendimentoDomiciliarIndividuosPage]
})
export class AtendimentoDomiciliarIndividuosPageModule {}
