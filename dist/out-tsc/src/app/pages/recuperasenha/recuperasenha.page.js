import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
var RecuperasenhaPage = /** @class */ (function () {
    function RecuperasenhaPage(navCtrl, alertService, env, Authorizer, Eventos, modalController) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.Eventos = Eventos;
        this.modalController = modalController;
    }
    RecuperasenhaPage.prototype.ngOnInit = function () {
    };
    RecuperasenhaPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        console.log("ionViewWillEnter");
    };
    RecuperasenhaPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        console.log("ionViewDidEnter");
        setTimeout(function () {
            _this.iemail.setFocus();
        }, 150);
    };
    RecuperasenhaPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        console.log("ionViewWillLeave");
    };
    RecuperasenhaPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        console.log("ionViewDidLeave");
    };
    RecuperasenhaPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    RecuperasenhaPage.prototype.MinhaConta = function (form) {
        var _this = this;
        // paramStatus: Pesquisar, Gravar, Deletar, Recupera
        form.value.Senha = Md5.hashStr(form.value.Senha);
        form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
        var params = {
            'StatusCRUD': 'Recupera',
            'formValues': form.value,
            'CodigoUsuarioSistema': 0,
            'Hashkey': ''
        };
        this.Authorizer.QueryStoreProc('MinhaConta', 'spRecuperaSenha', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.alertService.showLoader(resultado.message, 1000);
                }
                else {
                    _this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Minha Conta', pMessage: resultado.message });
                    //this.navCtrl.navigateRoot('/login');
                }
            }
            catch (err) {
                _this.alertService.presentAlert({ pTitle: _this.env.APP_NAME, pSubtitle: 'Minha Conta', pMessage: 'Nenhum usuário!' });
            }
        });
    };
    tslib_1.__decorate([
        ViewChild('email'),
        tslib_1.__metadata("design:type", Object)
    ], RecuperasenhaPage.prototype, "iemail", void 0);
    RecuperasenhaPage = tslib_1.__decorate([
        Component({
            selector: 'app-recuperasenha',
            templateUrl: './recuperasenha.page.html',
            styleUrls: ['./recuperasenha.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            EnvService,
            AuthService,
            Events,
            ModalController])
    ], RecuperasenhaPage);
    return RecuperasenhaPage;
}());
export { RecuperasenhaPage };
//# sourceMappingURL=recuperasenha.page.js.map