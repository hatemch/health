import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from '@ionic/angular';

import {CadastroDomiciliar} from '../../../models/CadastroDomiciliar';
import {NgForm} from '@angular/forms';

// Services
import {AlertService} from '../../../services/alert.service';
import {AuthService} from '../../../services/auth.service';
import {EnvService} from '../../../services/env.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {CadastroDomiciliarTabsPage} from "../cadastro-domiciliar-tabs.page";

@Component({
    selector: 'app-cadastro-domiciliar-form',
    templateUrl: './cadastro-domiciliar-form.page.html',
    styleUrls: ['./cadastro-domiciliar-form.page.scss'],
})
export class CadastroDomiciliarFormPage implements OnInit {

    @Input() shareCodigo = new EventEmitter<boolean>();

    public subtitle = 'Cadastro Domiciliar e Territorial ';
    public step = 0;

    public model = new CadastroDomiciliar();
    public collection: CadastroDomiciliar[];

    public uf;

    public flagSemNumero = false;
    public flagForaArea = false;

    public flagEnergia = false;

    public flagTermoRecusa = false;

    public flagTemOutroProf = false;
    public flagTermoRecusaInstitucao = false;

    public flagAnimais = false;

    public tipo_imovel;
    public localizacao;
    public tipo_domicilio;
    public tipo_acesso_domicilio;

    public parede_alvenaria;
    public parede_taipa;
    public parede_outros;

    public abastecimento_agua;
    public escoamento_banheiro;
    public forma_escoamento_banheiro;
    public agua_consumo_domicilio;
    public destino_lixo;
    public animal: any = [];


    // CONDIÇÕES DE MORADIA
    public situacao_moradia;


    public collectionUfs: any = [{
        CodigoBaseUF: 0,
        Nome: '',
        Sigla: ''
    }];

    public collectionTipoImovel: any = [
        {id: '1', nome: 'Domicílio'},
        {id: '2', nome: 'Comércio'},
        {id: '3', nome: 'Terreno baldio'},
        {id: '4', nome: 'Ponto estratégico'},
        {id: '5', nome: 'Escola'},
        {id: '6', nome: 'Creche'},
        {id: '7', nome: 'Abrigo'},
        {id: '8', nome: 'Instituição de longa permanência para idosos'},
        {id: '9', nome: 'Unidade prisional'},
        {id: '10', nome: 'Unidade de medida socioeducativa'},
        {id: '11', nome: 'Delegacia'},
        {id: '12', nome: 'Estabelecimento religioso'},
        {id: '13', nome: 'Outros'}
    ];

    public collectionSituacaoMoradia: any = [
        {id: '1', nome: 'Própria'},
        {id: '2', nome: 'Financiado'},
        {id: '3', nome: 'Alugado'},
        {id: '4', nome: 'Arrendado'},
        {id: '5', nome: 'Cedido'},
        {id: '6', nome: 'Ocupação'},
        {id: '7', nome: 'Situação de rua'},
        {id: '8', nome: 'Outra'}
    ];

    public collectionLocalizacao: any = [
        {id: '1', nome: 'Urbana'},
        {id: '2', nome: 'Rural'},
    ];

    public collectionTipoDomicilio: any = [
        {id: '1', nome: 'Casa'},
        {id: '2', nome: 'Apartamento'},
        {id: '3', nome: 'Cômodo'},
        {id: '4', nome: 'Outro'},
    ];

    public collectionAccesoDomicilio: any = [
        {id: '1', nome: 'Pavimento'},
        {id: '2', nome: 'Chão batido'},
        {id: '3', nome: 'fluvial'},
        {id: '4', nome: 'Outro'},
    ];

    public collectionParedeAlvenaria: any = [
        {id: '1', nome: 'Com revestimento'},
        {id: '2', nome: 'Sem revestimento'},
    ];

    public collectionParedeTaipa: any = [
        {id: '1', nome: 'Com revestimento'},
        {id: '2', nome: 'Sem revestimento'},
    ];
    public collectionParedeOutros: any = [
        {id: '1', nome: 'Madeira aparelhada'},
        {id: '2', nome: 'Material aproveitado'},
        {id: '3', nome: 'Palha'},
        {id: '4', nome: 'Outro material'},
    ];

    public collectionAbastecimentoAgua: any = [
        {id: '1', nome: 'Rede encanada até o domicílio'},
        {id: '2', nome: 'Poço/Nascente no domicílio'},
        {id: '3', nome: 'Cisterna'},
        {id: '4', nome: 'Carro pipa'},
        {id: '5', nome: 'Outro'}
    ];

    public collectionEscoamentoBanheiro: any = [
        {id: '1', nome: 'Rede coletora de esgoto ou pluvial'},
        {id: '2', nome: 'Fossa séptica'},
        {id: '3', nome: 'Fossa rudimentar'},
        {id: '4', nome: 'Direto para um rio, lago ou mar'},
        {id: '5', nome: 'Céu aberto'},
        {id: '6', nome: 'Outra forma'}
    ];

    public collectionConsumoAgua: any = [
        {id: '1', nome: 'Filtrada'},
        {id: '2', nome: 'Fervida'},
        {id: '3', nome: 'Clorada'},
        {id: '4', nome: 'Mineral'},
        {id: '5', nome: 'Sem tratamento'}
    ];

    public collectionDestinoLixo: any = [
        {id: '1', nome: 'Coletado'},
        {id: '2', nome: 'Queimado/Enterrado'},
        {id: '3', nome: 'Céu aberto'},
        {id: '4', nome: 'Outro'}
    ];

    public collectionAnimal: any = [
        {id: '1', nome: 'Gato'},
        {id: '2', nome: 'Cachorro'},
        {id: '3', nome: 'Pássaro'},
        {id: '4', nome: 'Outro'}
    ];

    static CRUD_CREATE: string = 'CREATE';
    static CRUD_UPDATE: string = 'UPDATE';
    static CRUD_READ: string = 'READ';

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
        private Authorizer: AuthService,
        private env: EnvService,
        private geolocation: Geolocation,
        private popoverController: PopoverController,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.consultarUFs();
        this.activatedRoute.params.subscribe(
            data => {
                //"data" carries all the parameters
                this.shareCodigo = data.codigo;
                this.model.codigo = data.codigo;
                console.log('CodigoCadastroDomiciliar', this.model.codigo);
                if (this.model.codigo) {
                    this.CRUDCadastroDomiciliar(CadastroDomiciliarFormPage.CRUD_READ);
                }else{
                    this.getCoordinates();
                }
            });

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
            || (procedure === 'spCarregaUFs')
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

    private consultarUFs() {
        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, (resultado) => {
            this.collectionUfs = JSON.parse(atob(resultado.results));
        });
    }

    CRUDCadastroDomiciliar(_statusCRUD: string) {
        this.sendRequest('spCRUDCadastroDomiciliar', {
            StatusCRUD: _statusCRUD,
            formValues: this.model
        }, (resultado) => {
            switch (_statusCRUD) {
                case 'CREATE':
                    this.model.codigo = JSON.parse(atob(resultado.results))[0].codigo;
                    this.showAddFotoOption(this.model.codigo)
                    this.goBack();
                    break;
                case 'UPDATE':
                    this.goBack();
                    break;
                case 'READ':
                    const res = JSON.parse(atob(resultado.results))[0];
                    console.log(res);
                    for (const key in res) {
                        if (this.model.hasOwnProperty(key)) {
                            this.model[key] = (res[key] === 'null') ? '' : res[key];
                            switch (key) {
                                case 'sem_numero':
                                    this.flagSemNumero = (res[key] === 'S') ? true : false;
                                    break;
                                case 'uf':
                                    for (const valor in this.collectionUfs) {
                                        if (this.collectionUfs[valor].Sigla === this.model[key]) {
                                            this.uf = this.collectionUfs[valor];
                                            console.log(this.uf);
                                        }
                                    }
                                    break;
                                case 'fora_area':
                                    this.flagForaArea = (res[key] === 'S') ? true : false;
                                    break;
                                case 'tipo_imovel':
                                    for (const valor in this.collectionTipoImovel) {
                                        if (parseInt(this.collectionTipoImovel[valor].id) === this.model[key]) {
                                            this.tipo_imovel = this.collectionTipoImovel[valor];
                                            console.log(this.tipo_imovel);
                                        }
                                    }
                                    break;
                                case 'situacao_moradia':
                                    for (const valor in this.collectionSituacaoMoradia) {
                                        if (this.collectionSituacaoMoradia[valor].id === this.model[key]) {
                                            this.situacao_moradia = this.collectionSituacaoMoradia[valor];
                                            console.log(this.situacao_moradia);
                                        }
                                    }
                                    break;
                                case 'localizacao':
                                    for (const valor in this.collectionLocalizacao) {
                                        if (this.collectionLocalizacao[valor].id === this.model[key]) {
                                            this.localizacao = this.collectionLocalizacao[valor];
                                            console.log(this.localizacao);
                                        }
                                    }
                                    break;
                                case 'tipo_domicilio':
                                    for (const valor in this.collectionTipoDomicilio) {
                                        if (this.collectionTipoDomicilio[valor].id === this.model[key]) {
                                            this.tipo_domicilio = this.collectionTipoDomicilio[valor];
                                            console.log(this.tipo_domicilio);
                                        }
                                    }
                                    break;
                                case 'tipo_acesso_domicilio':
                                    for (const valor in this.collectionAccesoDomicilio) {
                                        if (this.collectionAccesoDomicilio[valor].id === this.model[key]) {
                                            this.tipo_acesso_domicilio = this.collectionAccesoDomicilio[valor];
                                            console.log(this.tipo_acesso_domicilio);
                                        }
                                    }
                                    break;
                                case 'energia_eletrica':
                                    this.flagEnergia = (res[key] === 'S') ? true : false;
                                    break;
                                case 'material_predominante_alvenaria':
                                    for (const valor in this.collectionParedeAlvenaria) {
                                        if (this.collectionParedeAlvenaria[valor].id === this.model[key]) {
                                            this.parede_alvenaria = this.collectionParedeAlvenaria[valor];
                                            console.log(this.parede_alvenaria);
                                        }
                                    }
                                    break;
                                case 'material_predominante_taipa':
                                    for (const valor in this.collectionParedeTaipa) {
                                        if (this.collectionParedeTaipa[valor].id === this.model[key]) {
                                            this.parede_taipa = this.collectionParedeTaipa[valor];
                                            console.log(this.parede_taipa);
                                        }
                                    }
                                    break;
                                case 'material_predominante_outros':
                                    for (const valor in this.collectionParedeOutros) {
                                        if (this.collectionParedeOutros[valor].id === this.model[key]) {
                                            this.parede_outros = this.collectionParedeOutros[valor];
                                            console.log(this.parede_outros);
                                        }
                                    }
                                    break;
                                case 'abastecimento_agua':
                                    for (const valor in this.collectionAbastecimentoAgua) {
                                        if (this.collectionAbastecimentoAgua[valor].id === this.model[key]) {
                                            this.abastecimento_agua = this.collectionAbastecimentoAgua[valor];
                                            console.log(this.abastecimento_agua);
                                        }
                                    }
                                    break;
                                case 'forma_escoamento_banheiro':
                                    for (const valor in this.collectionEscoamentoBanheiro) {
                                        if (this.collectionEscoamentoBanheiro[valor].id === this.model[key]) {
                                            this.escoamento_banheiro = this.collectionEscoamentoBanheiro[valor];
                                            console.log(this.escoamento_banheiro);
                                        }
                                    }
                                    break;
                                case 'agua_consumo_domicilio':
                                    for (const valor in this.collectionConsumoAgua) {
                                        if (this.collectionConsumoAgua[valor].id === this.model[key]) {
                                            this.abastecimento_agua = this.collectionConsumoAgua[valor];
                                            console.log(this.abastecimento_agua);
                                        }
                                    }
                                    break;
                                case 'destino_lixo':
                                    for (const valor in this.collectionDestinoLixo) {
                                        if (this.collectionDestinoLixo[valor].id === this.model[key]) {
                                            this.destino_lixo = this.collectionDestinoLixo[valor];
                                            console.log(this.destino_lixo);
                                        }
                                    }
                                    break;
                                case 'tem_animal':
                                    this.flagAnimais = (res[key] === 'S') ? true : false;
                                    break;
                                case 'animal_gato':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectAnimal('1');
                                    }
                                    break;
                                case 'animal_cachorro':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectAnimal('2');
                                    }
                                    break;
                                case 'animal_passaro':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectAnimal('3');
                                    }
                                    break;
                                case 'animal_outros':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectAnimal('4');
                                    }
                                    break;
                                case 'termo_recusa':
                                    this.flagTermoRecusa = (res[key] === 'S') ? true : false;
                                    break;
                                case 'tem_outros_profissionais_saude':
                                    this.flagTemOutroProf = (res[key] === 'S') ? true : false;
                                    break;
                                case 'termo_recusa_instituicao_permanencia':
                                    this.flagTermoRecusaInstitucao = (res[key] === 'S') ? true : false;
                                    break;

                            }
                        }
                    }
                    break;
                default:
                // code block
            }
        });
    }

    salvar() {
        if ((this.model.data_cadastro !== null) && (this.model.data_cadastro !== '')) {
            this.model.data_cadastro = this.formatarData2(this.model.data_cadastro);
            console.log(this.model.data_cadastro);
        }
        if ((this.uf !== undefined) && (this.uf !== '')) {
            this.model.uf = this.uf.Sigla;
        }

        if ((this.tipo_imovel !== undefined) && (this.tipo_imovel !== '')) {
            this.model.tipo_imovel = this.tipo_imovel.id;
        }
        if ((this.situacao_moradia !== undefined) && (this.situacao_moradia !== '')) {
            this.model.situacao_moradia = this.situacao_moradia.id;
        }
        if ((this.localizacao !== undefined) && (this.localizacao !== '')) {
            this.model.localizacao = this.localizacao.id;
        }
        if ((this.tipo_domicilio !== undefined) && (this.tipo_domicilio !== '')) {
            this.model.tipo_domicilio = this.tipo_domicilio.id;
        }
        if ((this.tipo_acesso_domicilio !== undefined) && (this.tipo_acesso_domicilio !== '')) {
            this.model.tipo_acesso_domicilio = this.tipo_acesso_domicilio.id;
        }
        //
        if ((this.parede_alvenaria !== undefined) && (this.parede_alvenaria !== '')) {
            this.model.material_predominante_alvenaria = this.parede_alvenaria.id;
        }
        if ((this.parede_taipa !== undefined) && (this.parede_taipa !== '')) {
            this.model.material_predominante_taipa = this.parede_taipa.id;
        }
        if ((this.parede_outros !== undefined) && (this.parede_outros !== '')) {
            this.model.material_predominante_outros = this.parede_outros.id;
        }
        if ((this.abastecimento_agua !== undefined) && (this.abastecimento_agua !== '')) {
            this.model.abastecimento_agua = this.abastecimento_agua.id;
        }
        if ((this.escoamento_banheiro !== undefined) && (this.escoamento_banheiro !== '')) {
            this.model.forma_escoamento_banheiro = this.escoamento_banheiro.id;
        }
        if ((this.agua_consumo_domicilio !== undefined) && (this.agua_consumo_domicilio !== '')) {
            this.model.agua_consumo_domicilio = this.agua_consumo_domicilio.id;
        }
        if ((this.destino_lixo !== undefined) && (this.destino_lixo !== '')) {
            this.model.destino_lixo = this.destino_lixo.id;
        }

        let statusCRUD = this.model.codigo > 0 ? 'UPDATE' : 'CREATE';
        if (statusCRUD === 'CREATE') {
            this.model.usuario = parseInt(this.Authorizer.CodigoUsuarioSistema);
            this.CRUDCadastroDomiciliar(CadastroDomiciliarFormPage.CRUD_CREATE);
        } else if ((statusCRUD === 'UPDATE') && (this.model.usuario === parseInt(this.Authorizer.CodigoUsuarioSistema))) {
            this.CRUDCadastroDomiciliar(CadastroDomiciliarFormPage.CRUD_UPDATE);
        }

    }

    goBack() {
        this.router.navigate(['/cadastro-domiciliar']);
    }

    getCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.model.latitude = resp.coords.latitude;
            this.model.longitude = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    async showAddFotoOption(codgioItem: any) {

        const alert = await this.alertController.create({
            header: 'ATENÇÃO',
            message: 'Você deseja agregar fotos no cadastro? ',
            buttons: [
                {
                    text: 'Não',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.goBack();
                    }
                }, {
                    text: 'Sim',
                    handler: () => {
                        console.log('codigoCadatroDomiciliar',codgioItem)
                        this.gotoCadastroDomiciliarFotos(codgioItem);
                    }
                }
            ]
        });

        await alert.present();
    }

    gotoCadastroDomiciliarFotos(codigoItem){
        if(codigoItem){
            this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-foto',codigoItem]);
        }else{
            this.router.navigate(['/cadastro-individual-foto',this.model.codigo]);
        }

    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

    changeSelectUf(item) {
        console.log(item);
        this.uf = item;
        // this.carregarSelectMunicipio()
    }

    public changeCheck(modelAttr, flag) {
        this.model[modelAttr] = (this[flag]) ? 'S' : 'N';

        if (flag === 'flagSemNumero') {
            if (this.flagSemNumero) {
                this.model.numero = 0;
            }
        } else if (flag === 'flagForaArea') {
            if (this.flagForaArea) {
                this.model.microarea = '';
            }
        } else if (flag === 'flagAnimais') {
            if (this.flagAnimais) {
                this.animal = [];
                this.model.animal_total = 0
            }
        } else if (flag === 'flagTermoRecusa') {
            if (this.flagTermoRecusa) {
                this.model.termo_recusa_nome = '';
                this.model.termo_recusa_rg = '';
            }

        } else if (flag === 'flagTemOutroProf') {
            if (this.flagTemOutroProf) {
                this.model.nome_instituicao_permanencia = '';
                this.model.responsavel_tecnico_nome = '';
                this.model.responsavel_tecnico_cns = '';
                this.model.responsavel_tecnico_telefone = '';
                this.model.responsavel_tecnico_cargo = '';
            }

        } else if (flag === 'flagTermoRecusaInstitucao') {
            if (this.flagTermoRecusaInstitucao) {
                this.model.termo_recusa_instituicao_permanencia_nome = '';
                this.model.termo_recusa_instituicao_permanencia_rg = ''
            }
        }
    }

    public changeSelect(item, selectName) {
        console.log(item);
        console.log(selectName);
        this[selectName] = item;
    }

    public changeSelectAnimal(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.animal_gato = 'S';
                        break;
                    case '2':
                        this.model.animal_cachorro = 'S';
                        break;
                    case '3':
                        this.model.animal_passaro = 'S';
                        break;
                    case '4':
                        this.model.animal_outros = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
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
            const diaMesAno = data.split('-');
            return diaMesAno[2] + '/' + diaMesAno[1] + '/' + diaMesAno[0];
        } else {
            return strData;
        }
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

    isNumber2(valString: any, event: any) {
        const pattern = /[0-9]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
            return;
        }
        let val: string = valString;
        if (typeof (val) == 'undefined')
            val = '';
        if (val == null)
            val = '';
        if (val.length == 18)
            event.preventDefault();
    }

    /* ------------------------------------------- MASK FONE ------------------------------------------ */

    /* ValString: value to be validated
      idComponent: this is the id of your HTML component. For example id=""
    */
    formatTelefone(valString) {
        if (!valString) {
            return '';
        }
        if (typeof (valString) == 'undefined')
            return '';
        //552.485.001-68
        //06.060.937/0001-39
        let val: string = valString;
        val = val.replace('.', '');
        val = val.replace('.', '');
        val = val.replace('-', '');
        val = val.replace('/', '');
        val = val.replace('-', '');
        val = val.replace('(', '');
        val = val.replace(')', '');
        val = val.trim();

        if (val.length > 4 && val.length < 7) {
            let par1 = val.substring(0, 3);
            let par2 = val.substring(3);
            val = '(' + par1 + ')' + par2;
        } else if (val.length > 6 && val.length < 11) {
            let par1 = val.substring(0, 3);
            let par2 = val.substring(3, 6);
            let par3 = val.substring(6);
            val = '(' + par1 + ')' + par2 + '-' + par3;
        }

        if (val.length > 14)
            val = val.substring(0, 14);
        return val;
    }

    /* ------------------------------------------- END MASK FONE ------------------------------------------ */

    addToSelectAnimal(id) {
        for (const valor in this.collectionAnimal) {
            if (this.collectionAnimal[valor].id === id) {
                this.animal.push(this.collectionAnimal[valor].id);
            }
        }
    }

}
