import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
// Services
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EnvService } from "../../services/env.service";
import { AlertService } from "../../services/alert.service";

import { NavController } from "@ionic/angular";
import { AtividadeColetivaIndividioForm } from "src/app/models/AtividadeColetivaIndividioForm";
import { Storage } from "@ionic/storage";
import { AtividadeColetivaForm } from "src/app/models/AtividadeColetivaForm";
@Component({
  selector: "app-atividade-coletiva-individuo-list",
  templateUrl: "./atividade-coletiva-individuo-list.page.html",
  styleUrls: ["./atividade-coletiva-individuo-list.page.scss"],
})
export class AtividadeColetivaIndividuoListPage implements OnInit {
  public AppName: string = environment.AppName;
  public subtitle = "Atividade Coletiva";
  public CodigoUsuario: any;
  public AtividadeColetivaForm: any;

  public model: AtividadeColetivaIndividioForm = new AtividadeColetivaIndividioForm();
  public modelForm: AtividadeColetivaForm = new AtividadeColetivaForm();

  public collectionFilter: AtividadeColetivaIndividioForm[];
  public collection: AtividadeColetivaIndividioForm[];

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
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.getPermissoesModulo();
    this.activatedRoute.params.subscribe((data) => {
      //"data" carries all the parameters
      this.model.atividade_coletiva = data.codigo;
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
      this.CarregaAtividadeColetivaIndividuo();
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
  CarregaAtividadeColetivaIndividuo() {
    const params = {
      StatusCRUD: "READ",
      formValues: { atividade_coletiva: this.model.atividade_coletiva },
    };
    this.sendRequest("spCRUDAtividadeColetivaCidadao", params, (resultado) => {
      this.collectionFilter = JSON.parse(atob(resultado.results));
      this.collection = this.collectionFilter;
    });
  }

  getAtividadeColetivaCidadaoID() {
    this.router.navigate([
      "atividade-coletiva-individuo-list",
      this.model.codigo,
    ]);
  }
  editar(model) {
    this.router.navigate([
      "atividade-coletiva-individuo-form/edit/",
      model.codigo,
      model.atividade_coletiva,
    ]);
    console.log("atividade coletiva individuo value", model);
  }

  goBack() {
    this.navCtrl.back();
  }
  newAtividadeColetivaIndividuo() {
    //this.navCtrl.navigateRoot("/atividade-coletiva-individuo-form");
    this.router.navigate([
      "atividade-coletiva-individuo-form",
      this.model.atividade_coletiva,
    ]);
  }

  sincronizarAtividadeColetiva(event) {
    console.log("Begin async operation");
    this.CarregaAtividadeColetivaIndividuo();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }
  /**
   * Autor: Hatem CHAOUCH
   * Data: 03/11/2020
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
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = "";
    }
  }
  delete(model: AtividadeColetivaIndividioForm) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atividade Coletiva Cidadao: <strong>${model.cns_cidadao}</strong>!!!`;
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
            "spCRUDAtividadeColetivaCidadao",
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
