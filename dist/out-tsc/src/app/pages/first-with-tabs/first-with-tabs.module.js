import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OptionsPage } from './menuoptions.page';
var routes = [
    {
        path: 'tabs',
        component: OptionsPage,
        children: [
            {
                path: 'main',
                loadChildren: '../main/principal.module#principalPageModule'
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
var OptionsPageModule = /** @class */ (function () {
    function OptionsPageModule() {
    }
    OptionsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [OptionsPage]
        })
    ], OptionsPageModule);
    return OptionsPageModule;
}());
export { OptionsPageModule };
//# sourceMappingURL=menuoptions.module.js.map