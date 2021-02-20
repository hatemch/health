import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
// Services
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {EnvService} from '../../services/env.service';
import {AlertService} from '../../services/alert.service';

import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {CadastroIndividual} from 'src/app/models/CadastroIndividual';

@Component({
    selector: 'app-cadastro-individual',
    templateUrl: './cadastro-individual.page.html',
    styleUrls: ['./cadastro-individual.page.scss'],
})
export class CadastroIndividualPage implements OnInit {

    public AppName: string = environment.AppName;
    public subtitle = 'Cadastro Individual';
    public CodigoUsuario: any;
    public CadastroIndividual: any;

    static CRUD_READ: string = 'READ';
    static CRUD_DELETE: string = 'DELETE';

    public model = new CadastroIndividual();
    public collection: Array<CadastroIndividual> = [];

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
        private alertController: AlertController,
        private env: EnvService,
        private Authorizer: AuthService,
        private router: Router
    ) {
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
            this.CarregaCadastroIndividual();
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
              ((params.StatusCRUD === 'CREATE') && (this.permissoes.Inserir > 0))
              || ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
              || ((params.StatusCRUD === 'UPDATE') && (this.permissoes.Editar > 0))
              || ((params.StatusCRUD === 'DELETE') && (this.permissoes.Deletar > 0))
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
                pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
              });
            }
        } else {
            this.goBack();
        }
    }

    CarregaCadastroIndividual() {
        this.sendRequest('spCRUDCadastroIndividual', {
            StatusCRUD: CadastroIndividualPage.CRUD_READ,
            formValues: {usuario: this.Authorizer.CodigoUsuarioSistema},
        }, (resultado) => {
            let results = JSON.parse(atob(resultado.results));
            this.collection = results.map(function callback(value) {
                let model = new CadastroIndividual();
                model.codigo = value.codigo;
                model.cns_profissional = value.cns_profissional;
                model.cbo = value.cbo;
                model.cnes = value.cnes;
                model.data_cadastro = value.data_cadastro.substring(8, 10) + '/' + value.data_cadastro.substring(5, 7) + '/' + value.data_cadastro.substring(0, 4);
                return model;
            });
        });

    }

    newCadastroIndividual() {
        this.router.navigate(['/cadastro-individual-form']);
    }

    editarCadastroIndividual(coddigoItem) {
        this.router.navigate(['cadastro-individual-form/edit/', coddigoItem]);
    }

    async delete(codgioItem: string) {
        this.model.codigo = Number(codgioItem);
        const alert = await this.alertController.create({
            header: 'Excluir',
            message: 'Você deseja apagar Marcador com Codigo: <strong>' + codgioItem + '?</strong>!!!',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    // handler: (blah) => {
                    //   console.log('Confirm Cancel: blah');
                    // }
                }, {
                    text: 'Sim',
                    handler: () => {
                        this.deleteCadastroIndividual(codgioItem);
                    }
                }
            ]
        });

        await alert.present();
    }

    public deleteCadastroIndividual(codgioItem: string) {
        this.model.codigo = Number(codgioItem);

        this.sendRequest('spCRUDCadastroIndividual', {
            StatusCRUD: CadastroIndividualPage.CRUD_DELETE,
            formValues: {codigo: this.model.codigo}
        }, (resultado) => {
            if (resultado.success == true) {
                this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Cadastro Individual excluído com sucesso !' });
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
