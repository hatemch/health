import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SplashPage } from './splash.page';
var routes = [
    {
        path: '',
        component: SplashPage
    }
];
var SplashPageModule = /** @class */ (function () {
    function SplashPageModule() {
    }
    SplashPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SplashPage]
        })
    ], SplashPageModule);
    return SplashPageModule;
}());
export { SplashPageModule };
//# sourceMappingURL=splash.module.js.map