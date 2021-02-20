import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment.prod";
import {CadastroDomiciliarFamilia} from "../../../models/CadastroDomiciliarFamilia";
import {ModalController, NavController} from "@ionic/angular";
import {AlertService} from "../../../services/alert.service";
import {EnvService} from "../../../services/env.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {NgForm} from "@angular/forms";
import {CadastroDomiciliar} from "../../../models/CadastroDomiciliar"
import {ResponsavelFormPage} from "../../responsavel-form/responsavel-form.page";

@Component({
    selector: 'app-cadastro-domiciliar-familias',
    templateUrl: './cadastro-domiciliar-familias.page.html',
    styleUrls: ['./cadastro-domiciliar-familias.page.scss'],
})
export class CadastroDomiciliarFamiliasPage implements OnInit {


    public AppName: string = environment.AppName;
    public subtitle = 'Cadastro Domiciliar e Territorial';


    public model: CadastroDomiciliarFamilia = new CadastroDomiciliarFamilia();
    //public collection: CadastroDomiciliarFamilia[];
    public collection: Array<CadastroDomiciliarFamilia> = [];
    public collectionResponsavel: any = [];
    public flagForm = false;
    public showAlert = false;

    public flagMudou = false;
    public renda_familiar;
    public cadastroDomiciliar;

    public collectionRendaFamiliar: any = [
        {id: '1', nome: '1/4'},
        {id: '2', nome: '1/2'},
        {id: '3', nome: '1'},
        {id: '4', nome: '2'},
        {id: '5', nome: '3'},
        {id: '6', nome: '4'},
        {id: '7', nome: '+'},
    ];

    static CRUD_CREATE: string = 'CREATE';
    static CRUD_UPDATE: string = 'UPDATE';
    static CRUD_READ: string = 'READ';
    static CRUD_DELETE: string = 'DELETE';

    // Permissoes do modulo para o usuario logado
    private permissoes = {
        Route: '',
        Pesquisar: 1,
        Inserir: 1,
        Editar: 1,
        Deletar: 1
    };

    constructor(
        private navCtrl: NavController,
        private alertService: AlertService,
        private env: EnvService,
        private Authorizer: AuthService,
        private router: Router,
        private storage: Storage,
        private activatedRoute: ActivatedRoute,
        private modalCtrl: ModalController
    ) {
        this.activatedRoute.params.subscribe(
            data => {
                //"data" carries all the parameters
                this.model.cadastro_domiciliar = data.codigo;
                this.cadastroDomiciliar = data.codigo;
                console.log('CodigoCadastroDomiciliarFamiliar', this.model.cadastro_domiciliar);
                if (this.model.cadastro_domiciliar) {
                    this.CRUDCadastroDomiciliarFamiliar(CadastroDomiciliarFamiliasPage.CRUD_READ);
                }
            });
    }

    ionViewDidLeave() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        console.log("ionViewDidLeave");
        this.flagForm = false;
    }

    ngOnInit() {

    }

    /**
     * Autor: Viviana Valenzuela
     * Data: 02/01/2020
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    private sendRequest(
        procedure: string,
        params: { StatusCRUD: string; formValues: any; },
        next: any) {
        if (
            ((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
            || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Pesquisar > 0))
            || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Pesquisar > 0))
            || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
        ) {

            const _params = {
                StatusCRUD: params.StatusCRUD,
                formValues: params.formValues,
                CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
                Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
            };

            this.Authorizer.QueryStoreProc('ExecutarPost', procedure, _params).then(res => {
                const resultado: any = res[0];
                try {
                    if (resultado.success) {
                        next(resultado);
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
                pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
            });
        }
    }

    CRUDCadastroDomiciliarFamiliar(_statusCRUD: string) {
        this.sendRequest('spCRUDCadastroDomiciliarFamilia', {
            StatusCRUD: _statusCRUD,
            formValues: this.model
        }, (resultado) => {
            switch (_statusCRUD) {
                case 'CREATE':
                    this.model.codigo = JSON.parse(atob(resultado.results))[0].codigo;
                    this.collection.push(JSON.parse(atob(resultado.results))[0]);
                    this.collection.forEach((item, index) => {
                        if (item.codigo === this.model.codigo) {
                            this.collection[index].data_nascimento_responsavel = this.collection[index].data_nascimento_responsavel.substring(8, 10) + '/' + this.collection[index].data_nascimento_responsavel.substring(5, 7) + '/' + this.collection[index].data_nascimento_responsavel.substring(0, 4);
                        }
                    });
                    this.goBack();
                    break;
                case 'UPDATE':
                    this.collection.forEach((item, index) => {
                        if (item.codigo === this.model.codigo) {
                            this.collection[index] = JSON.parse(atob(resultado.results))[0];
                            this.collection[index].data_nascimento_responsavel = this.collection[index].data_nascimento_responsavel.substring(8, 10) + '/' + this.collection[index].data_nascimento_responsavel.substring(5, 7) + '/' + this.collection[index].data_nascimento_responsavel.substring(0, 4);
                        }
                    });
                    this.goBack();
                    break;
                case 'READ':
                    let results = JSON.parse(atob(resultado.results));
                    this.collection = results.map(function callback(value) {
                        let model = new CadastroDomiciliarFamilia();
                        model.codigo = value.codigo;
                        model.cadastro_domiciliar = value.cadastro_domiciliar;
                        model.numero_prontuario_familiar = value.numero_prontuario_familiar;
                        model.cns_responsavel = value.cns_responsavel;
                        model.data_nascimento_responsavel = value.data_nascimento_responsavel.substring(8, 10) + '/' + value.data_nascimento_responsavel.substring(5, 7) + '/' + value.data_nascimento_responsavel.substring(0, 4);
                        model.renda_familiar = value.renda_familiar;
                        model.numero_membros_familia = value.numero_membros_familia;
                        model.reside_desde_mes = value.reside_desde_mes;
                        model.reside_desde_ano = value.reside_desde_ano;
                        model.mudou = value.mudou;
                        return model;
                    });
                    break;
                case 'DELETE':
                    if (resultado.success == true) {
                        this.alertService.presentAlert({
                            pTitle: this.AppName,
                            pSubtitle: this.subtitle,
                            pMessage: 'Familiar excluído com sucesso !'
                        });
                        this.collection.forEach(function (model, index, collection) {
                            if (model.codigo == this) {
                                collection.splice(index, 1);
                            }
                        }, this.model.codigo);
                        this.resetModel();
                        return;
                    } else {
                        this.alertService.presentAlert({
                            pTitle: 'ERROR',
                            pSubtitle: this.AppName,
                            pMessage: 'Não foi possível deletar o Cadastro Domiciliar Familia'
                        });
                    }
                    break;
            }
        });
    }

    newCadastroDomiciliarDFamilia() {
        this.flagForm = true;
    }

    salvarFamilia(form: NgForm) {
        if ( (this.model.cns_responsavel === null) || (this.model.cns_responsavel === '') ){
            this.showAlert= true;
            this.alertService.presentAlert({
                pTitle: 'ATENÇÃO',
                pSubtitle: '',
                pMessage: 'e um campo obligatorio'
            });
            return;
        }

        if ((this.model.data_nascimento_responsavel !== null) && (this.model.data_nascimento_responsavel !== '')) {
            this.model.data_nascimento_responsavel = this.formatarData2(this.model.data_nascimento_responsavel);
            console.log(this.model.data_nascimento_responsavel);
        }

        if ((this.renda_familiar !== undefined) && (this.renda_familiar !== '')) {
            this.model.renda_familiar = this.renda_familiar.id;
        }

        let statusCRUD = this.model.codigo > 0 ? 'UPDATE' : 'CREATE';
        if (statusCRUD === 'CREATE') {
            this.CRUDCadastroDomiciliarFamiliar(CadastroDomiciliarFamiliasPage.CRUD_CREATE);
        } else if (statusCRUD === 'UPDATE') {
            this.CRUDCadastroDomiciliarFamiliar(CadastroDomiciliarFamiliasPage.CRUD_UPDATE);
        }

    }

    goBack() {
        if (this.flagForm) {
            this.flagForm = !this.flagForm;
            this.resetModel();
        } else {
            this.navCtrl.back();
            // this.collection
            // this.paginas = [];
            // this.modelPesquisa.pagina = 1;
        }
    }

    public changeSelect(item, selectName) {
        console.log(item);
        console.log(selectName);
        this[selectName] = item;
    }

    public changeCheck(modelAttr, flag) {
        this.model[modelAttr] = (this[flag]) ? 'S' : 'N';
    }

    editar(model: any) {
        this.flagForm = true;
        for (const key in model) {
            this.model[key] = model[key];
            switch (key) {
                case 'renda_familiar':
                    for (const valor in this.collectionRendaFamiliar) {
                        if (this.collectionRendaFamiliar[valor].id === this.model[key]) {
                            this.renda_familiar = this.collectionRendaFamiliar[valor];
                            console.log(this.renda_familiar);
                        }
                    }
                    break;
                case 'mudou':
                    this.flagMudou = (this.model[key] === 'S') ? true : false;
                    break;

                default:
                    break;
            }
        }
    }

    delete(codgioItem) {
        const alert = document.createElement('ion-alert');
        alert.header = 'Excluíndo!';
        alert.message = `Deseja excluir o Cadastro Domiciliar Familiar: <strong>${codgioItem}</strong>!!!`;
        alert.buttons = [
            {
                text: 'Desistir',
                role: 'cancel',
                cssClass: 'secondary',
            }, {
                text: 'Confirmar',
                handler: () => {
                    this.model.codigo = Number(codgioItem);
                    this.CRUDCadastroDomiciliarFamiliar(CadastroDomiciliarFamiliasPage.CRUD_DELETE);

                }
            }
        ];

        document.body.appendChild(alert);
        return alert.present();
    }

    private formatarData2(strData: string) {
        // alterar formato de yyyy-mm-dd HH:mm:ss para mm/dd/yyyy HH:mm:ss
        const datahora = strData.split('T');
        if (datahora.length === 2) {
            const data = datahora[0];
            const hora = datahora[1];
            const diaMesAno = data.split('-');
            return diaMesAno[1] + '/' + diaMesAno[2] + '/' + diaMesAno[0];
        } else if (datahora.length === 1) {
            const data = datahora[0];
            const diaMesAno = data.split('/');
            return diaMesAno[2] + '/' + diaMesAno[1] + '/' + diaMesAno[0];
        } else {
            return strData;
        }
    }

    /* ------------------------------------------- ADD SIGTAP ------------------------------------------ */
    async OpenModalResponsavel() {

        const modal = await this.modalCtrl.create({
            component: ResponsavelFormPage,
            cssClass: 'ai-sigtap-modal-css',
        });
        modal.onDidDismiss().then((data) => {
            console.log(data);
            this.model.cns_responsavel = data.data;
        });
        return await modal.present();
    }

    private resetModel() {
        console.log('teste', this.model);
        for (const key in this.model) {
            if (key === 'cadastro_domiciliar') {
                this.model[key] = this.cadastroDomiciliar;
            } else {
                this.model[key] = '';

            }
        }
        this.renda_familiar = [];
        this.flagMudou = false;
    }

    isNumber(evt) {
        let numbers = /^[0-9]+$/;
        if (!evt.match(numbers)) {
            this.alertService.presentAlert({pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Ingresse um numero valido'});
            //logic to clean the inputs after showing the alert
            for (let k in this.model) {
                let value = this.model[k];
                if (value == evt) {
                    this.model[k] = '';
                }

            }
            /////////////////////////////////////////////////////////
            return;
        }
    }
    // validation year
    yearValidation(evt) {
        let numbers = /^[0-9]+$/;
        if (!evt.match(numbers)) {
            this.alertService.presentAlert({pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Ingresse um numero valido'});
            //logic to clean the inputs after showing the alert
            for (let k in this.model) {
                let value = this.model[k];
                if (value == evt) {
                    this.model[k] = '';
                }

            }
            /////////////////////////////////////////////////////////
            return;
        }
        if (evt.length != 4) {
            this.alertService.presentAlert({
                pTitle: 'ATENÇÃO',
                pSubtitle: '',
                pMessage: 'O ano não é adequado. por favor, verifique'
            });
            //logic to clean the inputs after showing the alert
            for (let k in this.model) {
                let value = this.model[k];
                if (value == evt) {
                    this.model[k] = '';
                }

            }
            return false;
        }
        if (evt.length == 4) {

            if (evt != 0) {

                var current_year = new Date().getFullYear();
                if ((evt < 1920) || (evt > current_year)) {
                    this.alertService.presentAlert({
                        pTitle: 'ATENÇÃO',
                        pSubtitle: '',
                        pMessage: 'O ano deve estar entre 1920 e o ano atual'
                    });
                    for (let k in this.model) {
                        let value = this.model[k];
                        if (value == evt) {
                            this.model[k] = '';
                        }

                    }
                    return false;
                }
                return true;
            }
        }
    }
    //validation moth
    monthValidation(evt) {
        let numbers = /^[0-9]+$/;
        if (!evt.match(numbers)) {
            this.alertService.presentAlert({pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Ingresse um numero valido'});
            //logic to clean the inputs after showing the alert
            for (let k in this.model) {
                let value = this.model[k];
                if (value == evt) {
                    this.model[k] = '';
                }

            }
            /////////////////////////////////////////////////////////
            return;
        }
            if ((evt < 1) || (evt > 12)) {
                this.alertService.presentAlert({
                    pTitle: 'ATENÇÃO',
                    pSubtitle: '',
                    pMessage: 'O ano deve estar entre 1 e o 12 '
                });
                for (let k in this.model) {
                    let value = this.model[k];
                    if (value == evt) {
                        this.model[k] = '';
                    }

                }
                return false;
            }
    }
}
