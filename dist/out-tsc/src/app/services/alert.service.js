import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
var AlertService = /** @class */ (function () {
    function AlertService(toastController, alertCtrl, loadingCtrl) {
        this.toastController = toastController;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    AlertService.prototype.presentToast = function (message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: message,
                            duration: 2000,
                            position: 'top',
                            color: 'dark'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService.prototype.hideLoader = function (duration) {
        var _this = this;
        setTimeout(function () {
            _this.loadingCtrl.dismiss();
        }, duration);
    };
    AlertService.prototype.showLoader = function (_pMessage, duration) {
        if (_pMessage === void 0) { _pMessage = 'Carregando...'; }
        if (duration === void 0) { duration = 2000; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loaderToShow = this.loadingCtrl.create({
                    message: _pMessage,
                }).then(function (res) {
                    res.present();
                    res.onDidDismiss().then(function (dis) {
                        //console.log('Saindo... Aguarde!!!');
                    });
                });
                this.hideLoader(duration);
                return [2 /*return*/];
            });
        });
    };
    AlertService.prototype.presentAlert = function (_a) {
        var pTitle = _a.pTitle, pSubtitle = _a.pSubtitle, pMessage = _a.pMessage, _b = _a.pTextOkay, pTextOkay = _b === void 0 ? 'OK' : _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: pTitle,
                            subHeader: pSubtitle,
                            message: pMessage,
                            buttons: [pTextOkay]
                        })];
                    case 1:
                        alert = _c.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService.prototype.presentAlertConfirm = function (_a) {
        var pTitleConfirm = _a.pTitleConfirm, pMessage = _a.pMessage, _b = _a.pTextBtnCancel, pTextBtnCancel = _b === void 0 ? 'Cancelar' : _b, _c = _a.pTextOkay, pTextOkay = _c === void 0 ? 'OK' : _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: pTitleConfirm,
                            message: pMessage,
                            buttons: [
                                {
                                    text: pTextBtnCancel,
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                        return true;
                                    }
                                }, {
                                    text: pTextOkay,
                                    handler: function () {
                                        console.log('Confirm not Okay');
                                        return false;
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _d.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService.prototype.presentAlertMultipleButtons = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Alert',
                            subHeader: 'Subtitle',
                            message: 'This is an alert message.',
                            buttons: ['Cancel', 'Open Modal', 'Delete']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService.prototype.presentAlertPrompt = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Prompt!',
                            inputs: [
                                {
                                    name: 'name1',
                                    type: 'text',
                                    placeholder: 'Placeholder 1'
                                },
                                {
                                    name: 'name2',
                                    type: 'text',
                                    id: 'name2-id',
                                    value: 'hello',
                                    placeholder: 'Placeholder 2'
                                },
                                {
                                    name: 'name3',
                                    value: 'http://ionicframework.com',
                                    type: 'url',
                                    placeholder: 'Favorite site ever'
                                },
                                // input date with min & max
                                {
                                    name: 'name4',
                                    type: 'date',
                                    min: '2017-03-01',
                                    max: '2018-01-12'
                                },
                                // input date without min nor max
                                {
                                    name: 'name5',
                                    type: 'date'
                                },
                                {
                                    name: 'name6',
                                    type: 'number',
                                    min: -5,
                                    max: 10
                                },
                                {
                                    name: 'name7',
                                    type: 'number'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService.prototype.presentAlertRadio = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Radio',
                            inputs: [
                                {
                                    name: 'radio1',
                                    type: 'radio',
                                    label: 'Radio 1',
                                    value: 'value1',
                                    checked: true
                                },
                                {
                                    name: 'radio2',
                                    type: 'radio',
                                    label: 'Radio 2',
                                    value: 'value2'
                                },
                                {
                                    name: 'radio3',
                                    type: 'radio',
                                    label: 'Radio 3',
                                    value: 'value3'
                                },
                                {
                                    name: 'radio4',
                                    type: 'radio',
                                    label: 'Radio 4',
                                    value: 'value4'
                                },
                                {
                                    name: 'radio5',
                                    type: 'radio',
                                    label: 'Radio 5',
                                    value: 'value5'
                                },
                                {
                                    name: 'radio6',
                                    type: 'radio',
                                    label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
                                    value: 'value6'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService.prototype.presentAlertCheckbox = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Checkbox',
                            inputs: [
                                {
                                    name: 'checkbox1',
                                    type: 'checkbox',
                                    label: 'Checkbox 1',
                                    value: 'value1',
                                    checked: true
                                },
                                {
                                    name: 'checkbox2',
                                    type: 'checkbox',
                                    label: 'Checkbox 2',
                                    value: 'value2'
                                },
                                {
                                    name: 'checkbox3',
                                    type: 'checkbox',
                                    label: 'Checkbox 3',
                                    value: 'value3'
                                },
                                {
                                    name: 'checkbox4',
                                    type: 'checkbox',
                                    label: 'Checkbox 4',
                                    value: 'value4'
                                },
                                {
                                    name: 'checkbox5',
                                    type: 'checkbox',
                                    label: 'Checkbox 5',
                                    value: 'value5'
                                },
                                {
                                    name: 'checkbox6',
                                    type: 'checkbox',
                                    label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
                                    value: 'value6'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            AlertController,
            LoadingController])
    ], AlertService);
    return AlertService;
}());
export { AlertService };
//# sourceMappingURL=alert.service.js.map