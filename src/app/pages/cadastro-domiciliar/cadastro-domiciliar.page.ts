import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';

// Service
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {EnvService} from '../../services/env.service';
import {AlertService} from '../../services/alert.service';

import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {CadastroDomiciliar} from '../../models/CadastroDomiciliar';
import {AtendimentoDomiciliarPage} from "../atendimento-domiciliar-list/atendimento-domiciliar.page";


@Component({
    selector: 'app-cadastro-domiciliar',
    templateUrl: './cadastro-domiciliar.page.html',
    styleUrls: ['./cadastro-domiciliar.page.scss'],
})
export class CadastroDomiciliarPage implements OnInit {

    public AppName: string = environment.AppName;
    public subtitle = 'Cadastro Domiciliar e Territorial';
    public CodigoUsuario: any;

    static CRUD_READ: string = 'READ';
    static CRUD_DELETE: string = 'DELETE';

    public model = new CadastroDomiciliar();
    public collection: Array<CadastroDomiciliar> = [];

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
        private alertController: AlertController,) {
    }

    ngOnInit() {
        this.getPermissoesModulo();
        this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
    }

    ionViewWillEnter() {
        // Disparado quando o roteamento de componentes está prestes a se animar.
    }

    ionViewDidEnter() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        } else {
            this.CarregaCadastroDomiciliar();
        }
    }

    ionViewWillLeave() {
        // Disparado quando o roteamento de componentes está prestes a ser animado.
        // console.log(("ionViewWillLeave");
    }

    ionViewDidLeave() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
    }

    getPermissoesModulo() {
        const permissaoModulo = this.Authorizer.permissoesUsuario.filter(item => {
            return (item.Route === this.router.url);
        });

        if (permissaoModulo.length === 1) {
            this.permissoes = {
                Route: permissaoModulo[0].Route,
                Pesquisar: permissaoModulo[0].Pesquisar,
                Inserir: permissaoModulo[0].Inserir,
                Editar: permissaoModulo[0].Editar,
                Deletar: permissaoModulo[0].Deletar
            };
        } else {
            console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
        }
    }

    /**
     * Autor: Lina Jimenez
     * Data: 04/12/2019
     * @param procedure Nome da procedura armazanada no banco de dados
     * @param params JSON do parametros precisados pelo procedure
     * @param next Callback executado depois de executar a request
     */
    private sendRequest(
        procedure: string,
        params: { StatusCRUD: string; formValues: any; },
        next: any) {
        if (typeof this.Authorizer.HashKey !== 'undefined') {
            if (
                ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0) ||
                    (params.StatusCRUD === 'DELETE') && (this.permissoes.Pesquisar > 0))
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
                    pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
                });
            }
        } else {
            this.goBack();
        }
    }

    CarregaCadastroDomiciliar() {
        this.sendRequest('spCRUDCadastroDomiciliar', {
            StatusCRUD: CadastroDomiciliarPage.CRUD_READ,
            formValues: {usuario: this.Authorizer.CodigoUsuarioSistema}
        }, (resultado) => {
            let results = JSON.parse(atob(resultado.results));
            this.collection = results.map(function callback(value) {
                let model = new CadastroDomiciliar();
                model.codigo = value.codigo;
                model.cns_profissional = value.cns_profissional;
                model.cbo = value.cbo;
                model.cnes = value.cnes;
                model.data_cadastro = value.data_cadastro.substring(8, 10) + '/' + value.data_cadastro.substring(5, 7) + '/' + value.data_cadastro.substring(0, 4);
                return model;
            });
        });
    }

    newCadastroDomiciliar() {
        this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-form']);
        this.storage.set('codigoCadastroDom', '');
    }

    editarCadastroDomiciliar(codgioItem) {
        this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-form', codgioItem]);
        console.log('cadastro Domiciliar value', codgioItem);
        this.storage.set('codigoCadastroDom', codgioItem);
    }

    async delete(codgioItem: string) {
        this.model.codigo = Number(codgioItem);
        const alert = await this.alertController.create({
            header: 'Excluir',
            message: 'Você deseja apagar o Cadastro Domiciliar com Codigo: <strong>' + codgioItem + '?</strong>!!!',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.deleteCadastroDomiciliar(codgioItem);
                    }
                }
            ]
        });

        await alert.present();
    }

    public deleteCadastroDomiciliar(codgioItem: string) {
        this.model.codigo = Number(codgioItem);

        this.sendRequest('spCRUDCadastroDomiciliar', {
            StatusCRUD: CadastroDomiciliarPage.CRUD_DELETE,
            formValues: {codigo: this.model.codigo}
        }, (resultado) => {
            if (resultado.success == true) {
                this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Cadastro Domiciliar excluído com sucesso !' });
                this.collection.forEach(function (model, index, collection) {
                    if (model.codigo == this) {
                        collection.splice(index, 1);
                    }
                }, codgioItem);
                this.resetModel();
                return;
            } else {
                this.alertService.presentAlert({
                    pTitle: 'ERROR', pSubtitle: this.AppName, pMessage: 'Não foi possível deletar o Cadastro Invidual'
                });
            }

        });
    }

    goBack() {
        this.router.navigate(['/menu/options/tabs/main']);
    }

    sincronizarCadastro() {}

    private resetModel() {
        for (const key in this.model) {
            this.model[key] = '';
        }
    }

}
