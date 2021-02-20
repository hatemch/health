import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SecondPage } from './second.page';
var routes = [
    {
        path: '',
        component: SecondPage
    }
];
var SecondPageModule = /** @class */ (function () {
    function SecondPageModule() {
    }
    SecondPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SecondPage]
        })
    ], SecondPageModule);
    return SecondPageModule;
}());
export { SecondPageModule };
//# sourceMappingURL=second.module.js.map