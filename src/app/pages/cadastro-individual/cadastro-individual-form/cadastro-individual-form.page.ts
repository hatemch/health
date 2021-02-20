import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, PopoverController, LoadingController, AlertController} from '@ionic/angular';
import {CadastroIndividual} from '../../../models/CadastroIndividual';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {AlertService} from '../../../services/alert.service';
import {AuthService} from '../../../services/auth.service';
import {EnvService} from '../../../services/env.service';
import {Router, ActivatedRoute} from '@angular/router';

import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-cadastro-individual-form',
    templateUrl: './cadastro-individual-form.page.html',
    styleUrls: ['./cadastro-individual-form.page.scss'],
})
export class CadastroIndividualFormPage implements OnInit {

    public subtitle = 'Cadastro Individual ';
    public step = 0; //this
    public ShowFotos = false;

    public flagResponsavelF = false;
    public flagForaArea = false;
    public flagMae = false;
    public flagPai = false;

    public flagFEscola = false;

    public model = new CadastroIndividual();

    public flagCuidadorT = false;
    public flagGComunitario = false;
    public flagSaudeP = false;
    public flagPovoTradic = false;
    public flagOrientacaoS = false;
    public flagIdentidadeG = false;
    public flagDeficiencia = false;

    public flagMudanca = false;
    public flagObito = false;

    public flagTermoRecusa = false;

    public flagGestante = false;
    public flagFumante = false;
    public flagAlcool = false;
    public flagDrogas = false;
    public flagArterial = false;
    public flagDiabetes = false;
    public flagAvcDerrame = false;
    public flagInfarto = false;
    public flagDoencaCardiaca = false;
    public flagRins = false;
    public flagPulmao = false;
    public flagHanseniase = false;
    public flagTuberculose = false;
    public flagCancer = false;
    public flagInterazaoU = false;
    public flagSaudeMental = false;
    public flagAcamado = false;
    public flagDomiciliado = false;
    public flagPlantasMed = false;
    public flagOutraPraticas = false;
    public flagOutraCondicaoS = false;

    public flagSituacaoRua = false;
    public flagBeneficio = false;
    public flagReferFam = false;
    public flagInstitusion = false;
    public flagVisitaFamiliar = false;
    public flagHigiene = false;

    public sexo;
    public raca_cor: any = [];
    public nacionalidade: any = [];
    public uf;

    public crianca_fica: any = [];
    public orientacao_sexual;
    public identidade_genero;
    public deficiencia: any = [];

    public peso;
    public doenca_cardiaca: any = [];
    public rins: any = [];
    public pulmao: any = [];

    public situacaorua;
    public quantidade;
    public alimentacao: any = [];
    public higiene: any = [];
    // mask
    private DECIMAL_SEPARATOR = '.';
    private GROUP_SEPARATOR = ',';
    static CRUD_CREATE: string = 'CREATE';
    static CRUD_UPDATE: string = 'UPDATE';
    static CRUD_READ: string = 'READ';


    public collectionNacionalidade: any = [
        {id: 'brasileira', nome: 'Brasileira'},
        {id: 'naturalizado', nome: 'Naturalizado'},
        {id: 'estrangeiro', nome: 'Estrangeiro'},
    ];
    public collectionRacaCor: any = [
        {id: 'branca', nome: 'Branca'},
        {id: 'preta', nome: 'Preta'},
        {id: 'parda', nome: 'Parda'},
        {id: 'amarela', nome: 'Amarela'},
        {id: 'indigena', nome: 'Indígena'},
    ];

    public collectionSexo: any = [
        {id: 'masculino', nome: 'Masculino'},
        {id: 'feminino', nome: 'Feminino'},
    ];

    public collectionUfs: any = [{
        CodigoBaseUF: 0,
        Nome: '',
        Sigla: ''
    }];

    public collectionParentesco: any = [
        {id: 'conjuge', nome: 'Cônjuge/Companheiro(a)'},
        {id: 'filho', nome: 'Filho(a)'},
        {id: 'entiado', nome: 'Entiado(a)'},
        {id: 'neto_bisneto', nome: 'Neto(a)/Bisneto(a)'},
        {id: 'pai_mae', nome: 'Pai/Mãe'},
        {id: 'sogro', nome: 'Sogro(a)'},
        {id: 'irmao', nome: 'Irmão/Irmã'},
        {id: 'genro_nora', nome: 'Genro/Nora'},
        {id: 'outro_parente', nome: 'Outro parente'},
        {id: 'nao_parente', nome: 'Não parente'},
    ];

    public collectionCurso: any = [
        {id: '1', nome: 'Creche'},
        {id: '2', nome: 'Pré-escola (exceto CA)'},
        {id: '3', nome: 'Classe Alfabetizada - CA'},
        {id: '4', nome: 'Ensino Fundamental 1ª a 4ª séries'},
        {id: '5', nome: 'Ensino Fundamental 5ª a 8ª séries'},
        {id: '6', nome: 'Ensino Fundamental Completo'},
        {id: '7', nome: 'Ensino Fundamental Especial'},
        {id: '8', nome: 'Ensino Fundamental EJA - séries iniciais (Supletivo 1ª a 4ª)'},
        {id: '9', nome: 'Ensino Fundamental EJA - séries finais (Supletivo 5ª a 9ª)'},
        {id: '10', nome: 'Ensino Méido, Médio 2º Ciclo (Científico, Técnico e etc)'},
        {id: '11', nome: 'Ensino Méido Especial'},
        {id: '12', nome: 'Ensino Méido EJA (Supletivo)'},
        {id: '13', nome: 'Superior, Aperfeiçoamento, Especialização, Mestrado, Doutorado'},
        {id: '14', nome: 'Alfabetização para Adultos (Mobral, etc)'},
        {id: '15', nome: 'Nenhum'}
    ];
    public collectionMercadoTrabalho: any = [
        {id: '1', nome: 'Empregador'},
        {id: '2', nome: 'Assalariado com carteira de trabalho'},
        {id: '3', nome: 'Assalariado sem carteira de trabalho'},
        {id: '4', nome: 'Autônomo com previdência social'},
        {id: '5', nome: 'Autônomo sem previdência social'},
        {id: '6', nome: 'Aposentado/Pensionista'},
        {id: '7', nome: 'Desempregado'},
        {id: '8', nome: 'Não trabalha'},
        {id: '9', nome: 'Outro'},
    ];

    public collectionCriancaFica: any = [
        {id: '1', nome: 'Adulto responsável'},
        {id: '2', nome: 'Outra(s) criança(s)'},
        {id: '3', nome: 'Adolescente'},
        {id: '4', nome: 'Sozinha'},
        {id: '5', nome: 'Creche'},
        {id: '6', nome: 'Outro'},
    ];

    public collectionOrientacaoSexual: any = [
        {id: '1', nome: 'Heterossexual'},
        {id: '2', nome: 'Homossexual (gay/lésbica)'},
        {id: '3', nome: 'Bissexual'},
        {id: '4', nome: 'Outro'},
    ];

    public collectionIdentidadeGenero: any = [
        {id: '1', nome: 'Homem transexual'},
        {id: '2', nome: 'Mulher transexual'},
        {id: '3', nome: 'Travesti'},
        {id: '4', nome: 'Outro'},
    ];

    public collectionDeficiencia: any = [
        {id: '1', nome: 'Auditiva'},
        {id: '2', nome: 'Visual'},
        {id: '3', nome: 'Intelectual/Cognitiva'}, // intelectual_cognitiva
        {id: '4', nome: 'Física'},
        {id: '5', nome: 'Outra'},
    ];

    public collectionPeso: any = [
        {id: '1', nome: 'Abaixo do peso'},
        {id: '2', nome: 'Peso adequado'},
        {id: '3', nome: 'Acima do peso'},
    ];

    public collectionDoencaCardiaca: any = [
        {id: '1', nome: 'Insuficiência renal'},
        {id: '2', nome: 'Outro'},
        {id: '3', nome: 'Não sabe'},
    ];

    public collectionProblemaRins: any = [
        {id: '1', nome: 'Insuficiência renal'},
        {id: '2', nome: 'Outro'},
        {id: '3', nome: 'Não sabe'},
    ];

    public collectionDoencaPulmao: any = [
        {id: '1', nome: 'Asma'},
        {id: '2', nome: 'DPOC/Enfisema'},
        {id: '3', nome: 'Outro'},
        {id: '4', nome: 'Não sabe'},
    ];

    public collectionSituacaoRua: any = [
        {id: '1', nome: '6 meses'},
        {id: '2', nome: 'De 6 a 12 meses'},
        {id: '3', nome: 'De 1 a 5 anos'},
        {id: '4', nome: '5 anos'},
    ];
    public collectionQuantidade: any = [
        {id: '1', nome: '1 vez'},
        {id: '2', nome: '2 ou 3 vezes'},
        {id: '3', nome: 'mais de 3 vezes'},
    ];
    public collectionAlimentacao: any = [
        {id: '1', nome: 'Restaurante Popular'},
        {id: '2', nome: 'Doação de Grupo Religioso'},
        {id: '3', nome: 'Doação de Restaurante'},
        {id: '4', nome: 'Doação de Popular'},
        {id: '5', nome: 'Outros'},
    ];
    public collectionHigiene: any = [
        {id: '1', nome: 'Banho'},
        {id: '2', nome: 'Acesso ao sanitário'},
        {id: '3', nome: 'Higiene bucal'},
        {id: '4', nome: 'Outras'},
    ];
    public collectionMunicipios: any = [{
        CodigoBaseUF: 0,
        CodigoBaseMunicipio: 0
    }];
    public loading: any;

    constructor(
        private navCtrl: NavController,
        private alertService: AlertService,
        private alertController: AlertController,
        private Authorizer: AuthService,
        private env: EnvService,
        private popoverController: PopoverController,
        private router: Router,
        private geolocation: Geolocation,
        public activatedRoute: ActivatedRoute,
        public loadingController: LoadingController,
    ) {
    }

    ngOnInit() {
        this.consultarUFs();
        this.activatedRoute.params.subscribe(
            data => {
                //"data" carries all the parameters
                this.model.codigo = data.codigo;
                console.log('CodigoCadastroIndividual', this.model.codigo);
                if (this.model.codigo) {
                    this.ShowFotos=true;
                    this.subtitle = 'Editar Cadastro Individual';
                    this.CRUDCadastroIndividual(CadastroIndividualFormPage.CRUD_READ);
                }
            });
        this.getCoordinates();

    }

    ionViewWillEnter() {
        // Disparado quando o roteamento de componentes está prestes a se animar.

    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Carregando...'
        });
        await this.loading.present();
    }

    private sendRequest(
        procedure: string,
        params: { StatusCRUD: string; formValues: any; },
        next: any) {
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
    }


    CRUDCadastroIndividual(_statusCRUD: string) {
        this.sendRequest('spCRUDCadastroIndividual', {
            StatusCRUD: _statusCRUD,
            formValues: this.model
        }, (resultado) => {
            switch (_statusCRUD) {
                case 'CREATE':
                    this.model.codigo = JSON.parse(atob(resultado.results))[0].codigo;
                    this.showAddFotoOption(this.model.codigo)
                    //this.goBack();
                    //this.CRUDCadastroIndividual('spCRUDCadastroIndividual', 'READ', {codigo: this.model.codigo});
                    break;
                case 'UPDATE':
                    this.router.navigate(['/cadastro-individual']);
                    this.goBack();
                   //this.CRUDCadastroIndividual('spCRUDCadastroIndividual', 'READ', {codigo: this.model.codigo});
                    break;
                case 'READ':
                    const res = JSON.parse(atob(resultado.results))[0];
                    console.log(res);
                    for (const key in res) {
                        if (this.model.hasOwnProperty(key)) {
                            this.model[key] = (res[key] === 'null') ? '' : res[key];
                            switch (key) {
                                case 'responsavel_familiar':
                                    this.flagResponsavelF = (res[key] === 'S') ? true : false;
                                    break;
                                case 'fora_area':
                                    this.flagForaArea = (res[key] === 'S') ? true : false;
                                    break;
                                case 'sexo':
                                    for (const valor in this.collectionSexo) {
                                        if (this.collectionSexo[valor].nome === this.model[key]) {
                                            this.sexo = this.collectionSexo[valor];
                                            console.log(this.sexo);
                                        }
                                    }
                                    break;
                                case 'raca_cor':
                                    for (const valor in this.collectionRacaCor) {
                                        if (this.collectionRacaCor[valor].id === this.model[key]) {
                                            this.raca_cor = this.collectionRacaCor[valor];
                                            console.log(this.raca_cor);
                                        }
                                    }
                                    break;
                                case 'nome_mae_desconhecido':
                                    this.flagMae = (res[key] === 'S') ? true : false;
                                    break;
                                case 'nome_pai_desconhecido':
                                    this.flagPai = (res[key] === 'S') ? true : false;
                                    break;
                                case 'nacionalidade':
                                    for (const valor in this.collectionNacionalidade) {
                                        if (this.collectionNacionalidade[valor].id === this.model[key]) {
                                            this.nacionalidade = this.collectionNacionalidade[valor];
                                            console.log(this.nacionalidade);
                                        }
                                    }
                                    break;
                                case 'uf_nascimento':
                                    for (const valor in this.collectionUfs) {
                                        if (this.collectionUfs[valor].Sigla === this.model[key]) {
                                            this.uf = this.collectionUfs[valor];
                                            console.log(this.uf);
                                        }
                                    }
                                    break;
                                case 'frequenta_escola_creche':
                                    this.flagFEscola = (res[key] === 'S') ? true : false;
                                    break;
                                case 'crianca_fica_adolescente':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectCrianca('3');
                                    }
                                    break;
                                case 'crianca_fica_outra_crianca':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectCrianca('2');
                                    }
                                    break;
                                case 'crianca_fica_adulto_resp':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectCrianca('1');
                                    }
                                    break;
                                case 'crianca_fica_creche':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectCrianca('5');
                                    }
                                    break;
                                case 'crianca_fica_outro':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectCrianca('6');
                                    }
                                    break;
                                case 'crianca_fica_sozinha':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectCrianca('4');
                                    }
                                    break;
                                case 'frequenta_cuidador_tradicional':
                                    this.flagCuidadorT = (res[key] === 'S') ? true : false;
                                    break;
                                case 'participa_grupo_comunitario':
                                    this.flagGComunitario = (res[key] === 'S') ? true : false;
                                    break;
                                case 'plano_saude_privado':
                                    this.flagSaudeP = (res[key] === 'S') ? true : false;
                                    break;
                                case 'membro_povo_tradicional':
                                    this.flagPovoTradic = (res[key] === 'S') ? true : false;
                                    break;
                                case 'informar_orientacao_sexual':
                                    this.flagOrientacaoS = (res[key] === 'S') ? true : false;
                                    break;
                                case 'informar_orientacao_sexual_desc':
                                    for (const valor in this.collectionOrientacaoSexual) {
                                        if (this.collectionOrientacaoSexual[valor].nome === this.model[key]) {
                                            this.orientacao_sexual = this.collectionOrientacaoSexual[valor];
                                            console.log(this.orientacao_sexual);
                                        }
                                    }
                                    break;
                                case 'informar_identidade_genero':
                                    this.flagIdentidadeG = (res[key] === 'S') ? true : false;
                                    break;
                                case 'informar_identidade_genero_desc':
                                    for (const valor in this.collectionIdentidadeGenero) {
                                        if (this.collectionIdentidadeGenero[valor].nome === this.model[key]) {
                                            this.identidade_genero = this.collectionIdentidadeGenero[valor];
                                            console.log(this.identidade_genero);
                                        }
                                    }
                                    break;
                                case 'tem_alguma_deficiencia':
                                    this.flagDeficiencia = (res[key] === 'S') ? true : false;
                                    break;
                                case 'deficiencia_auditiva':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDeficiencia('1')
                                    }
                                    break;
                                case 'deficiencia_visual':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDeficiencia('2')
                                    }
                                    break;
                                case 'deficiencia_intelectual':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDeficiencia('3')
                                    }
                                    break;
                                case 'deficiencia_fisica':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDeficiencia('4')
                                    }
                                    break;
                                case 'deficiencia_outra':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDeficiencia('5')
                                    }
                                    break;
                                case 'saida_cidadao_cadastro':
                                    if (res[key] === 'Mudança de território') {
                                        this.flagMudanca = true;
                                        this.flagObito = false;
                                    } else {
                                        this.flagObito = true;
                                        this.flagMudanca = false;
                                    }
                                    break;
                                case 'termo_recusa':
                                    this.flagTermoRecusa = (res[key] === 'S') ? true : false;
                                    break;
                                case 'gestante':
                                    this.flagGestante = (res[key] === 'S') ? true : false;
                                    break;
                                case 'peso':
                                    for (const valor in this.collectionPeso) {
                                        if (this.collectionPeso[valor].nome === this.model[key]) {
                                            this.peso = this.collectionPeso[valor];
                                            console.log(this.peso);
                                        }
                                    }
                                    break;
                                case 'fumante':
                                    this.flagFumante = (res[key] === 'S') ? true : false;
                                    break;
                                case 'faz_uso_alcool':
                                    this.flagAlcool = (res[key] === 'S') ? true : false;
                                    break;
                                case 'faz_uso_outras_drogas':
                                    this.flagDrogas = (res[key] === 'S') ? true : false;
                                    break;
                                case 'hipertensao_arterial':
                                    this.flagArterial = (res[key] === 'S') ? true : false;
                                    break;
                                case 'diabetes':
                                    this.flagDiabetes = (res[key] === 'S') ? true : false;
                                    break;
                                case 'avc_derrame':
                                    this.flagAvcDerrame = (res[key] === 'S') ? true : false;
                                    break;
                                case 'infarto':
                                    this.flagInfarto = (res[key] === 'S') ? true : false;
                                    break;
                                case 'doenca_cardiaca':
                                    this.flagDoencaCardiaca = (res[key] === 'S') ? true : false;
                                    break;
                                case 'cardiaca_insuficiencia_cardiaca':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoenciaCardiaca('1')
                                    }
                                    break;
                                case 'cardiaca_outro':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoenciaCardiaca('2')
                                    }
                                    break;
                                case 'cardiaca_nao_sabe':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoenciaCardiaca('3')
                                    }
                                    break;
                                case 'problema_rins':
                                    this.flagRins = (res[key] === 'S') ? true : false;
                                    break;
                                case 'rins_insuficiencia_renal':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectProblemaRins('1')
                                    }
                                    break;
                                case 'rins_outro':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectProblemaRins('2')
                                    }
                                    break;
                                case 'rins_nao_sabe':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectProblemaRins('3')
                                    }
                                    break;
                                case 'doenca_pulmao':
                                    this.flagPulmao = (res[key] === 'S') ? true : false;
                                    break;
                                case 'pulmao_asma':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoencaPulmao('1')
                                    }
                                    break;
                                case 'pulmao_enfisema':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoencaPulmao('2')
                                    }
                                    break;
                                case 'pulmao_outro':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoencaPulmao('3')
                                    }
                                    break;
                                case 'pulmao_nao_sabe':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectDoencaPulmao('4')
                                    }
                                    break;
                                case 'hanseniase':
                                    this.flagHanseniase = (res[key] === 'S') ? true : false;
                                    break;
                                case 'tuberculose':
                                    this.flagTuberculose = (res[key] === 'S') ? true : false;
                                    break;
                                case 'cancer':
                                    this.flagCancer = (res[key] === 'S') ? true : false;
                                    break;
                                case 'internacao_ultimos_doze_meses':
                                    this.flagInterazaoU = (res[key] === 'S') ? true : false;
                                    break;
                                case 'problema_saude_mental':
                                    this.flagSaudeMental = (res[key] === 'S') ? true : false;
                                    break;
                                case 'acamado':
                                    this.flagAcamado = (res[key] === 'S') ? true : false;
                                    break;
                                case 'domiciliado':
                                    this.flagDomiciliado = (res[key] === 'S') ? true : false;
                                    break;
                                case 'usa_plantas_medicinais':
                                    this.flagPlantasMed = (res[key] === 'S') ? true : false;
                                    break;
                                case 'usa_outras_praticas_complementares':
                                    this.flagOutraPraticas = (res[key] === 'S') ? true : false;
                                    break;
                                case 'condicao_saude':
                                    this.flagOutraCondicaoS = (res[key] === 'S') ? true : false;
                                    break;
                                case 'situacao_de_rua':
                                    this.flagSituacaoRua = (res[key] === 'S') ? true : false;
                                    break;
                                case 'tempo_situacao_rua':
                                    for (const valor in this.collectionSituacaoRua) {
                                        if (this.collectionSituacaoRua[valor].nome === this.model[key]) {
                                            this.situacaorua = this.collectionSituacaoRua[valor];
                                            console.log(this.situacaorua);
                                        }
                                    }
                                    break;
                                case 'recebe_algum_beneficio':
                                    this.flagBeneficio = (res[key] === 'S') ? true : false;
                                    break;
                                case 'possui_referencia_familiar':
                                    this.flagReferFam = (res[key] === 'S') ? true : false;
                                    break;
                                case 'quantas_vezes_alimenta_dia':
                                    for (const valor in this.collectionQuantidade) {
                                        if (this.collectionQuantidade[valor].nome === this.model[key]) {
                                            this.quantidade = this.collectionQuantidade[valor];
                                            console.log(this.quantidade);
                                        }
                                    }
                                    break;
                                case 'origem_restaurante_popular':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectQualOrigem('1');
                                    }
                                    break;
                                case 'origem_doacao_grupo_religioso':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectQualOrigem('2');
                                    }
                                    break;
                                case 'origem_doacao_restaurante':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectQualOrigem('3');
                                    }
                                    break;
                                case 'origem_doacao_popular':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectQualOrigem('4');
                                    }
                                    break;
                                case 'origem_outros':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectQualOrigem('5');
                                    }
                                    break;
                                case 'acompanhado_outra_instituicao':
                                    this.flagInstitusion = (res[key] === 'S') ? true : false;
                                    break;
                                case 'visita_familiar_frequencia':
                                    this.flagVisitaFamiliar = (res[key] === 'S') ? true : false;
                                    break;
                                case 'acesso_higiene_pessoal':
                                    this.flagHigiene = (res[key] === 'S') ? true : false;
                                    break;
                                case 'higiene_banho':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectHigiene('1');
                                    }
                                    break;
                                case 'higiene_acesso_sanitario':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectHigiene('2');
                                    }
                                    break;
                                case 'higiene_bucal':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectHigiene('3');
                                    }
                                    break;
                                case 'higiene_outros':
                                    if (this.model[key] === 'S') {
                                        this.addToSelectHigiene('4');
                                    }
                                    break;
                            }
                            if ((key === 'data_cadastro')
                                || (key === 'data_entrada_brasil')
                                || (key === 'data_nascimento')
                                || (key === 'data_naturalizacao')
                            ) {
                                this.model[key] = this.formatarData3(res[key]);
                            }
                        }
                    }
                    //this.loading.dismiss();
                    break;
                default:
                // code block
            }
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
                        console.log('codigoCadatroIndividual',codgioItem)
                        this.gotoCadastroIndividualFotos(codgioItem);
                    }
                }
            ]
        });

        await alert.present();
    }

    /* ------------------------------------------ DOWNLOAD UFS  -------------------------------------------------*/

    private consultarUFs() {

        this.sendRequest('spCarregaUFs', {
            StatusCRUD: '',
            formValues: ''
        }, (resultado) => {
            this.collectionUfs = JSON.parse(atob(resultado.results));
        });
    }

    /* ------------------------------------------ END DOWNLOAD UFS --------------------------------------------- */


    salvar() {
        if ((this.model.data_cadastro !== null) && (this.model.data_cadastro !== '')) {
            this.model.data_cadastro = this.formatarData2(this.model.data_cadastro);
            console.log(this.model.data_cadastro);
        }
        if ((this.model.data_nascimento !== null) && (this.model.data_nascimento !== '')){
            this.model.data_nascimento = this.formatarData2(this.model.data_nascimento);
            console.log(this.model.data_nascimento);
        }
        if ((this.model.data_naturalizacao !== null) && (this.model.data_naturalizacao !== '')){
            this.model.data_naturalizacao = this.formatarData2(this.model.data_naturalizacao);
            console.log(this.model.data_naturalizacao);
        }

        if ((this.model.data_entrada_brasil !== null) && (this.model.data_entrada_brasil !== '')){
            this.model.data_entrada_brasil = this.formatarData2(this.model.data_entrada_brasil);
            console.log(this.model.data_entrada_brasil);
        }

        if ((this.model.saida_cidadao_data_obito !== null ) && (this.model.saida_cidadao_data_obito !== '')) {
            this.model.saida_cidadao_data_obito = this.formatarData2(this.model.saida_cidadao_data_obito);
            console.log(this.model.saida_cidadao_data_obito);
        }
        if ((this.orientacao_sexual !== undefined) && (this.orientacao_sexual !== '')) {
            this.model.informar_orientacao_sexual_desc = this.orientacao_sexual.nome;
        }
        if ((this.identidade_genero !== undefined) && (this.identidade_genero !== '')) {
            this.model.informar_identidade_genero_desc = this.identidade_genero.nome;
        }
        if ((this.sexo !== undefined) && (this.sexo !== '')) {
            this.model.sexo = this.sexo.nome;
        }
        if ((this.raca_cor !== undefined) && (this.raca_cor !== '')) {
            this.model.raca_cor = this.raca_cor.id;
        }

        if ((this.nacionalidade !== undefined) && (this.nacionalidade !== '')){
            this.model.nacionalidade = this.nacionalidade.id;
        }

        if ((this.peso !== undefined) && (this.peso !== '')) {
            this.model.peso = this.peso.nome;
        }
        if ((this.situacaorua !== undefined) && (this.situacaorua !== '')) {
            this.model.tempo_situacao_rua = this.situacaorua.nome;
        }

        if ((this.quantidade !== undefined) && (this.quantidade !== '')) {
            this.model.quantas_vezes_alimenta_dia = this.quantidade.nome;
        }
        if ((this.uf !== undefined) && (this.uf !== '')) {
            this.model.uf_nascimento = this.uf.Sigla;
        }
        console.log(this.model);

        let statusCRUD =this.model.codigo > 0 ? 'UPDATE' : 'CREATE';
        if (statusCRUD === 'CREATE'){
            this.model.usuario = parseInt(this.Authorizer.CodigoUsuarioSistema);
            this.CRUDCadastroIndividual(CadastroIndividualFormPage.CRUD_CREATE); //this.CRUDCadastroIndividual('spCRUDCadastroIndividual', 'CREATE', this.model);
            //this.goBack();
        } else if ((statusCRUD === 'UPDATE') && (this.model.usuario === parseInt(this.Authorizer.CodigoUsuarioSistema))) {
            this.CRUDCadastroIndividual(CadastroIndividualFormPage.CRUD_UPDATE); // this.CRUDCadastroIndividual('spCRUDCadastroIndividual', 'UPDATE', this.model);
            //this.goBack();
        }
    }

    goBack() {
        this.router.navigate(['/cadastro-individual']);
    }

    goDeletar() {

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

    getCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.model.latitude = resp.coords.latitude;
            this.model.longitude = resp.coords.longitude;
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    gotoCadastroIndividualFotos(codigoItem){
        if(codigoItem){
            this.router.navigate(['/cadastro-individual-foto',codigoItem]);
        }else{
            this.router.navigate(['/cadastro-individual-foto',this.model.codigo]);
        }

    }

    goAssinatura() {
        // this.navCtrl.navigateRoot('/cadastro-individual-assinatura');
        this.router.navigate(['cadastro-individual-assinatura/', this.model.codigo]);
    }

    public changeSelect(modelAttr, e) {
        this.model[modelAttr] = e.target.value;
    }

    public changeCheck(modelAttr, flag) {
        this.model[modelAttr] = (this[flag]) ? 'S' : 'N';

        if (flag === 'flagMudanca') {
            if (this.model.saida_cidadao_cadastro === 'S') {
                this.model.saida_cidadao_cadastro = 'Mudança de território';
                this.model.saida_cidadao_data_obito = '';
                this.model.saida_cidadao_numero_do = '';
            } else {
                this.model.saida_cidadao_cadastro = null;
            }
        } else if (flag === 'flagObito') {
            if (this.model.saida_cidadao_cadastro === 'S') {
                this.model.saida_cidadao_cadastro = 'Óbito';
            } else {
                this.model.saida_cidadao_cadastro = null;
            }
        } else if (flag === 'flagForaArea') {
            if (this.flagForaArea) {
                this.model.microarea = '';
            }
        } else if (flag === 'flagMae') {
            (this.flagMae) ? this.model.nome_mae = '' : '';
        } else if (flag === 'flagPai') {
            (this.flagPai) ? this.model.nome_pai = '' : '';
        }
    }

    changeSelectUf(item) {
        console.log(item);
        this.uf = item;
        // this.carregarSelectMunicipio()
    }

    public changeSelectCriancaFica(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.crianca_fica_adulto_resp = 'S';
                        break;
                    case '2':
                        this.model.crianca_fica_outra_crianca = 'S';
                        break;
                    case '3':
                        this.model.crianca_fica_adolescente = 'S';
                        break;
                    case '4':
                        this.model.crianca_fica_sozinha = 'S';
                        break;
                    case '5':
                        this.model.crianca_fica_creche = 'S';
                        break;
                    case '6':
                        this.model.crianca_fica_outro = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public changeSelects(item, selectName) {
        console.log(item);
        console.log(selectName);
        this[selectName] = item;
    }

    public changeSelectDeficiencia(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.deficiencia_auditiva = 'S';
                        break;
                    case '2':
                        this.model.deficiencia_visual = 'S';
                        break;
                    case '3':
                        this.model.deficiencia_intelectual = 'S';
                        break;
                    case '4':
                        this.model.deficiencia_fisica = 'S';
                        break;
                    case '5':
                        this.model.deficiencia_outra = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public changeSelectDoencaCardiaca(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.cardiaca_insuficiencia_cardiaca = 'S';
                        break;
                    case '2':
                        this.model.cardiaca_outro = 'S';
                        break;
                    case '3':
                        this.model.cardiaca_nao_sabe = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public changeSelectProblemaRins(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.rins_insuficiencia_renal = 'S';
                        break;
                    case '2':
                        this.model.rins_outro = 'S';
                        break;
                    case '3':
                        this.model.rins_nao_sabe = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public changeSelectDoencaPulmao(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.pulmao_asma = 'S';
                        break;
                    case '2':
                        this.model.pulmao_enfisema = 'S';
                        break;
                    case '3':
                        this.model.pulmao_outro = 'S';
                        break;
                    case '4':
                        this.model.pulmao_nao_sabe = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public changeSelectAlimentacao(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.origem_restaurante_popular = 'S';
                        break;
                    case '2':
                        this.model.origem_doacao_grupo_religioso = 'S';
                        break;
                    case '3':
                        this.model.origem_doacao_restaurante = 'S';
                        break;
                    case '4':
                        this.model.origem_doacao_popular = 'S';
                        break;
                    case '5':
                        this.model.origem_outros = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    public changeSelectHigiene(modelAttr, e) {
        this[modelAttr] = e.target.value;
        console.log(this[modelAttr]);
        if (this[modelAttr].length > 0) {
            for (const i in this[modelAttr]) {
                switch (this[modelAttr][i]) {
                    case '1':
                        this.model.higiene_banho = 'S';
                        break;
                    case '2':
                        this.model.higiene_acesso_sanitario = 'S';
                        break;
                    case '3':
                        this.model.higiene_bucal = 'S';
                        break;
                    case '4':
                        this.model.higiene_outros = 'S';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    private formatarData(strData: string) {
        // alterar formato de dd/mm/yyyy HH:mm:ss para yyyy-mm-dd HH:mm:ss
        const datahora = strData.split('T');
        if (datahora.length === 2) {
            const data = datahora[0];
            const hora = datahora[1];
            const min = hora.split('.');
            const diaMesAno = data.split('-');
            return diaMesAno[1] + '/' + diaMesAno[2] + '/' + diaMesAno[0] + ' ' + min[0];
        } else {
            return strData;
        }
    }

    private formatarData3(strData: string) {
        // alterar formato de dd/mm/yyyy HH:mm:ss para yyyy-mm-dd HH:mm:ss
        const datahora = strData.split('T');
        if (datahora.length === 2) {
            const data = datahora[0];
            const hora = datahora[1];
            const diaMesAno = data.split('-');
            return diaMesAno[2] + '-' + diaMesAno[1] + '-' + diaMesAno[0];
        } else {
            return strData;
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

        if (val.length > 3 && val.length < 7) {
            let par1 = val.substring(0, 2);
            let par2 = val.substring(2);
            val = '(' + par1 + ')' + par2;
        } else if (val.length > 6 && val.length < 11) {
            let par1 = val.substring(0, 2);
            let par2 = val.substring(2, 6);
            let par3 = val.substring(6);
            val = '(' + par1 + ')' + par2 + '-' + par3;
        }

        if (val.length > 14)
            val = val.substring(0, 14);
        return val;
    }
    /* ------------------------------------------- END MASK FONE ------------------------------------------ */

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    compareWith = this.compareWithFn;

    isNumber(evt) {
        let numbers = /^[0-9]+$/;
        if (!evt.match(numbers)) {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Ingresse um numero valido' });
            //logic to clean the inputs after showing the alert
            for(let k in this.model){
                let value=this.model[k];
                if(value==evt){
                    this.model[k]='';
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

    validateName(evt, modelAttr) {
        let especialCharacters = /[0-9 \W_*]/
        if (evt.match(especialCharacters)) {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Ingresse um nome Valido' })
            this.model[modelAttr] = '';
            return;
        }
        else {
            this.model[modelAttr] = evt;

            return;

        }
    }

    addToSelectCrianca(id) {
        for (const valor in this.collectionCriancaFica) {
            if (this.collectionCriancaFica[valor].id === id) {
                this.crianca_fica.push(this.collectionCriancaFica[valor].id);
            }
        }
    }

    addToSelectDeficiencia(id) {
        for (const valor in this.collectionDeficiencia) {
            if (this.collectionDeficiencia[valor].id === id) {
                this.deficiencia.push(this.collectionDeficiencia[valor].id);
            }
        }
    }

    addToSelectDoenciaCardiaca(id) {
        for (const valor in this.collectionDoencaCardiaca) {
            if (this.collectionDoencaCardiaca[valor].id === id) {
                this.doenca_cardiaca.push(this.collectionDoencaCardiaca[valor].id);
            }
        }
    }

    addToSelectProblemaRins(id) {
        for (const valor in this.collectionProblemaRins) {
            if (this.collectionProblemaRins[valor].id === id) {
                this.rins.push(this.collectionProblemaRins[valor].id);
            }
        }
    }

    addToSelectDoencaPulmao(id) {
        for (const valor in this.collectionDoencaPulmao) {
            if (this.collectionDoencaPulmao[valor].id === id) {
                this.pulmao.push(this.collectionDoencaPulmao[valor].id);
            }
        }
    }

    addToSelectQualOrigem(id) {
        for (const valor in this.collectionAlimentacao) {
            if (this.collectionAlimentacao[valor].id === id) {
                this.alimentacao.push(this.collectionAlimentacao[valor].id);
            }
        }
    }

    addToSelectHigiene(id) {
        for (const valor in this.collectionHigiene) {
            if (this.collectionHigiene[valor].id === id) {
                this.higiene.push(this.collectionHigiene[valor].id);
            }
        }
    }


}
