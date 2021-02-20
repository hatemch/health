import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AlertService} from "../../services/alert.service";
import {CadastroIndividualPage} from "../cadastro-individual/cadastro-individual.page";
import {CadastroIndividual} from "../../models/CadastroIndividual";
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {EnvService} from "../../services/env.service";
import {CadastroDomiciliarFamilia} from "../../models/CadastroDomiciliarFamilia";

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.page.html',
  styleUrls: ['./responsavel-form.page.scss'],
})
export class ResponsavelFormPage implements OnInit {

  public collection: any = [];
  public collectionFilter: any = [];
  public subtitle = 'Responsavel';
  public model: CadastroIndividual = new CadastroIndividual();
  // Permissoes do modulo para o usuario logado
  private permissoes = {
    Route: '',
    Pesquisar: 1,
    Inserir: 1,
    Editar: 1,
    Deletar: 1
  };

  constructor(  private navCtrl: NavController,
                private alertService: AlertService,
                private alertController: AlertController,
                private env: EnvService,
                private Authorizer: AuthService,
                private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.CarregaCadastroIndividual()
  }


  private sendRequest(
      procedure: string,
      params: { StatusCRUD: string; formValues: any; },
      next: any) {
    if (typeof this.Authorizer.HashKey !== 'undefined') {
      if (
          ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0))
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
      } else {
        this.alertService.presentAlert({
          pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
        });
      }
    } else {
      this.modalCtrl.dismiss(this.model);
    }
  }

  CarregaCadastroIndividual() {
    this.sendRequest('spCRUDCadastroIndividual', {
      StatusCRUD: CadastroIndividualPage.CRUD_READ,
      formValues: {usuario: this.Authorizer.CodigoUsuarioSistema},
    }, (resultado) => {
      let results = JSON.parse(atob(resultado.results));
      console.log(results);
      this.collection = results.map(function callback(value) {
        let model = new CadastroIndividual();
        model.cns_cidadao = value.cns_cidadao;
        model.nome_completo = value.nome_completo;
        return model;
      });
    });

  }

  public getItems(ev: any) {
    this.collectionFilter = this.collection;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.collectionFilter = this.collectionFilter.filter((item) => {
        return (
            (item.cns_cidadao.toLowerCase().indexOf(val.toLowerCase()) > -1))
      })
    }
  }

  selectResponsavel(item) {
    console.log(item);
    this.modalCtrl.dismiss(item);

  }
  close() {
    this.modalCtrl.dismiss();
  }

}
