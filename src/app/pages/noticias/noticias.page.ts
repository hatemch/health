import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Noticia } from '../../models/Noticia';
import {environment} from "../../../environments/environment.prod";


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  public AppName: string = environment.AppName;
  public ishidden: boolean = true;
  public subtitle = 'Notícias';
  public flagForm: boolean = false;

  public model = new Noticia();
  public collection: any = [];
  public collectionFilter: any = [];
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
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController) {

  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.
  }

  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    if (!this.Authorizer.HashKey) {
      this.navCtrl.navigateRoot('/login');
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

  ngOnInit() {
    //Consulta permissoes Modulo Online
    this.getPermissoesModulo();
    //this.MostraDados();
    this.CRUDNoticias('spCRUDEventos', 'Pesquisar', '' );
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

  private sendRequest(
      procedure: string,
      params: { StatusCRUD: string; formValues: any; },
      next: any) {
    if (
        ((params.StatusCRUD === 'Criacao') && (this.permissoes.Inserir > 0))
        || ((params.StatusCRUD === 'Deletar') && (this.permissoes.Deletar > 0))
        || ((params.StatusCRUD === 'Pesquisar') && (this.permissoes.Pesquisar > 0))
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
          } else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
            this.navCtrl.back();
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Erro ao fazer a petição' });
        }
      });
    } else {
      this.alertService.presentAlert({
        pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
      });
    }
  }

  goBack() {
    if (this.flagForm) {
      this.flagForm = false;
      this.resetModel();
    } else {
      this.navCtrl.back();
    }
  }

  novaNoticia() {
    this.flagForm = true;
    this.resetModel();
  }

  CRUDNoticias(storeProcedure: string, statusCRUD: string, formValues: any){
    this.sendRequest(storeProcedure, {
      StatusCRUD: statusCRUD,
      formValues: formValues
    }, (res) => {
      console.log('return',res);
      switch (statusCRUD) {
        case 'Criacao':
          this.alertService.showLoader(res.message, 1000);
          this.CRUDNoticias('spCRUDEventos', 'Pesquisar', '' );
          this.resetModel();
          this.flagForm = !(this.flagForm);
          break;
        case 'Pesquisar':
          console.log(res);
          this.collection = JSON.parse(atob(res.results));
          this.collectionFilter = this.collection;
          break;
        case 'Deletar':
          let resultado: any = res;
          this.alertService.presentAlert({ pTitle: 'Excluindo...', pSubtitle: this.subtitle, pMessage: 'Evento excluído com sucesso !' });
          this.collection.forEach(function (model, index, collection) {
            if (model.codigo == this) {
              collection.splice(index, 1);
            }
          }, formValues.codigo);
          this.resetModel();
          break;
        default:
          // code block
      }
    });
  }

  salvar(form:NgForm){
    this.CRUDNoticias('spCRUDEventos', 'Criacao', form.value );
  }

  async cancelar(codigo) {
    console.log(codigo);
    const alert = await this.alertController.create({
      header: 'Excluindo...',
      message: 'Tem certeza que deseja excluir evento?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            console.log('Confirm Ok',codigo);
            this.delete(codigo);
            await alert.remove();
          }
        }
      ]
    });

    await alert.present();
  }

  delete(model: any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `Deseja excluir a Noticia: <strong>${model.nome}</strong>!!!`;
    alert.buttons = [
      {
        text: 'Desistir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (res) => {
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          this.CRUDNoticias('spCRUDEventos', 'Deletar',{codigo: model.codigo} );
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();

   /* let params = {
      'StatusCRUD': 'Delete',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spEventos", params).then(res => {
      let resultado: any = res;
      this.alertService.presentAlert({ pTitle: 'Excluindo...', pSubtitle: '', pMessage: 'Evento excluído com sucesso !' });

    });*/
  }

  openUrl(url) {
    window.open(url, '_system');
  }

  private resetModel() {
    for (const key in this.model) {
      this.model[key] = '';
    }
  }

}

