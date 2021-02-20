import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { environment } from "../../../environments/environment.prod";
var SplashPage = /** @class */ (function () {
    function SplashPage(nav, modalCtrl) {
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.logoCliente = environment.logoCliente;
        this.logoApp = environment.logoApp;
        this.appVersion = environment.AppVersion;
    }
    SplashPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.closeModal();
        }, 4000);
    };
    SplashPage.prototype.closeModal = function () {
        this.modalCtrl.dismiss();
    };
    SplashPage = tslib_1.__decorate([
        Component({
            selector: 'app-splash',
            templateUrl: './splash.page.html',
            styleUrls: ['./splash.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController])
    ], SplashPage);
    return SplashPage;
}());
export { SplashPage };
//# sourceMappingURL=splash.page.js.map