import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
// for install: https://www.npmjs.com/package/ts-md5
import { Md5 } from 'ts-md5/dist/md5';
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, modalController, navCtrl, alertService, env, Authorizer, db) {
        this.platform = platform;
        this.modalController = modalController;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.db = db;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.db.set('Nome', 'Gilson DeLima');
        this.db.get('Nome').then(function (Nome) {
            console.log('Olá, ' + Nome + '! Você tem um nome muito legal.');
        });
        // Uso a instrução (fetch) para pegar o ip do roteador.
        var ipAPI = 'https://api.ipify.org?format=json';
        fetch(ipAPI).then(function (response) { return response.json(); }).then(function (data) { return sessionStorage.setItem('SessionIP', data.ip); }).catch(function () { });
        // Este método retorna ON/OFF do Serviço onde esta API.
        //this.Authorizer.EngineStatusConection(this.env.API_HOST);  
        // Teste de recuperação de dados
        // Zero a SessionConection 
        sessionStorage.setItem("SessionConection", "0");
        sessionStorage.setItem('SessionUser', '');
        sessionStorage.setItem('SessionHashkey', '');
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        //console.log("ionViewWillEnter");    
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        // console.log("ionViewDidEnter");     
        setTimeout(function () {
            _this.iemail.setFocus();
        }, 150);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        console.log("ionViewWillLeave");
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        //console.log("ionViewDidLeave");
    };
    LoginPage.prototype.backButtonEvent = function () {
        this.platform.backButton.subscribe(function () {
            console.log('exit');
            navigator['app'].exitApp();
        });
    };
    LoginPage.prototype.AuthLogin = function (form) {
        var _this = this;
        //this.alertService.showLoader('Carregando... aguarde!!!');
        //this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
        //this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
        //this.alertService.presentToast("Mensagem Toast: Logando...");
        //let pwd : any = Md5.hashStr(form.value.password);
        form.value.password = Md5.hashStr(form.value.password);
        this.Authorizer.Login(form).then(function (res) {
            //console.log("Resultado Json:", res);
            var resultado = res[0];
            if (resultado.success == true) {
                _this.db.set('SessionUser', resultado.results);
                _this.db.get('SessionUser').then(function (Usuario) {
                    console.log('Usuario Logado:' + JSON.stringify(Usuario));
                });
                _this.alertService.showLoader(resultado.message);
                _this.navCtrl.navigateRoot('/menu/options');
            }
        });
    };
    tslib_1.__decorate([
        ViewChild('email'),
        tslib_1.__metadata("design:type", Object)
    ], LoginPage.prototype, "iemail", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            ModalController,
            NavController,
            AlertService,
            EnvService,
            AuthService,
            Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map