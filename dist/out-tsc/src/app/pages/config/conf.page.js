import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var confPage = /** @class */ (function () {
    function confPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    confPage.prototype.ngOnInit = function () {
    };
    confPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    confPage = tslib_1.__decorate([
        Component({
            selector: 'app-conf',
            templateUrl: './conf.page.html',
            styleUrls: ['./conf.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], confPage);
    return confPage;
}());
export { confPage };
//# sourceMappingURL=conf.page.js.map