import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
var SecondPage = /** @class */ (function () {
    function SecondPage(Authorizer, env, navCtrl) {
        this.Authorizer = Authorizer;
        this.env = env;
        this.navCtrl = navCtrl;
        this.SrcPhotoAvatar = "assets/imgs/perfil.png";
    }
    SecondPage.prototype.ngOnInit = function () {
        this.DataSet = JSON.parse(sessionStorage.SessionUser);
    };
    SecondPage = tslib_1.__decorate([
        Component({
            selector: 'app-second',
            templateUrl: './second.page.html',
            styleUrls: ['./second.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            EnvService,
            NavController])
    ], SecondPage);
    return SecondPage;
}());
export { SecondPage };
//# sourceMappingURL=second.page.js.map