import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { confPage } from './conf.page';
var routes = [
    {
        path: '',
        component: confPage
    }
];
var confPageModule = /** @class */ (function () {
    function confPageModule() {
    }
    confPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [confPage]
        })
    ], confPageModule);
    return confPageModule;
}());
export { confPageModule };
//# sourceMappingURL=conf.module.js.map