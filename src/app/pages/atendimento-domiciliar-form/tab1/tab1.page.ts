import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AuthService} from '../../../services/auth.service';
import {AtendimentoDomiciliar} from '../../../models/AtendimentoDomiciliar';
import {NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {ServiceAntendimento} from '../../atendimento-domiciliar-list/serviceAntendimento';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    private CodigoUsuario: any;
    model: AtendimentoDomiciliar = new AtendimentoDomiciliar();

    constructor(private geolocation: Geolocation,
                private Authorizer: AuthService,
                public navCtrl: NavController,
                private alertService: AlertService,) {
    }

    ngOnInit() {
        console.log('Open Tab1 in layout atendimento-domiciliar-list-form ');
        this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
        //console.log("this is id User connected ",this.CodigoUsuario);
        if(ServiceAntendimento.id != null){
            this.model.codigo = ServiceAntendimento.id;
        }
    }

    onSubmit() {
        // check the if we really in this function !!
        console.log('User Click to submit and add new atendimento-domiciliar-list');

        // display if the data collected isNull or not !!
        console.log(
            this.model.cnes, '\n',
            this.model.cbo, '\n',
            this.model.ine, '\n',
            this.model.latitude, '\n',
            this.model.longitude, '\n',
            this.model.cns_do_profissional, '\n',
            this.model.data_atendimento_domiciliar, '\n',);

        //change the format of data_atendimento_domiciliar
        if (this.model.data_atendimento_domiciliar !== "") {
            this.model.data_atendimento_domiciliar = ServiceAntendimento.formatarData(this.model.data_atendimento_domiciliar);
            // display data_atendimento_domiciliar to check if really changed !!
            console.log(this.model.data_atendimento_domiciliar);
        }

        this.model.usuario = parseInt(this.Authorizer.CodigoUsuarioSistema);

        console.log(
            'Cnes: ', this.model.cnes, '\n',
            'cbo: ', this.model.cbo, '\n',
            'ine: ', this.model.ine, '\n',
            'lat: ', this.model.latitude, '\n',
            'long: ', this.model.longitude, '\n',
            'usr: ', this.model.usuario.toString(), '\n',
            'cns_d_p: ', this.model.cns_do_profissional, '\n',
            'data_atendi: ', this.model.data_atendimento_domiciliar, '\n',);


        const params = {
            StatusCRUD: this.model.codigo > 0 ? "UPDATE" : "CREATE",
            formValues: this.model,
        };

        if (params.StatusCRUD === 'CREATE' ||
            (params.StatusCRUD === 'UPDATE' && this.model.usuario === parseInt(this.Authorizer.CodigoUsuarioSistema)))
        {
            this.sendRequest(
                'spCRUDAtendimentoDomiciliar',
                params,
                (resultado) => {
                    console.log(resultado);
                    if (params.StatusCRUD === 'CREATE') {
                        console.log("OnCreate");
                        //ServiceAntendimento.goBack(this.navCtrl);
                    }else if(params.StatusCRUD ==='UPDATE'){
                        console.log("OnUpdate");
                        ServiceAntendimento.goBack(this.navCtrl);
                    }
            });
        } else {
            this.alertService.presentAlert({
                pTitle: 'ATENÇÃO',
                pSubtitle: ' ',
                pMessage: 'Nao pode Editar essa Fiscalizacao!',
            }).then(r => console.log(r));
            ServiceAntendimento.goBack(this.navCtrl);
        }
    }

    async getLocal() {
        this.geolocation.getCurrentPosition({
            maximumAge: 1000,
            timeout: 5000,
            enableHighAccuracy: true,
        }).then((resp) => {
            resp.coords.latitude;
            resp.coords.longitude;
            this.model.latitude = resp.coords.latitude.toString();
            this.model.longitude = resp.coords.longitude.toString();
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    private sendRequest(
        procedure: string,
        params: { StatusCRUD: string; formValues: any },
        next: any
    ) {
        const _params = {
            StatusCRUD: params.StatusCRUD,
            formValues: params.formValues,
            CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
            Hashkey: this.Authorizer.HashKey,
        };

        this.Authorizer.QueryStoreProc('ExecutarPost', procedure, _params).then(
            (res) => {
                const resultado: any = res[0];
                try {

                    console.log(res[0]);
                    if (resultado.success) {
                        next(resultado);
                        if (procedure === 'spCRUDAtendimentoDomiciliar') {
                            //this.alertService.showLoader(resultado.message, 1000).then(r => console.log(r));
                            console.log(resultado.success);
                            console.log(resultado.message);
                            console.log(res);
                        }
                        ServiceAntendimento.goBack(this.navCtrl);
                    } else {
                        this.alertService.presentAlert({
                            pTitle: 'ATENÇÃO',
                            pSubtitle: '',
                            pMessage: resultado.message,
                        }).then(r => console.log(r));
                        console.log(resultado.success);
                        console.log(resultado.message);
                        //this.navCtrl.back();
                    }
                } catch (err) {
                    this.alertService.presentAlert({
                        pTitle: 'ATENÇÃO',
                        pSubtitle: '',
                        pMessage: 'Erro ao fazer a petição',
                    }).then(r => console.log(r));
                }
            }
        );
    }


}
