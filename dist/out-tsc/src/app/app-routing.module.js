import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
    { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
    { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
    { path: 'recuperasenha', loadChildren: './pages/recuperasenha/recuperasenha.module#RecuperasenhaPageModule' },
    { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesPageModule' },
    { path: 'splash', loadChildren: './pages/splash/splash.module#SplashPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map