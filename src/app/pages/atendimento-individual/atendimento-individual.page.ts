import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
// Services
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { EnvService } from "../../services/env.service";
import { AlertService } from "../../services/alert.service";

import { NavController } from "@ionic/angular";
import { AtendimentoIndividual } from "src/app/models/AtendimentoIndividual";
import { Storage } from "@ionic/storage";
@Component({
  selector: "app-atendimento-individual",
  templateUrl: "./atendimento-individual.page.html",
  styleUrls: ["./atendimento-individual.page.scss"],
})
export class AtendimentoIndividualPage implements OnInit {
  public AppName: string = environment.AppName;
  public subtitle = " Atendimento Individual";
  public CodigoUsuario: any;
  public CadastroIndividual: any;

  public model: AtendimentoIndividual = new AtendimentoIndividual();
  public collectionFilter: AtendimentoIndividual[];
  public collection: AtendimentoIndividual[];
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
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getPermissoesModulo();
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
      this.CarregaCadastroAtendimentoIndividual();
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
  CarregaAtendimentoIndividual() {
    const params = {
      StatusCRUD: "READ",
      formValues: { usuario: this.Authorizer.CodigoUsuarioSistema },
    };

    this.sendRequest("spCRUDAtendimentoIndividual", params, (resultado) => {
      this.collectionFilter = JSON.parse(atob(resultado.results));
      this.collection = this.collectionFilter;
      // this.showPagination();
    });
  }
  editar(model) {
    this.router.navigate(["atendimento-individual-form/edit", model.codigo]);
    console.log("atendimento individual value", model);
  }
  getAtendimentoIndividualID() {
    this.router.navigate(["atendimento-individual-cidade", this.model.codigo]);
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

  CarregaCadastroAtendimentoIndividual() {
    const params = {
      StatusCRUD: "READ",
      formValues: { usuario: this.Authorizer.CodigoUsuarioSistema },
    };

    this.sendRequest("spCRUDAtendimentoIndividual", params, (resultado) => {
      this.collectionFilter = JSON.parse(atob(resultado.results));
      this.collection = this.collectionFilter;
      this.flagForm = false;
      // this.showPagination();
    });
  }
  goBack() {
    if (this.flagForm) {
      this.navCtrl.back();
    } else {
      this.flagForm = !this.flagForm;
      this.collection = [];
      this.collectionFilter = [];
      // this.paginas = [];
      // this.modelPesquisa.pagina = 1;
    }
  }

  newAtendimentoIndividual() {
    this.navCtrl.navigateRoot("/atendimento-individual-form");
  }
  sincronizarAtendimentoIndividual() {//event
    console.log("Begin async operation");
    this.CarregaAtendimentoIndividual();
    setTimeout(() => {
      console.log("Async operation has ended");
     // event.target.complete();
    }, 2000);
  }

  /***************DELETE********************/
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = "";
    }
  }
  delete(model: AtendimentoIndividual) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atendimento individual: <strong>${model.cns_profissional}</strong>!!!`;
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
            "spCRUDAtendimentoIndividual",
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
  /***************EDIT********************/
  edit(model: any) {
    this.flagForm = true;
    // tslint:disable-next-line: forin
    for (const key in model) {
      this.model[key] = model[key];
    }
  }
}
