import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var MenuPage = /** @class */ (function () {
    function MenuPage(router) {
        var _this = this;
        this.router = router;
        this.selectedPath = '';
        this.pages = [
            {
                title: 'Menu Principal',
                url: '/menu/options',
                icon: 'menu'
            },
            {
                title: 'Perfil',
                url: '/menu/minhaconta',
                icon: 'person'
            },
            {
                title: 'Configurações',
                url: '/menu/options/tabs/config',
                icon: 'settings'
            }
        ];
        this.router.events.subscribe(function (event) {
            if (event && event.url) {
                _this.selectedPath = event.url;
            }
        });
    }
    MenuPage.prototype.ngOnInit = function () {
    };
    MenuPage = tslib_1.__decorate([
        Component({
            selector: 'app-menu',
            templateUrl: './menu.page.html',
            styleUrls: ['./menu.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], MenuPage);
    return MenuPage;
}());
export { MenuPage };
//# sourceMappingURL=menu.page.js.map