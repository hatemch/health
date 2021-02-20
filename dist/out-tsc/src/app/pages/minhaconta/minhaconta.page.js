import * as tslib_1 from "tslib";
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Camera } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators';
var STORAGE_KEY = 'my_images';
var MinhaContaPage = /** @class */ (function () {
    function MinhaContaPage(navCtrl, alertService, env, Authorizer, Eventos, modalController, platform, camera, file, http, webview, actionSheetController, toastController, storage, plt, loadingController, ref, filePath) {
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.env = env;
        this.Authorizer = Authorizer;
        this.Eventos = Eventos;
        this.modalController = modalController;
        this.platform = platform;
        this.camera = camera;
        this.file = file;
        this.http = http;
        this.webview = webview;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.storage = storage;
        this.plt = plt;
        this.loadingController = loadingController;
        this.ref = ref;
        this.filePath = filePath;
        this.images = [];
        this.imageData = [];
        this.SrcPhotoAvatar = "assets/imgs/user.jpg";
    }
    MinhaContaPage.prototype.ngOnInit = function () {
        this.CodigoUsuario = JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario;
        this.NomeUsuarioLogado = JSON.parse(sessionStorage.getItem('SessionUser'))[0].Nome;
    };
    MinhaContaPage.prototype.ionViewWillEnter = function () {
        // Disparado quando o roteamento de componentes está prestes a se animar.    
        //console.log("ionViewWillEnter");
        //this.CRUDActionAPIForm('Pesquisando', null);  
    };
    MinhaContaPage.prototype.ionViewDidEnter = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.        
        this.MostraDados(JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario);
        console.log("ionViewDidEnter");
        /*
        setTimeout(() => {
          this.iNome.setFocus();
        },150);
        */
    };
    MinhaContaPage.prototype.ionViewWillLeave = function () {
        // Disparado quando o roteamento de componentes está prestes a ser animado.    
    };
    MinhaContaPage.prototype.ionViewDidLeave = function () {
        // Disparado quando o roteamento de componentes terminou de ser animado.    
        //console.log("ionViewDidLeave");    
    };
    MinhaContaPage.prototype.goBack = function () {
        this.navCtrl.back();
    };
    MinhaContaPage.prototype.MostraDados = function (CodigoUsuario) {
        var _this = this;
        // paramStatus: Pesquisando, Editando, Deletando      
        var params = {
            'StatusCRUD': 'Pesquisar',
            'formValues': '',
            'CodigoUsuarioSistema': CodigoUsuario,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
        };
        this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.Nome = JSON.parse(resultado.results)[0].Nome;
                    _this.SobreNome = JSON.parse(resultado.results)[0].SobreNome;
                    _this.Celular = JSON.parse(resultado.results)[0].Celular;
                    _this.IMEI = JSON.parse(resultado.results)[0].IMEI;
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
    MinhaContaPage.prototype.GravarDados = function (form) {
        var _this = this;
        // paramStatus: Pesquisar, Gravar, Deletar
        form.value.Senha = Md5.hashStr(form.value.Senha);
        form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
        var params = {
            'StatusCRUD': 'Gravar',
            'formValues': form.value,
            'CodigoUsuarioSistema': JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
        };
        this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(function (res) {
            var resultado = res[0];
            try {
                if (resultado.success) {
                    _this.Nome = JSON.parse(resultado.results)[0].Nome;
                    _this.SobreNome = JSON.parse(resultado.results)[0].SobreNome;
                    _this.Celular = JSON.parse(resultado.results)[0].Celular;
                    _this.IMEI = JSON.parse(resultado.results)[0].IMEI;
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
    MinhaContaPage.prototype.loadStoredImages = function () {
        var _this = this;
        this.storage.get(STORAGE_KEY).then(function (images) {
            if (images) {
                var arr = JSON.parse(images);
                _this.images = [];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var img = arr_1[_i];
                    var filePath = _this.file.dataDirectory + img;
                    var resPath = _this.pathForImage(filePath);
                    _this.images.push({ name: img, path: resPath, filePath: filePath });
                }
            }
        });
    };
    MinhaContaPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            var converted = this.webview.convertFileSrc(img);
            return converted;
        }
    };
    MinhaContaPage.prototype.presentToast = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: text,
                            position: 'bottom',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    MinhaContaPage.prototype.selectImage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Selecionar fonte da imagem",
                            buttons: [{
                                    text: 'Carregar da biblioteca de Imagens',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                },
                                {
                                    text: 'Use a Camera',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                                    }
                                },
                                {
                                    text: 'Desistir',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MinhaContaPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    MinhaContaPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (success) {
            _this.updateStoredImages(newFileName);
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    MinhaContaPage.prototype.updateStoredImages = function (name) {
        var _this = this;
        this.storage.get(STORAGE_KEY).then(function (images) {
            var arr = JSON.parse(images);
            if (!arr) {
                var newImages = [name];
                _this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
            }
            else {
                arr.push(name);
                _this.storage.set(STORAGE_KEY, JSON.stringify(arr));
            }
            var filePath = _this.file.dataDirectory + name;
            var resPath = _this.pathForImage(filePath);
            var newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            _this.images = [newEntry].concat(_this.images);
            _this.ref.detectChanges(); // trigger change detection cycle
        });
    };
    MinhaContaPage.prototype.deleteImage = function (imgEntry, position) {
        var _this = this;
        this.images.splice(position, 1);
        this.storage.get(STORAGE_KEY).then(function (images) {
            var arr = JSON.parse(images);
            var filtered = arr.filter(function (name) { return name != imgEntry.name; });
            _this.storage.set(STORAGE_KEY, JSON.stringify(filtered));
            var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
            _this.file.removeFile(correctPath, imgEntry.name).then(function (res) {
                _this.presentToast('File removed.');
            });
        });
    };
    MinhaContaPage.prototype.startUpload = function (imgEntry) {
        var _this = this;
        this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
            .then(function (entry) {
            entry.file(function (file) { return _this.readFile(file); });
        })
            .catch(function (err) {
            _this.presentToast('Error while reading file.');
        });
    };
    MinhaContaPage.prototype.readFile = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('file', imgBlob, file.name);
            _this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    };
    MinhaContaPage.prototype.uploadImageData = function (formData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                        //   content: 'Uploading image...',
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.http.post("http://localhost:8888/upload.php", formData)
                            .pipe(finalize(function () {
                            loading.dismiss();
                        }))
                            .subscribe(function (res) {
                            if (res['success']) {
                                _this.presentToast('Upload de arquivo concluído.');
                            }
                            else {
                                _this.presentToast('Falha no upload do arquivo.');
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MinhaContaPage.prototype.takePicture = function (sourceType) {
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
            console.log(err);
        });
        /*
        this.camera.getPicture(options).then(imagePath => {
          if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              });
          } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
        });
        */
    };
    tslib_1.__decorate([
        ViewChild('Nome'),
        tslib_1.__metadata("design:type", Object)
    ], MinhaContaPage.prototype, "iNome", void 0);
    MinhaContaPage = tslib_1.__decorate([
        Component({
            selector: 'app-minhaconta',
            templateUrl: './minhaconta.page.html',
            styleUrls: ['./minhaconta.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertService,
            EnvService,
            AuthService,
            Events,
            ModalController,
            Platform,
            Camera,
            File,
            HttpClient,
            WebView,
            ActionSheetController,
            ToastController,
            Storage,
            Platform,
            LoadingController,
            ChangeDetectorRef,
            FilePath])
    ], MinhaContaPage);
    return MinhaContaPage;
}());
export { MinhaContaPage };
//# sourceMappingURL=minhaconta.page.js.map