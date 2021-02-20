import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
var principalPage = /** @class */ (function () {
    function principalPage(navCtrl, alertService) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.AppName = 'Pronto Book';
        this.AppVersion = '0.0.1';
        this.AppGreetings = 'Bem-Vindos ao Pronto Book!';
    }
    principalPage.prototype.itemSelected = function (item) {
        //if(item.name ==='Produtos'){
       // this.alertService.presentToast("Acessando...: " + item.name);
        this.navCtrl.navigateRoot(item.route);
        //}
    };
    principalPage.prototype.ngOnInit = function () {
        if (!sessionStorage.SessionHashkey) {
            this.navCtrl.navigateRoot('/login');
        }
        //this.alertService.showLoader('Carregando... aguarde!!!');
        this.items = [
            {
                id: 1,
                name: "Noticias",
                icon: "assets/imgs/Produtos.png",
                route: "/login"
            }
        ];
        this.items.push({
            id: 2,
            name: "Agenda",
            icon: "assets/imgs/Consultar-Precos.png",
            route: "/login"
        });
        this.items.push({
            id: 3,
            name: "Grupos",
            icon: "assets/imgs/Promocoes.png",
            route: "/login"
        });
        this.items.push({
            id: 4,
            name: "Prontuarios",
            icon: "assets/imgs/Compras.png",
            route: "/login"
        });
        this.items.push({
            id: 5,
            name: "Exames",
            icon: "assets/imgs/Compras.png",
            route: "/login"
        });
        this.items.push({
            id: 6,
            name: "Hospitais",
            icon: "assets/imgs/Consultar-Precos.png",
            route: "/login"
        });
        this.items.push({
            id: 7,
            name: "Estatisticas",
            icon: "assets/imgs/Consultar-Precos.png",
            route: "/login"
        });
    };
    principalPage = tslib_1.__decorate([
        Component({
            selector: 'app-principal',
            templateUrl: './principal.page.html',
            styleUrls: ['./principal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService])
    ], principalPage);
    return principalPage;
}());
export { principalPage };
//# sourceMappingURL=principal.page.js.map