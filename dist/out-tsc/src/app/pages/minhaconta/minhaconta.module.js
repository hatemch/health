import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MinhaContaPage } from './minhaconta.page';
var routes = [
    {
        path: '',
        component: MinhaContaPage
    }
];
var MinhaContaPageModule = /** @class */ (function () {
    function MinhaContaPageModule() {
    }
    MinhaContaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MinhaContaPage]
        })
    ], MinhaContaPageModule);
    return MinhaContaPageModule;
}());
export { MinhaContaPageModule };
//# sourceMappingURL=minhaconta.module.js.map