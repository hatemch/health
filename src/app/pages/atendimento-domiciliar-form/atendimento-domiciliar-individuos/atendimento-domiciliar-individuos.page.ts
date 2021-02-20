import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {AuthService} from '../../../services/auth.service';
import {NavController} from '@ionic/angular';
import {AtendimentoDomiciliar} from '../../../models/AtendimentoDomiciliar';
import {alertController} from '@ionic/core';
import {IonicSelectableComponent} from 'ionic-selectable';
import {ServiceAntendimento} from '../../atendimento-domiciliar-list/serviceAntendimento';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-atendimento-domiciliar-individuos',
    templateUrl: 'atendimento-domiciliar-individuos.page.html',
    styleUrls: ['atendimento-domiciliar-individuos.page.scss']
})
export class AtendimentoDomiciliarIndividuosPage {

    private CodigoUsuario: any;
    model: AtendimentoDomiciliar = new AtendimentoDomiciliar();
    local_de_atendimento = [
        {id: '1', nom: 'UBS'},
        {id: '2', nom: 'Unidade movel'},
        {id: '3', nom: 'Rua'},
        {id: '4', nom: 'Domicilio'},
        {id: '5', nom: 'Escola/Creche'},
        {id: '6', nom: 'Polo (Academia da Saude)'},
        {id: '7', nom: 'Instituicao/Abrigo'},
        {id: '8', nom: 'Unidade prisional ou congeneres'},
        {id: '9', nom: 'Unidade socioeducativa'},
        {id: '10', nom: 'Outros'}];

    tipo_de_atendimento = [
        {id: '1', nom: 'Atendimento programado'},
        {id: '2', nom: 'Atendimento nao programado'},
        {id: '3', nom: 'Visita domiciliar pos-obito'}];

    modalidade_AD = [
        {id: '1', nom: 'AD1'},
        {id: '2', nom: 'AD2'},
        {id: '3', nom: 'AD3'}];

    condicao_avaliada = [
        {id: '1', nom: 'Acamado'},
        {id: '2', nom: 'Domiciliado'},
        {id: '3', nom: 'Ulceras/feridas (grau III ou IV)'},
        {id: '4', nom: 'Acompanhamento nutricional'},
        {id: '5', nom: 'Uso de sonda nasogastrica - SNG'},
        {id: '6', nom: 'Uso de sonda nasoenteral - SNE'},
        {id: '7', nom: 'Uso de gastrostomia'},
        {id: '8', nom: 'Uso de colostomia'},
        {id: '9', nom: 'Uso de cistostomia'},
        {id: '10', nom: 'Uso de sonda vesical de demora - SVD'},
        {id: '11', nom: 'Acompanhamento pré-operatorio'},
        {id: '12', nom: 'Acompanhamento pos-operatorio'},
        {id: '13', nom: 'Adaptacao ao uso de ortese/protese'},
        {id: '14', nom: 'Reabilitacao domiciliar'},
        {id: '15', nom: 'Cuidados paliativos oncologicos'},
        {id: '16', nom: 'Cuidados paliativos \n nao oncologicos'},
        {id: '17', nom: 'Oxigenoterapia domiciliar'},
        {id: '18', nom: 'Uso de traqueostomia'},
        {id: '19', nom: 'Uso de aspirador de vias \n aéreas para higiene bronquica'},
        {id: '20', nom: 'Suporte ventilatorio \n nao invasivo - CPAP'},
        {id: '21', nom: 'Suporte ventilatorio \n nao invasivo - BiPAP'},
        {id: '22', nom: 'Dialise peritonial'},
        {id: '23', nom: 'Paracentese'},
        {id: '24', nom: 'Medicacao parenteral'}];

    conduta_desfecho = [
        {id: '1', nom: 'Permanecia'},
        {id: '2', nom: 'Alta administrativa'},
        {id: '3', nom: 'Alta clinia'},
        {id: '4', nom: 'Obito'}];

    encaminhamento = [
        {id: '1', nom: 'Atencao Basica (AD1)'},
        {id: '2', nom: 'Servico de Urgencia e Emrgencia'},
        {id: '3', nom: 'Servico de Internacao Hospitalar'}];

    procedimento = [
        {id: '1', nom: 'Acomanhamento de paciente em reabilitacao em comunicacao alternativa'},
        {id: '2', nom: 'Antibioticoterapia parenteral'},
        {id: '3', nom: 'Atend./acomp. paciente em reabilitacao do desenvolvimento neuro'},
        {id: '4', nom: 'Atend. fisioterapeutico paciente c/ transt. respiratorio s/ complicacoes sistemicas'},
        {id: '5', nom: 'Atendimento medico com finalidae de atestar obito'},
        {id: '6', nom: 'Atendimento/acompanhamento em reabilitacao nas multiplas deficiencias'},
        {id: '7', nom: 'Cateterismo vesical de alivio'},
        {id: '8', nom: 'Cateterismo vesical de demora'},
        {id: '9', nom: 'Coleta de material para exame laboratorial'},
        {id: '10', nom: 'Cuidados com estomas'},
        {id: '11', nom: 'Cuidados com traqueostomia'},
        {id: '12', nom: 'Enema'},
        {id: '13', nom: 'Oxigenoterapia'},
        {id: '14', nom: 'Retirada de pontos de cirurgias basicas'},
        {id: '15', nom: 'Sondagem gastrica'},
        {id: '16', nom: 'Terapia de reidratacao oral'},
        {id: '17', nom: 'Terapia de reidratacao parenteral'},
        {id: '18', nom: 'Terapia fonoaudiologica individual'},
        {id: '19', nom: 'Tratamento de traumatislos de localizacao especif./nao especificada'},
        {id: '20', nom: 'Tratamento em reabilitacao'}];

    sexo_list = ['Masculino', 'Feminino'];

    turno: any;
    sexo: any;
    cid10: any;
    ciap2: any;

    local_de_atendimento_Selected: [];
    tipo_de_atendimento_Selected: [];
    condicao_avaliada_Selected: [];
    procedimento_Selected: [];
    outros = [];
    NumProntuario: any;
    Data_de_nascimento: any;
    modalidade_AD_selected: [];
    conduta_desfecho_Selected: [];
    encaminhamento_Selected: [];
    step: number;

    constructor(private geolocation: Geolocation,
                private Authorizer: AuthService,
                public navCtrl: NavController,
                private alertService: AlertService,
    ) {
    }

    ngOnInit() {
        //console.log('Open Tab1 in layout atendimento-domiciliar-list-form ');
        this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
    }

    public async handleButtonClick() {
        const alert = await alertController.create({
            header: 'Use this lightsaber?',
            inputs: [
                {
                    name: 'sigtap',
                    placeholder: 'SIGTAP'
                }],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked', data);
                    }
                },
                {
                    text: 'Adicionar',
                    handler: data => {
                        this.outros.push(data.sigtap);
                    }
                }
            ]
        });
        await alert.present();
    }

    deleteOutro(item: any) {
        for (let i = 0; i < this.outros.length; ++i) {
            if (this.outros[i] === item) {
                this.outros.splice(i, 1);
            }
        }
    }

    changeSelect(attribute, $event) {
        if (attribute == 'sexo') {
            attribute = $event.target.value;
            this.sexo = attribute;
        } else if (attribute == 'modalidade_AD') {
            attribute = $event.target.value;
            this.modalidade_AD_selected = attribute;
        }   else if (attribute == 'turno') {
            attribute = $event.target.value;
            this.turno = attribute;
        }
    }

    onChange(event: { component: IonicSelectableComponent; value: any }, table: any) {
        if (table == 'local_de_atendimento_Selected') {
            this.local_de_atendimento_Selected = [];
            this.local_de_atendimento_Selected = event.value;
        }
        if (table == 'tipo_de_atendimento_Selected') {
            this.tipo_de_atendimento_Selected = [];
            this.tipo_de_atendimento_Selected = event.value;
        }
        if (table == 'condicao_avaliada_Selected') {
            this.condicao_avaliada_Selected = [];
            this.condicao_avaliada_Selected = event.value;
        }
        if (table == 'procedimento_Selected') {
            this.procedimento_Selected = [];
            this.procedimento_Selected = event.value;
        }
        if (table == 'conduta_desfecho_Selected') {
            this.conduta_desfecho_Selected = [];
            this.conduta_desfecho_Selected = event.value;
        }
        if (table == 'encaminhamento_Selected') {
            this.encaminhamento_Selected = [];
            this.encaminhamento_Selected = event.value;
        }
    }

    Submit() {
        console.log("turno : ", this.turno);
        console.log("NumProntuario ", this.NumProntuario);
        console.log("Data_de_nascimento ", this.Data_de_nascimento);
        console.log("sexo ",this.sexo);
        console.log('local_de_atendimento_Selected :', this.local_de_atendimento_Selected);
        console.log('tipo :', this.tipo_de_atendimento_Selected);
        console.log('ad: ', this.modalidade_AD_selected);
        console.log('condicao_avaliada_Selected : ', this.condicao_avaliada_Selected);
        console.log('CIAP2 : ', this.ciap2);
        console.log('Cid10 : ', this.cid10);
        console.log('procedimento_Selected : ', this.procedimento_Selected);
        console.log('Outro : ', this.outros);
        console.log('conduta_desfecho_Selected : ', this.conduta_desfecho_Selected);
        console.log('encaminhamento_Selected : ', this.encaminhamento_Selected);



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

    setStep(index: number){
        this.step = index;
    }
}
