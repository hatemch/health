import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var EnvService = /** @class */ (function () {
    function EnvService() {
        this.API_HOST = "http://200.196.251.212";
        //API_HOST = "http://192.168.0.121";
        //API_HOST = "http://192.168.15.13";  
        this.API_URL = "/ServiceEcupom/api/eCupom33";
        this.APP_NAME = "e-Cupom33";
    }
    EnvService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], EnvService);
    return EnvService;
}());
export { EnvService };
//# sourceMappingURL=env.service.js.map