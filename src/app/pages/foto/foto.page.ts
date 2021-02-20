import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams} from '@ionic/angular';
import {Foto} from "../../models/Foto";
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/auth.service";
import {EnvService} from "../../services/env.service";
import {Storage} from "@ionic/storage";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
})
export class FotoPage implements OnInit {
  public AppName: string = environment.AppName;
  public subtitle = 'Cadastro Individual';
  public foto = new Foto();

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private alertService: AlertService,
              private Authorizer: AuthService,
              public storage: Storage,
              public activatedRoute: ActivatedRoute) {
    this.foto = this.navParams.get('foto');
  }

  ngOnInit() {
  }
  close() {
    this.modalCtrl.dismiss();
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
      /*if (
          ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0) ||
              (params.StatusCRUD === 'DELETE') && (this.permissoes.Pesquisar > 0))
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
            if( resultado.message !== 'tem'){
              this.alertService.showLoader(resultado.message, 1000);
            }
          } else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
            this.navCtrl.back();
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Erro ao fazer a petição' });
        }
      });
      /*} else {
        this.alertService.presentAlert({
          pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
        });
      }*/
    } else {
      this.close();
    }
  }

  CRUDCadastroIndividualFotos(storeProcedure: string, statusCRUD: string, formValues: any) {
    this.sendRequest(storeProcedure, {
      StatusCRUD: statusCRUD,
      formValues: formValues
    }, (resultado) => {
      switch (statusCRUD) {
        case 'DELETE':
          console.log('delete');
          break;
      }
    });
  }

  goDeletar(item){
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `Deseja excluir a Photo/Assinatura`;
    alert.buttons = [
      {
        text: 'Desistir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'DELETE', {codigo: item.codigo, cadastro_individual: item.cadastro_individual});
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }


}
