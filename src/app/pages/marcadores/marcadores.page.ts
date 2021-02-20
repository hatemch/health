import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
//SERVICES
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
//MODELS
import { MarcadoresConsumoAlimentar } from 'src/app/models/MarcadoresConsumoAlimentar'


@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.page.html',
  styleUrls: ['./marcadores.page.scss'],
})
export class MarcadoresPage implements OnInit {

  private permissoes = {
    Route: '',
    Pesquisar: 1,
    Inserir: 1,
    Editar: 1,
    Deletar: 1
  };
  static CRUD_READ: string = 'READ';
  static CRUD_DELETE: string = 'DELETE';
  private APP_NAME: string = this.env.AppName;
  public model = new MarcadoresConsumoAlimentar();
  public collection: Array<MarcadoresConsumoAlimentar> = [];

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private alertController: AlertController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private router: Router,
    private modalCtrl: ModalController,
    private authService: AuthService,

    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.getMarcadores();
  }
  newCadastroMarcadorConsumoAlimentar() {
    this.router.navigate(['/marcadores-form']);
  }
  editarMarcadorConsumoAlimentar(coddigoItem){
    this.router.navigate(['/marcadores-form',coddigoItem]);

  }
  getMarcadores() {
    this.sendRequest('spCRUDMarcadores', {
      StatusCRUD: 'READ',
      formValues: { usuario: this.authService.CodigoUsuarioSistema },
    }, (resultado) => {
      let results = JSON.parse(atob(resultado.results));
      this.collection = results.map(function callback(value) {
        let model = new MarcadoresConsumoAlimentar();
        model.codigo = value.codigo;
        model.cns_profissional = value.cns_profissional;
        model.cbo = value.cbo;
        model.cnes = value.cnes;
        model.data_cadastro =value.data_cadastro.substring(8, 10)+'/'+value.data_cadastro.substring(5, 7)+'/'+value.data_cadastro.substring(0, 4);
        
        return model;

      });
    });
  }
  async showDeleteAlert(codgioItem: string) {
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
            this.deleteMarcador(codgioItem);
          }
        }
      ]
    });

    await alert.present();
  }
  goBack(){
    this.router.navigate(['/menu/options/tabs/main']);
  }
  public deleteMarcador(codgioItem: string) {
    this.model.codigo = Number(codgioItem);

    this.sendRequest('spCRUDMarcadores', {
      StatusCRUD: MarcadoresPage.CRUD_DELETE,
      formValues: { codigo: this.model.codigo }
    }, (resultado) => {
      if (resultado.success == true) {
        this.collection = [];
        this.getMarcadores();
        
        return;
      }else{
        this.alertService.presentAlert({
          pTitle: 'ERROR', pSubtitle: this.APP_NAME, pMessage: 'Não foi possível deletar o marcador'
        });
      }

    });
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
              this.alertService.showLoader(resultado.message,1000);
              return;
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
      this.goBack()
    }
  }
}
