import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//SERVICES
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
//MODELS
import { MarcadoresConsumoAlimentar } from 'src/app/models/MarcadoresConsumoAlimentar'
@Component({
  selector: 'app-marcadores-form',
  templateUrl: './marcadores-form.page.html',
  styleUrls: ['./marcadores-form.page.scss'],
})
export class MarcadoresFormPage implements OnInit {
  private permissoes = {
    Route: '',
    Pesquisar: 1,
    Inserir: 1,
    Editar: 1,
    Deletar: 1
  };
  static CRUD_CREATE: string = 'CREATE';
  static CRUD_UPDATE: string = 'UPDATE';
  static CRUD_READ: string = 'READ';
  private APP_NAME: string = this.env.AppName;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private alertController: AlertController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private router: Router,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private authService: AuthService,

    private activatedRoute: ActivatedRoute) { }

  public step = 0; //this
  public title = 'Cadastro Marcador Consumo Alimentar'
  public ShowSelectFruta = false;
  public ShowSelectSal = false;
  public ShowFotos = false;
  public refeicoes: any = [];
  public model = new MarcadoresConsumoAlimentar();
  public collectionLocalAtendimento: any = [
    { id: '1', nome: 'UBS' },
    { id: '2', nome: 'Unidade móvel' },
    { id: '3', nome: 'Rua' },
    { id: '4', nome: 'Domicílio' },
    { id: '5', nome: 'Escola/Creche' },
    { id: '6', nome: 'Polo(Academia da Saúde)' },
    { id: '7', nome: 'Instituição/Abrigo' },
    { id: '8', nome: 'Unidade prisional ou congêneres' },
    { id: '9', nome: 'Unidade socioeducativa' },
    { id: '10', nome: 'outros' },

  ];
  public collectionSexo: any = [
    { id: '1', nome: 'Masculino' },
    { id: '2', nome: 'Femenino' },
  ];
  public collectionPreguntas: any = [
    { id: '1', nome: 'Sim' },
    { id: '2', nome: 'Não' },
    { id: '3', nome: 'Não Sabe' },
  ];
  public collectionNumeroVezes: any = [
    { id: '1', nome: '1 vez' },
    { id: '2', nome: '2 vezes' },
    { id: '3', nome: '3 vezes ou mais' },
    { id: '4', nome: 'Não Sabe' },
  ]
  public collectionRefeicoes: any = [
    { id: '1', nome: 'Café da manhã' },
    { id: '2', nome: 'Lanche da manhã' },
    { id: '3', nome: 'Almoço' },
    { id: '4', nome: 'Lanche da tarde' },
    { id: '5', nome: 'Jantar' },
    { id: '6', nome: 'Ceia' },


  ];



  ngOnInit() {
    this.activatedRoute.params.subscribe(
      data => {
        //"data" carries all the parameters
        this.model.codigo = data.codigoMarcador;

        console.log("CodigoMarcador", this.model.codigo);
        if (this.model.codigo) {
          this.ShowFotos=true;
          this.title = 'Editar Marcador de Consumo Alimentar'
          this.CRUDMarcadores(MarcadoresFormPage.CRUD_READ)
        }
      });
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
  validateName(evt) {
    let especialCharacters = /[0-9 \W_*]/
    if (evt.match(especialCharacters)) {
      this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Ingresse um nome Valido' })
      this.model.nome_completo = '';
      return;
    }
    else {
      this.model.nome_completo = evt;

      return;

    }
  }
  showVezesFrutaSlect(event) {
    console.log(event.label)
    if (event.value == 1) {
      this.ShowSelectFruta = true;
    }
    else {
      this.ShowSelectFruta = false;
    }

  }
  showVezesComidaSalSlect(event) {
    if (event.value == 1) {
      this.ShowSelectSal = true;
    }
    else {
      this.ShowSelectSal = false;
    }

  }
  public getCheckedValuesRefeicoes(modelAttr, e) {
    this[modelAttr] = e.target.value;
    console.log(this[modelAttr]);
    if (this[modelAttr].length > 0) {
      for (const i in this[modelAttr]) {
        switch (this[modelAttr][i]) {
          case '1':
            this.model.adulto_refeicao_cafe_manha = 'S';
            break;
          case '2':
            this.model.adulto_refeicao_lanche_manha = 'S';
            break;
          case '3':
            this.model.adulto_refeicao_almoco = 'S';
            break;
          case '4':
            this.model.adulto_refeicao_lanche_tarde = 'S';
            break;
          case '5':
            this.model.adulto_refeicao_jantar = 'S';
            break;
          case '6':
            this.model.adulto_refeicao_ceia = 'S';
            break;
          default:
            break;
        }
      }
    }
  }
  getCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.model.latitude = resp.coords.latitude;
      this.model.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  save(form: NgForm) {
    if ((this.model.data_cadastro !== null) && (this.model.data_cadastro !== '')) {
      this.model.data_cadastro = this.formatarData2(this.model.data_cadastro);
      console.log(this.model.data_cadastro);
    }
    if ((this.model.data_nascimento !== null) && (this.model.data_nascimento !== '')) {
      this.model.data_nascimento = this.formatarData2(this.model.data_nascimento);
      console.log(this.model.data_nascimento);
    }
    if (this.model.codigo > 0) {
      //ADD CODIGO TO UPDATE 


      console.log('UPDATE')
      console.log(this.model.codigo);

      this.model.usuario = this.Authorizer.CodigoUsuarioSistema;
      this.CRUDMarcadores(MarcadoresFormPage.CRUD_UPDATE);
    } else {
      console.log('CREATE')
      this.model.usuario = this.Authorizer.CodigoUsuarioSistema;
      this.CRUDMarcadores(MarcadoresFormPage.CRUD_CREATE);

    }
  }
  private  CRUDMarcadores(_statusCRUD) {

    this.sendRequest('spCRUDMarcadores', {
      StatusCRUD: _statusCRUD,
      formValues: this.model
    }, (resultado) => {

      switch (_statusCRUD) {
        case MarcadoresFormPage.CRUD_CREATE:
          // this.router.navigate(['/menu/exame-laboratorial-legal']);

          this.model.codigo = JSON.parse(atob(resultado.results))[0].codigo;

          console.log('data guia', this.model.codigo)
          this.showAddFotoOption(this.model.codigo)

          break;
        case MarcadoresFormPage.CRUD_READ:


          this.model.codigo = JSON.parse(atob(resultado.results))[0].codigo;
          this.model.cns_profissional = JSON.parse(atob(resultado.results))[0].cns_profissional;
          this.model.cbo = JSON.parse(atob(resultado.results))[0].cbo;
          this.model.cnes = JSON.parse(atob(resultado.results))[0].cnes;
          this.model.ine = JSON.parse(atob(resultado.results))[0].ine;
          this.model.data_cadastro = JSON.parse(atob(resultado.results))[0].data_cadastro;
          this.model.cns_cidadao = JSON.parse(atob(resultado.results))[0].cns_cidadao;
          this.model.nome_completo = JSON.parse(atob(resultado.results))[0].nome_completo;
          this.model.data_nascimento = JSON.parse(atob(resultado.results))[0].data_nascimento;
          this.model.local_atendimento = JSON.parse(atob(resultado.results))[0].local_atendimento;
          this.model.sexo = JSON.parse(atob(resultado.results))[0].sexo;
          this.model.crianca1_ontem_tomou_leite_peito = JSON.parse(atob(resultado.results))[0].crianca1_ontem_tomou_leite_peito;
          this.model.crianca1_ontem_consumiu_mingau = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_mingau;
          this.model.crianca1_ontem_consumiu_agua_cha = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_agua_cha;
          this.model.crianca1_ontem_consumiu_leite_vaca = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_leite_vaca;
          this.model.crianca1_ontem_consumiu_formula_infatil = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_formula_infatil;
          this.model.crianca1_ontem_consumiu_suco_fruta = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_suco_fruta;
          this.model.crianca1_ontem_consumiu_fruta = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_fruta;
          this.model.crianca1_ontem_consumiu_comida_sal = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_comida_sal;
          this.model.crianca1_ontem_consumiu_outros_alimentos = JSON.parse(atob(resultado.results))[0].crianca1_ontem_consumiu_outros_alimentos;
          this.model.crianca2_ontem_tomou_leite_peito = JSON.parse(atob(resultado.results))[0].crianca2_ontem_tomou_leite_peito;
          this.model.crianca2_ontem_comeu_fruta_inteira = JSON.parse(atob(resultado.results))[0].crianca2_ontem_comeu_fruta_inteira;
          this.model.crianca2_ontem_comeu_fruta_inteira_vezes = JSON.parse(atob(resultado.results))[0].crianca2_ontem_comeu_fruta_inteira_vezes;
          this.model.crianca2_ontem_comeu_comida_sal = JSON.parse(atob(resultado.results))[0].crianca2_ontem_comeu_comida_sal;
          this.model.crianca2_ontem_comeu_comida_sal_vezes = JSON.parse(atob(resultado.results))[0].crianca2_ontem_comeu_comida_sal_vezes;
          this.model.crianca2_ontem_comeu_comida_sal_tipo = JSON.parse(atob(resultado.results))[0].crianca2_ontem_comeu_comida_sal_tipo;
          this.model.crianca2_ontem_consumiu_outro_leite = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_outro_leite;
          this.model.crianca2_ontem_consumiu_mingau_leite = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_mingau_leite;
          this.model.crianca2_ontem_consumiu_iogurte = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_iogurte;
          this.model.crianca2_ontem_consumiu_legumes = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_legumes;
          this.model.crianca2_ontem_consumiu_vegetal_fruta = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_vegetal_fruta;
          this.model.crianca2_ontem_consumiu_verdura_folha = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_verdura_folha;
          this.model.crianca2_ontem_consumiu_carne = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_carne;
          this.model.crianca2_ontem_consumiu_figado = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_figado;
          this.model.crianca2_ontem_consumiu_feijao = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_feijao;
          this.model.crianca2_ontem_consumiu_arroz = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_arroz;
          this.model.crianca2_ontem_consumiu_hamburguer = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_hamburguer;
          this.model.crianca2_ontem_consumiu_bebida_adocada = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_bebida_adocada;
          this.model.crianca2_ontem_consumiu_macarrao_instataneo = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_macarrao_instataneo;
          this.model.crianca2_ontem_consumiu_biscoito_recheado = JSON.parse(atob(resultado.results))[0].crianca2_ontem_consumiu_biscoito_recheado;
          this.model.adulto_refeicao_tv = JSON.parse(atob(resultado.results))[0].adulto_refeicao_tv;
          this.model.adulto_refeicao_cafe_manha = JSON.parse(atob(resultado.results))[0].adulto_refeicao_cafe_manha;
          if (this.model.adulto_refeicao_cafe_manha.trim() == 'S') {
            this.getSelectCheckedValues('1')
          }
          this.model.adulto_refeicao_lanche_manha = JSON.parse(atob(resultado.results))[0].adulto_refeicao_lanche_manha;
          if (this.model.adulto_refeicao_lanche_manha.trim() == 'S') {
            this.getSelectCheckedValues('2')
          }
          this.model.adulto_refeicao_almoco = JSON.parse(atob(resultado.results))[0].adulto_refeicao_almoco;
          if (this.model.adulto_refeicao_almoco.trim() == 'S') {
            this.getSelectCheckedValues('3')
          }
          this.model.adulto_refeicao_lanche_tarde = JSON.parse(atob(resultado.results))[0].adulto_refeicao_lanche_tarde;
          if (this.model.adulto_refeicao_lanche_tarde.trim() == 'S') {
            this.getSelectCheckedValues('4')
          }
          this.model.adulto_refeicao_jantar = JSON.parse(atob(resultado.results))[0].adulto_refeicao_jantar;
          if (this.model.adulto_refeicao_jantar.trim() == 'S') {
            this.getSelectCheckedValues('5')
          }
          this.model.adulto_refeicao_ceia = JSON.parse(atob(resultado.results))[0].adulto_refeicao_ceia;
          if (this.model.adulto_refeicao_ceia.trim() == 'S') {
            this.getSelectCheckedValues('6')
          }
          this.model.adulto_ontem_consumiu_feijao = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_feijao;
          this.model.adulto_ontem_consumiu_fruta = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_fruta;
          this.model.adulto_ontem_consumiu_verdura_legume = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_verdura_legume;
          this.model.adulto_ontem_consumiu_hamburguer = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_hamburguer;
          this.model.adulto_ontem_consumiu_bebida_adocada = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_bebida_adocada;
          this.model.adulto_ontem_consumiu_macarrao_instataneo = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_macarrao_instataneo;
          this.model.adulto_ontem_consumiu_biscoito_recheado = JSON.parse(atob(resultado.results))[0].adulto_ontem_consumiu_biscoito_recheado;
          this.model.usuario = JSON.parse(atob(resultado.results))[0].usuario;
          this.model.pim = JSON.parse(atob(resultado.results))[0].pim;
          this.model.imei = JSON.parse(atob(resultado.results))[0].imei;
          this.model.latitude = JSON.parse(atob(resultado.results))[0].latitude;
          this.model.longitude = JSON.parse(atob(resultado.results))[0].longitude;
          this.model.versao = JSON.parse(atob(resultado.results))[0].versao;

          console.log('infoToEdit', this.model);




          break;
        case MarcadoresFormPage.CRUD_UPDATE:

          this.router.navigate(['/marcadores']);
          break;

        default:
          break;
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
            console.log('codigoMarcador',codgioItem)
           this.gotoMarcadoresFotos(codgioItem);
          }
        }
      ]
    });

    await alert.present();
  }
  gotoMarcadoresFotos(codigoItem){
    if(codigoItem){
      this.router.navigate(['/marcadores-foto',codigoItem]);
    }else{
      this.router.navigate(['/marcadores-foto',this.model.codigo]);
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
  getSelectCheckedValues(id) {
    for (const valor in this.collectionRefeicoes) {
      if (this.collectionRefeicoes[valor].id === id) {
        this.refeicoes.push(this.collectionRefeicoes[valor].id);
      }
    }
  }

  goBack() {
    this.router.navigate(['/marcadores']);
  }
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
        || (procedure === 'spUsuarios')
      ) {

        const _params = {
          StatusCRUD: params.StatusCRUD,
          formValues: params.formValues,
          CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
          Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
        }

        this.Authorizer.QueryStoreProc('ExecutarPOST', procedure, _params).then(res => {
          // this.Authorizer.QueryStoreProc('Executar', procedure, _params).then(res => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              this.alertService.showLoader(resultado.message, 1000);
            } else {
              this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.APP_NAME, pMessage: resultado.message });
            }
          } catch (err) {
            this.alertService.presentAlert({ pTitle: this.env.AppNameSigla, pSubtitle: this.APP_NAME, pMessage: 'Erro ao fazer a petição' });
          }
        });
      } else {
        this.alertService.presentAlert({
          pTitle: 'SEM PERMISSÃO', pSubtitle: this.APP_NAME, pMessage: 'Você não tem permissão para esta ação'
        });
      }
    } else {
      //this.goBack()
    }
  }
}
