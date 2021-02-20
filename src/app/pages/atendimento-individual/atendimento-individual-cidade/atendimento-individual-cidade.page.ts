import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment.prod";
// Services
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EnvService } from "../../../services/env.service";
import { AlertService } from "../../../services/alert.service";

import { NavController } from "@ionic/angular";
import { AtendimentoIndividual } from "src/app/models/AtendimentoIndividual";
import { Storage } from "@ionic/storage";
import { AtendimentoIndividualCidadao } from "src/app/models/AtendimentoIndividualCidadao";
@Component({
  selector: "app-atendimento-individual-cidade",
  templateUrl: "./atendimento-individual-cidade.page.html",
  styleUrls: ["./atendimento-individual-cidade.page.scss"],
})
export class AtendimentoIndividualCidadePage implements OnInit {
  public AppName: string = environment.AppName;
  public subtitle = " Atendimento Individual Cidadão";
  public CodigoUsuario: any;
  public CadastroIndividual: any;

  public model: AtendimentoIndividualCidadao = new AtendimentoIndividualCidadao();
  public collectionFilter: AtendimentoIndividualCidadao[];
  public collection: AtendimentoIndividualCidadao[];
  public flagForm = true;

  // Permissoes do modulo para o usuario logado
  private permissoes = {
    Route: "",
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0,
  };

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getPermissoesModulo();
    this.activatedRoute.params.subscribe((data) => {
      //"data" carries all the parameters
      this.model.atendimento_individual = data.codigo;
    });
    this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
    this.storage.clear();
  }
  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.
  }

  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    if (!this.Authorizer.HashKey) {
      this.navCtrl.navigateRoot("/login");
    } else {
      this.CarregaAtendimentoIndividualCidadao();
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

  getPermissoesModulo() {
    const permissaoModulo = this.Authorizer.permissoesUsuario.filter((item) => {
      return item.Route === this.router.url;
    });

    if (permissaoModulo.length === 1) {
      this.permissoes = {
        Route: permissaoModulo[0].Route,
        Pesquisar: permissaoModulo[0].Pesquisar,
        Inserir: permissaoModulo[0].Inserir,
        Editar: permissaoModulo[0].Editar,
        Deletar: permissaoModulo[0].Deletar,
      };
    } else {
      console.log(
        "Houve um problema nas permissoes do modulo: ",
        this.router.url
      );
    }
  }
  /**
   * Autor: HATEM CHAOUCH
   * Data: 04/12/2019
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  private sendRequest(
    procedure: string,
    params: { StatusCRUD: string; formValues: any },
    next: any
  ) {
    if (typeof this.Authorizer.HashKey !== "undefined") {
      /*if (
        ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0) ||
            (params.StatusCRUD === 'DELETE') && (this.permissoes.Pesquisar > 0))
    ) {*/
      const _params = {
        StatusCRUD: params.StatusCRUD,
        formValues: params.formValues,
        CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
        Hashkey: this.Authorizer.HashKey, // Por defeito sempre está este valor
      };

      this.Authorizer.QueryStoreProc("ExecutarPost", procedure, _params).then(
        (res) => {
          const resultado: any = res[0];
          try {
            if (resultado.success) {
              next(resultado);
              this.alertService.showLoader(resultado.message, 1000);
            } else {
              this.alertService.presentAlert({
                pTitle: "ATENÇÃO",
                pSubtitle: this.subtitle,
                pMessage: resultado.message,
              });
              this.navCtrl.back();
            }
          } catch (err) {
            this.alertService.presentAlert({
              pTitle: this.env.AppNameSigla,
              pSubtitle: this.subtitle,
              pMessage: "Erro ao fazer a petição",
            });
          }
        }
      );
      /*} else {
      this.alertService.presentAlert({
        pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
      });
    }*/
    } else {
      this.goBack();
    }
  }
  CarregaAtendimentoIndividualCidadao() {
    const params = {
      StatusCRUD: "READ",
      formValues: { atendimento_individual: this.model.atendimento_individual },
    };
    this.sendRequest(
      "spCRUDAtendimentoIndividualCidadao",
      params,
      (resultado) => {
        this.collectionFilter = JSON.parse(atob(resultado.results));
        this.collection = this.collectionFilter;
      }
    );
  }
  getAtendimentoIndividualCidadaoID() {
    this.router.navigate(["atendimento-individual-cidade", this.model.codigo]);
  }
  editar(model) {
    this.router.navigate([
      "atendimento-individual-individuos-form/edit/",
      model.codigo,
      model.atendimento_individual,
    ]);
    console.log("atendimento_individual individuo value", model);
  }
  goBack() {
    this.navCtrl.back();
  }
  newAtendimentoIndividualCidadao() {
    //this.navCtrl.navigateRoot("/atendimento-individual-individuos-form");
    this.router.navigate([
      "atendimento-individual-individuos-form",
      this.model.atendimento_individual,
    ]);
  }
  sincronizarAtendimentoIndividualCidadao(event) {
    console.log("Begin async operation");
    this.CarregaAtendimentoIndividualCidadao();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  /***************DELETE********************/
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = "";
    }
  }
  delete(model: AtendimentoIndividualCidadao) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atendimento individual: <strong>${model.cns_cidadao}</strong>!!!`;
    alert.buttons = [
      {
        text: "Desistir",
        role: "cancel",
        cssClass: "secondary",
        handler: (blah) => {
          console.log("Confirm Cancel: blah");
        },
      },
      {
        text: "Confirmar",
        handler: () => {
          const params = {
            StatusCRUD: "DELETE",
            formValues: model,
          };

          this.sendRequest(
            "spCRUDAtendimentoIndividualCidadao",
            params,
            (resultado) => {
              this.collection.forEach(function (model, index, collection) {
                if (model.codigo == this) {
                  collection.splice(index, 1);
                }
              }, model.codigo);
              this.resetModel();
            }
          );
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }
}
