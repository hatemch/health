import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DevicesPage } from './devices.page';
var routes = [
    {
        path: '',
        component: DevicesPage
    }
];
var DevicesPageModule = /** @class */ (function () {
    function DevicesPageModule() {
    }
    DevicesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DevicesPage]
        })
    ], DevicesPageModule);
    return DevicesPageModule;
}());
export { DevicesPageModule };
//# sourceMappingURL=devices.module.js.map