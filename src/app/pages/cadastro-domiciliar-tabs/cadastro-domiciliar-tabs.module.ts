import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CadastroDomiciliarTabsPage} from './cadastro-domiciliar-tabs.page';

const routes: Routes = [
    {
        path: '',
        component: CadastroDomiciliarTabsPage,
        children: [
            {
                path: 'cadastro-domiciliar-form',
                children: [
                    {
                        path: '',
                        loadChildren: './cadastro-domiciliar-form/cadastro-domiciliar-form.module#CadastroDomiciliarFormPageModule'
                    }
                ]
            },
            {
                path: 'cadastro-domiciliar-form/:codigo',
                children: [
                    {
                        path: '',
                        loadChildren: './cadastro-domiciliar-form/cadastro-domiciliar-form.module#CadastroDomiciliarFormPageModule'
                    }
                ]
            },
            {
                path: 'cadastro-domiciliar-familias',
                children: [
                    {
                        path: '',
                        loadChildren: './cadastro-domiciliar-familias/cadastro-domiciliar-familias.module#CadastroDomiciliarFamiliasPageModule'
                    }
                ]
            },
            {
                path: 'cadastro-domiciliar-familias/:codigo',
                children: [
                    {
                        path: '',
                        loadChildren: './cadastro-domiciliar-familias/cadastro-domiciliar-familias.module#CadastroDomiciliarFamiliasPageModule'
                    }
                ]
            },
            {
                path: 'cadastro-domiciliar-foto/:codigo',
                children: [
                    {
                        path: '',
                        loadChildren: './cadastro-domiciliar-foto/cadastro-domiciliar-foto.module#CadastroDomiciliarFotoPageModule'
                    }
                ]
            },
            {
                path: 'cadastro-domiciliar-assinatura/:codigo',
                children: [
                    {
                        path: '',
                        loadChildren: './cadastro-domiciliar-assinatura/cadastro-domiciliar-assinatura.module#CadastroDomiciliarAssinaturaPageModule'
                    }
                ]
            },


            {
                path: '',
                redirectTo: '/cadastro-domiciliar-form',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CadastroDomiciliarTabsPage]
})
export class CadastroDomiciliarTabsPageModule {
}
