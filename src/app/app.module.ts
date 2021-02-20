import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {SplashPageModule} from './pages/splash/splash.module';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';

import {Camera} from '@ionic-native/Camera/ngx';
import {File} from '@ionic-native/File/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {BrMasker4Module} from 'brmasker4';
import {TextMaskModule} from 'angular2-text-mask';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResponsavelFormPageModule} from "./pages/responsavel-form/responsavel-form.module";
import {SIGTAPFormPageModule} from '././pages/sigtap-form/sigtap-form.module';
import {FotoPageModule} from './pages/foto/foto.module';
import {ProfissionaisPageModule} from "././pages/atividade-coletiva-list/atividade-coletiva-form/profissionais/profissionais.module";

// import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import {SignaturePadModule} from 'angular2-signaturepad';

@NgModule({
    declarations: [AppComponent],
    imports: [
        TextMaskModule,
        ReactiveFormsModule,
        BrMasker4Module,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        ResponsavelFormPageModule,
        SIGTAPFormPageModule,
        ProfissionaisPageModule,
        SplashPageModule,
        NgxMaskIonicModule.forRoot(),
        BrowserAnimationsModule,
        SignaturePadModule,
        FotoPageModule
    ],
    providers: [
        NgxMaskIonicModule,
        StatusBar,
        SplashScreen,
        //SplashPage,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Camera,
        File,
        WebView,
        FilePath,
        Geolocation,
        FormBuilder
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
export class ViewsModule {}
