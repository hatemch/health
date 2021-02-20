
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgForm ,FormGroup, FormBuilder  } from '@angular/forms';
import { EnvService } from 'src/app/services/env.service';
import {Md5} from 'ts-md5/dist/md5';
import {  Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-consulta-nomeacoes',
  templateUrl: './consulta-nomeacoes.page.html',
  styleUrls: ['./consulta-nomeacoes.page.scss'],
})
export class ConsultaNomeacoesPage implements OnInit {

  public Datai    : Date;
  public Dataf    : Date;
  public AppName: string = environment.AppName;
  public subtitle = 'Consulte as nomeações';
  public compromisso: any ;


  public collectionHospitais: any = [{
    code: '',
    name: ''
  }];

  public collectionEspecialidade: any = [{
    code: '',
    name: ''
  }];


  public modelPesquisa: any = {
    CodigoHospitais: '',
    CodigoEspecialidade: '',
    DataInicial: '',
    DataFinal: '',
    pagina: '1'
  };
  // Permissoes do modulo para o usuario logado
  private permissoes = {
    Route: '',
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0
  };

  constructor(
    private navCtrl: NavController,
   
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder : FormBuilder,
    private db : Storage,
    private router: Router,
    ) { }

  

/*
  ConsultaHosp() 
  {
    console.log("Hospitais :")
   let params1=null;

    this.Authorizer.QueryStoreProc1('ConsultasHosp',"", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          //this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
        } else {
          //mostro os módulos
          console.log("Hospitais:", resultado);
          this.a = resultado;
          console.log(this.a)
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }*/

  goBack() {
    this.navCtrl.back();
  }

  goTo(){
    this.navCtrl.navigateRoot('/compromisso-lista');
    }


  /*public b: any ;
  Consultaspec() 
  {
    console.log("Speciality :")
   let params1=null;

    this.Authorizer.QueryStoreProc1('ConsultasSpeciality',"", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
        
          //this.alertService.presentAlert({ pTitle: 'Speciality', pSubtitle: 'Menu', pMessage: 'Nenhuma informação encontrada!' });
        } else {
          //mostro os módulos
          console.log("Speciality:", resultado);
          this.b = resultado;
          console.log(this.b)
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Sem informação!' });
      }
    });
  }*/

 
  
  

  ngOnInit() {
    this.getPermissoesModulo();
    this.consultaHospitais();
    this.consultaEspecialidade();
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/agenda');
    })
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

    /*if (
      ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
      || (procedure === 'spCarregaHospitais')
      || (procedure === 'spCarregaEspecialidade')
    ) {*/

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
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message + '(' + procedure + ')' });
          this.navCtrl.back();
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Erro ao fazer a petição' });
      }
    });
    /* } else {
       this.alertService.presentAlert({
         pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
       });
     }*/
  }

  consultaHospitais(){
    this.sendRequest('spCarregaHospitais', {
      StatusCRUD: 'READ',
      formValues: ''
    }, (resultado) => {
      this.collectionHospitais = JSON.parse(atob(resultado.results));
    });
  }

  consultaEspecialidade(){
    this.sendRequest('spCarregaEspecialidade', {
      StatusCRUD: 'READ',
      formValues: ''
    }, (resultado) => {
      this.collectionEspecialidade = JSON.parse(atob(resultado.results));
    });
  }

  pesquisar(form) {

   /* let dat1: any;
    let dat2: any;
    dat1 = form.value.DataInicial;
    dat2 = form.value.DataFinal;

    if (typeof (dat1) == 'undefined')
      dat1 = '';
    if (dat1 == null)
      dat1 = '';
    if (typeof (dat2) == 'undefined')
      dat2 = '';
    if (dat2 == null)
      dat2 = '';


    if (dat1 != '' && dat2 == '') {
      this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Quando informar a data inicial, informe a data final!' });
      form.value.DataInicial.requestFous();
      return;
    }
    if (dat1 == '' && dat2 != '') {
      this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Quando informar a data final, informe a data inicial!' });
      form.value.DataInicial.requestFous();
      return;
    }
    console.log(form.form.value);
    let filtro: string = '';
    filtro = form.value.CodigoHospitais;
    filtro = filtro + ',' + form.value.CodigoEspecialidade;
    filtro = filtro + ',' + form.value.DataInicial;
    filtro = filtro + ',' + form.value.DataFinal;

    console.log('filtro:', filtro);
    this.Authorizer.setFilter(filtro);

    let params = {
      CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
      Hashkey: this.Authorizer.HashKey,
      CodigoHospitais: form.value.CodigoHospitais,
      CodigoEspecialidade: form.value.CodigoEspecialidade,
      DataInicial: form.value.DataInicial,
      DataFinal: form.value.DataFinal,
      pagina: '1'
    };*/
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': form.form.value,
    };

    this.sendRequest('spCarregaCompromisso', params, (res) => {
      let resultado: any = res[0];
      console.log("res:", resultado);

          this.alertService.showLoader(resultado.message, 1000);
          this.compromisso = JSON.parse(atob(resultado.results));
          //store information locally
         // this.db.set('compromisso', this.compromisso);
          sessionStorage.setItem('compromisso', resultado.results);
          /*let ret:any;
          ret = JSON.stringify(this.Infracoes);*/
          this.router.navigate(['/compromisso-lista']);

    });


    /*console.log("Pesquisar:", params);
    this.Authorizer. QueryStoreProc('Executar',"spAtendimento", params).then(res => {
      let resultado: any = res[0];

      console.log(resultado)
      try {
        if (resultado.success) { 
         // this.db.set('rdv', resultado.results); 
          sessionStorage.setItem('rdv', resultado.results);  
          this.goTo();

           
          }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: 'Não existe atendimento!' });

        }}
        catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Erro', pMessage: 'Atendimento' });
        }
    });*/
    
    
  }

  

}
