import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, alertService, env, Authorizer, Eventos, modalController) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.Eventos = Eventos;
        this.modalController = modalController;
        this.DECIMAL_SEPARATOR = ".";
        this.GROUP_SEPARATOR = ",";
        this.sexos = [
            {
                id: 1,
                sexo: 'Masculino'
            },
            {
                id: 2,
                sexo: 'Feminino'
            }
        ];
        this.RHs = [
            {
                id: 1,
                RH: 'O-'
            },
            {
                id: 2,
                RH: 'O+'
            },
            {
                id: 3,
                RH: 'B-'
            },
            {
                id: 4,
                RH: 'B+'
            },
            {
                id: 5,
                RH: 'A+'
            },
            {
                id: 6,
                RH: 'A-'
            },
            {
                id: 7,
                RH: 'AB+'
            },
            {
                id: 8,
                RH: 'AB-'
            }
        ];
    }
    RegisterPage.prototype.ngOnInit = function () {
        console.log("Init");
        this.CodigoUsuario = sessionStorage.getItem("SessionCodigoUsuario");
        this.NomeUsuarioLogado = sessionStorage.getItem("SessionNomeUsuario");
    };
    RegisterPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        console.log("ionViewWillEnter");
    };
    RegisterPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        console.log("ionViewDidEnter");
        setTimeout(function () {
            _this.iNome.setFocus();
        }, 150);
    };
    RegisterPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
        console.log("ionViewWillLeave");
    };
    RegisterPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        console.log("ionViewDidLeave");
    };
    RegisterPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    RegisterPage.prototype.Register = function (form) {
        var _this = this;
        // paramStatus: Pesquisar, Gravar, Deletar
        form.value.Senha = Md5.hashStr(form.value.Senha);
        form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
        this.Authorizer.Register(form).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.Nome = JSON.parse(resultado.results)[0].Nome;
                    _this.SobreNome = JSON.parse(resultado.results)[0].SobreNome;
                    _this.Email = JSON.parse(resultado.results)[0].Email;
                    _this.Data = JSON.parse(resultado.results)[0].Data;
                    //this.Sexo = JSON.parse(resultado.results)[0].Sexo;
                    //this.RH = JSON.parse(resultado.results)[0].RH;
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
    RegisterPage.prototype.format = function (valString) {
        if (!valString) {
            return '';
        }
        var val = valString.toString();
        var parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (parts[0].length <= 11) {
            this.maskedId = this.cpf_mask(parts[0]);
            return this.maskedId;
        }
        else {
            this.maskedId = this.cnpj(parts[0]);
            return this.maskedId;
        }
    };
    ;
    RegisterPage.prototype.unFormat = function (val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');
        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        }
        else {
            return val.replace(/\./g, '');
        }
    };
    ;
    RegisterPage.prototype.cpf_mask = function (v) {
        v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
        return v;
    };
    RegisterPage.prototype.cnpj = function (v) {
        v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
        return v;
    };
    tslib_1.__decorate([
        ViewChild('Nome'),
        tslib_1.__metadata("design:type", Object)
    ], RegisterPage.prototype, "iNome", void 0);
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            EnvService,
            AuthService,
            Events,
            ModalController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map