import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { Network }      from '@ionic-native/network';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from './env.service';
//import { Base64 } from '@ionic-native/base64/ngx';
//import { Observable, throwError } from 'rxjs';
var AuthService = /** @class */ (function () {
    function AuthService(http, platform, 
    //private network: Network,      
    env, alertService) {
        this.http = http;
        this.platform = platform;
        this.env = env;
        this.alertService = alertService;
        this.headers = new Headers();
        this.isLoggedIn = false;
        /*
        CheckConnectivity() {
          this.platform.ready().then(() => {
            // if no internet, notice is a string
            if (this.network.type == 'none' ) {
              this.alertService.presentAlert({
                pTitle:'ATENÇÃO',
                pSubtitle:'Autendicação no Sistema',
                pMessage:'Não existe conexão de dados no momento. Tente novamente'
              });
            } else {
                return false;
            }
          })
        }
        */
        // função para verificar conexão de Host Engine API
        this.EngineStatusConection = function (host) {
            var started = new Date().getTime();
            var url = host;
            fetch(url).then(function (response) {
                if (response.status === 200) {
                    return response.statusText;
                }
                else {
                    throw new Error('Algo deu errado no servidor da EngineAPI!');
                }
            }).then(function (response) {
                console.debug(response);
                sessionStorage.setItem('EngineStatusConection', "ON");
                return true;
            }).catch(function (error) {
                //console.error(error);
                sessionStorage.setItem('EngineStatusConection', 'OFF');
                return false;
            });
        };
        this.Login = function (form) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ParamDataJson, strDataJson, StoreProcName, ParamHashkey, paramUrlAPI, paramsAPI, EngineAPI;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    ParamDataJson = btoa(JSON.stringify(form.value));
                    strDataJson = atob(ParamDataJson);
                    StoreProcName = "spUsuarioAuthentication";
                    ParamHashkey = sessionStorage.SessionHashkey;
                    paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/authentication?';
                    paramsAPI = "StoreProcName=" + StoreProcName + "&DataJson=" + ParamDataJson;
                    EngineAPI = paramUrlAPI + paramsAPI;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.coletionsData = _this.http.get(EngineAPI);
                            _this.coletionsData.subscribe(function (data) {
                                if (data[0].success) {
                                    //sessionStorage.setItem('SessionUser', JSON.stringify(data[0].results));
                                    sessionStorage.setItem('SessionUser', data[0].results);
                                    sessionStorage.setItem("SessionHashkey", data[0].hashkey);
                                    sessionStorage.setItem("SessionConection", "1");
                                }
                                else {
                                    sessionStorage.setItem("SessionConection", "0");
                                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Autendicação no Sistema', pMessage: data[0].message });
                                }
                                resolve(data);
                            }, function (error) {
                                _this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
                                console.log("Error: ", error);
                            });
                        })];
                });
            });
        };
        this.Register = function (form) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var StoreProcName, ParamDataJson, strDataJson, paramUrlAPI, paramsAPI, EngineAPI;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    StoreProcName = "spRegister";
                    ParamDataJson = btoa(JSON.stringify(form.value));
                    strDataJson = atob(ParamDataJson);
                    paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/register?';
                    paramsAPI = "StoreProcName=" + StoreProcName + "&DataJson=" + ParamDataJson;
                    EngineAPI = paramUrlAPI + paramsAPI;
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.coletionsData = _this.http.get(EngineAPI);
                            _this.coletionsData.subscribe(function (data) {
                                resolve(data);
                                //console.log(data);                              
                            }, function (error) {
                                _this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
                                console.log("Error: ", error);
                            });
                        })];
                });
            });
        };
        this.QueryStoreProc = function (MetodoNameAPI, StoreProcName, ParamsJson) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ParamDataJson, paramUrlAPI, paramsAPI, EngineAPI;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    ParamDataJson = btoa(JSON.stringify(ParamsJson));
                    paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + MetodoNameAPI + '?';
                    paramsAPI = "StoreProcName=" + StoreProcName + "&DataJson=" + ParamDataJson;
                    EngineAPI = paramUrlAPI + paramsAPI;
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.coletionsData = _this.http.get(EngineAPI);
                            _this.coletionsData.subscribe(function (data) {
                                resolve(data);
                            }, function (error) {
                                _this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
                                console.log("Error: ", error);
                            });
                        })];
                });
            });
        };
        this.headers.append('Content-Type', 'application/json');
    }
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Platform,
            EnvService,
            AlertService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map