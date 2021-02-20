import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { principalPage } from './principal.page';
var routes = [
    {
        path: '',
        component: principalPage
    }
];
var principalPageModule = /** @class */ (function () {
    function principalPageModule() {
    }
    principalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [principalPage]
        })
    ], principalPageModule);
    return principalPageModule;
}());
export { principalPageModule };
//# sourceMappingURL=principal.module.js.map