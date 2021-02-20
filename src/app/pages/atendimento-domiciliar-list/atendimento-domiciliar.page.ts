import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';
import {environment} from 'src/environments/environment.prod';
import {AtendimentoDomiciliar} from '../../models/AtendimentoDomiciliar';
import {ServiceAntendimento} from './serviceAntendimento';
import {AtendimentoIndividual} from '../../models/AtendimentoIndividual';

@Component({
    selector: 'app-atendimento-domiciliar',
    templateUrl: './atendimento-domiciliar.page.html',
    styleUrls: ['./atendimento-domiciliar.page.scss'],
})
export class AtendimentoDomiciliarPage implements OnInit {

    public subtitle = 'Atendimento Domiciliar';
    CodigoUsuario: any;
    collectionDomiciliar = [];
    flagForm = true;
    public AppName: string = environment.AppName;
    private formValues: any;

    constructor(
        private navCtrl: NavController,
        private Authorizer: AuthService,
    ) {
    }

    ngOnInit() {
        this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
        this.spCRUDAtendimentoDomiciliar();
    }

    newAntendimentoDomiciliar(type :string, item:any) {
        if (type == "update") {
            ServiceAntendimento.id = item.codigo
            this.navCtrl.navigateRoot('/atendimento-domiciliar-form');
        }
        else {
            this.navCtrl.navigateRoot('/atendimento-domiciliar-form');
        }
    }
    goBack() {
        this.navCtrl.back();
    }

    spCRUDAtendimentoDomiciliar() {
        this.formValues = { usuario: this.Authorizer.CodigoUsuarioSistema }
        const params = {
            StatusCRUD: 'READ',
            formValues: {usuario: this.Authorizer.CodigoUsuarioSistema},
        };
        this.sendRequest('spCRUDAtendimentoDomiciliar', params, (resultado) => {
            this.collectionDomiciliar = JSON.parse(atob(resultado.results));
        });
    }

    delete(item: any) {
        const alert = document.createElement('ion-alert');
        this.formValues = {codigo : item.codigo}
        alert.header = 'Excluíndo!';
        alert.message = `Deseja excluir o Atendimento Domiciliar: <strong>${item.cns_do_profissional}</strong>!!!`;
        alert.buttons = [
            {
                text: 'Desistir',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                },
            },
            {
                text: 'Confirmar',
                handler: () => {
                    const params = {
                        StatusCRUD: 'DELETE',
                        formValues: {codigo : item.codigo},
                    };
                    /**/
                    this.sendRequest(
                        'spCRUDAtendimentoDomiciliar',
                        params,
                        (resultado) => {
                            this.doRefresh(event);
                        }
                    );
                },
            },
        ];
        document.body.appendChild(alert);
        return alert.present();
    }
    private sendRequest(procedure: string,
                        params: { formValues: any; StatusCRUD: string },
                        next: (resultado) => void) {
        const _params = {
            StatusCRUD: params.StatusCRUD,
            formValues: params.formValues,
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            Hashkey: this.Authorizer.HashKey,
        };

        console.log('IN Request');
        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, _params).then(
            (res) => {
                const resultado: any = res[0];
                try {
                    if (resultado.success) {
                        next(resultado);
                    } else {
                        console.log(resultado.success);
                        console.log(resultado.message);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        );
    }

    doRefresh(event) {
        console.log('Begin async operation');
        this.spCRUDAtendimentoDomiciliar();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

}

