import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavController, Platform} from "@ionic/angular";
import {Camera, CameraOptions} from '@ionic-native/Camera/ngx';
import {File, FileEntry} from "@ionic-native/File/ngx";
import {ActivatedRoute, Router} from "@angular/router";
//MODELS
import {CadastroDomiciliarFoto} from "../../../models/CadastroDomiciliarFoto";
//SERVICES
import {AuthService} from "../../../services/auth.service";
import {EnvService} from "../../../services/env.service";
import {AlertService} from "../../../services/alert.service";

import {FotoPage} from "../../foto/foto.page";


@Component({
    selector: 'app-cadastro-domiciliar-foto',
    templateUrl: './cadastro-domiciliar-foto.page.html',
    styleUrls: ['./cadastro-domiciliar-foto.page.scss'],
})
export class CadastroDomiciliarFotoPage implements OnInit {
    @ViewChild('inputcamera') cameraInput: ElementRef;
    @ViewChild('inputGallery') galleryInput: ElementRef;
    @ViewChild('imgresult') imgResult: ElementRef;


    public subtitle = 'Cadastro Domiciliar Foto';

    public model: CadastroDomiciliarFoto = new CadastroDomiciliarFoto();
    public collectionFilter: CadastroDomiciliarFoto[];

    public fotos: Array<CadastroDomiciliarFoto> = [];
    public foto: Array<any> = [];
    public fotoSave: Array<any> = [];
    state: any = {};
    public imageFileBase64: any;
    public imageFile: any;
    public showWebVersion: boolean = true;

    private permissoes = {
        Route: '',
        Pesquisar: 1,
        Inserir: 1,
        Editar: 1,
        Deletar: 1
    };


    constructor(
        private navCtrl: NavController,
        private camera: Camera,
        private file: File,
        private Authorizer: AuthService,
        private env: EnvService,
        private alertService: AlertService,
        private router: Router,
        private plt: Platform,
        public activatedRoute: ActivatedRoute,
        public modalCtrl: ModalController,
    ) {
    }

    ionViewDidEnter() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        if (this.plt.is('cordova')) {
            this.showWebVersion = false;
        } else {
            this.showWebVersion = true;
        }

        // Disparado quando o roteamento de componentes terminou de ser animado.
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        }
        const element = this.cameraInput.nativeElement as HTMLInputElement;

        this.imageFileBase64 = null;
        this.imageFile = null;
        element.onchange = () => {

            // Depois colocar um loading aqui!!!
            const reader = new FileReader();
            reader.onload = (r: any) => {
                this.imageFileBase64 = r.target.result as string; //MEU JC
                this.foto.push(this.imageFileBase64)
            };

            reader.readAsDataURL(element.files[0]);

            this.imageFile = element.files[0];
            this.fotoSave.push(this.imageFile);

        };
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((res) => {
            this.model.tipo = '1';
            this.model.cadastro_domiciliar = res.codigo;
            this.CRUDCadastroDomiciliarFotos('spCRUDCadastroDomiciliarFoto', 'READ', {
                cadastro_domiciliar: this.model.cadastro_domiciliar,
                tipo: this.model.tipo
            });
        });
    }

    private sendRequest(
        procedure: string,
        params: { StatusCRUD: string; formValues: any; },
        next: any) {
        if (
            ((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0)) ||
            ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
            //  ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
            // || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
        ) {
            const _params = {
                StatusCRUD: params.StatusCRUD,
                formValues: params.formValues,
                CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
                Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
            }

            this.Authorizer.QueryStoreProc('ExecutarPost', procedure, _params).then(res => {
                const resultado: any = res[0];
                try {
                    if (resultado.success) {
                        next(resultado);
                        this.alertService.showLoader(resultado.message, 1000);
                    } else {
                        this.alertService.presentAlert({
                            pTitle: 'ATENÇÃO',
                            pSubtitle: this.subtitle,
                            pMessage: resultado.message
                        });
                        this.navCtrl.back();
                    }
                } catch (err) {
                    this.alertService.presentAlert({
                        pTitle: this.env.AppNameSigla,
                        pSubtitle: this.subtitle,
                        pMessage: 'Erro ao fazer a petição'
                    });
                }
            });
        } else {
            this.alertService.presentAlert({
                pTitle: 'SEM PERMISSÃO',
                pSubtitle: this.subtitle,
                pMessage: 'Você não tem permissão para esta ação'
            });
        }
    }

    public setFunctionCamera(srcType) {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: srcType,
            correctOrientation: true
        }
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
                entry.file(file => {
                    this.readFile(file);
                });
            });

        }, (err) => {
            this.alertService.presentAlert({
                pTitle: this.env.AppNameSigla,
                pSubtitle: this.subtitle,
                pMessage: 'Erro ao fazer a petição camera'
            });
        });
    }

    CRUDCadastroDomiciliarFotos(storeProcedure: string, statusCRUD: string, formValues: any) {
        this.sendRequest(storeProcedure, {
            StatusCRUD: statusCRUD,
            formValues: formValues
        }, (resultado) => {
            switch (statusCRUD) {
                case 'CREATE':
                    this.CRUDCadastroDomiciliarFotos('spCRUDCadastroDomiciliarFoto', 'READ', {
                        cadastro_domiciliar: this.model.cadastro_domiciliar,
                        tipo: this.model.tipo
                    });
                    this.foto = [];
                    break;
                case 'READ':
                    this.fotos = (JSON.parse(atob(resultado.results)));
                    for (let foto of this.fotos) {
                        foto.foto_url = this.env.API_NAME + foto.foto_url;
                        console.log('URL', this.model.foto_url);
                    }
                    break;
                default:
                // code block
            }
        });
    }

    salvarImagem(formData: FormData) {
        this.Authorizer.QueryStoreImagem('SalvarImagem', '', this.env.IMAGE_PRODUCT, formData).then(res => {
            let resultado: any = res[0];
            if (resultado.success) {
                // resultado.results // This is the complete path. Ejemplo: ""D:/web/ServiceSaude/uploads/imagems/fotos/lxe0mwqxjxx.jpg"
                let imagepath = res[0].results;

                this.model.tipo = '1'; // for 1 because is foto 2 is tipo asinatura
                this.model.foto_url = imagepath;
                this.CRUDCadastroDomiciliarFotos('spCRUDCadastroDomiciliarFoto', 'CREATE', this.model);
            } else {
                this.alertService.showLoader(res[0].message, 2000);
            }
        });
    }

    public openCamera() {
        if (this.getLimit() === false) {
            this.setFunctionCamera(this.camera.PictureSourceType.CAMERA);
        } else {
            this.alertService.presentToast('Número máximo de fotos (3) já atingido. Operação cancelada!');
        }

    }

    public openGallery() {
        if (this.getLimit() === false) {
            this.setFunctionCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
        } else {
            this.alertService.presentToast('Número máximo de fotos (3) já atingido. Operação cancelada!');
        }

    }

    readFile(file: any) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const formImagem = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formImagem.append("nome", '');
            formImagem.append("ruta", this.env.IMAGE_PRODUCT);
            formImagem.append("imagem", imgBlob, file.name);
            this.salvarImagem(formImagem);
        };
        reader.readAsArrayBuffer(file);
    }


    goBack() {
        this.router.navigate(['/cadastro-domiciliar']);
    }

    async seleccionarImagen() {
        this.takePicture();
    }

    takePicture() {
        const element = this.cameraInput.nativeElement as HTMLInputElement;
        element.click();
    }

    salvarImagemWebVersion(formData: FormData) {
        if (this.fotos.length == 3) {
            this.alertService.presentAlert({
                pTitle: this.env.AppNameSigla,
                pSubtitle: this.subtitle,
                pMessage: 'Número máximo de fotos atingido'
            });
            this.foto = [];
            return;
        }
        for (let index = 0; index < this.fotoSave.length; index++) {
            this.Authorizer.QueryStoreImagemWebVersion('SalvarImagem', '', this.env.IMAGE_PRODUCT, this.fotoSave[index]).then(res => {
                let resultado: any = res[0];
                if (resultado.success) {
                    // resultado.results // This is the complete path. Ejemplo: ""D:/web/ServiceSaude/uploads/imagems/fotos/lxe0mwqxjxx.jpg"
                    let imagepath = res[0].results;

                    this.model.tipo = '1'; // for 1 because is foto 2 is tipo asinatura
                    this.model.foto_url = imagepath;
                    this.imageFileBase64 = this.env.API_NAME + res[0].results;

                    this.CRUDCadastroDomiciliarFotos('spCRUDCadastroDomiciliarFoto', 'CREATE', this.model);
                } else {
                    this.alertService.showLoader(res[0].message, 2000);
                }
            });
            console.log(this.foto);
            console.log(this.fotoSave)
        }
    }

    async mostrarImagen(item) {
        const modal = await this.modalCtrl
            .create({
                component: FotoPage,
                componentProps: { foto: item},
            });
        return await modal.present();
    }

    getLimit() {
        return this.fotos.length === 3;
    }

}
