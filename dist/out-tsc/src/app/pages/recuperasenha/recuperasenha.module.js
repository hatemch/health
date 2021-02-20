import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecuperasenhaPage } from './recuperasenha.page';
var routes = [
    {
        path: '',
        component: RecuperasenhaPage
    }
];
var RecuperasenhaPageModule = /** @class */ (function () {
    function RecuperasenhaPageModule() {
    }
    RecuperasenhaPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [RecuperasenhaPage]
        })
    ], RecuperasenhaPageModule);
    return RecuperasenhaPageModule;
}());
export { RecuperasenhaPageModule };
//# sourceMappingURL=recuperasenha.module.js.map