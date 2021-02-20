import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  PopoverController,
  ModalController,
  NavParams,
} from "@ionic/angular";
import { AtividadeColetivaProfissionais } from "../../../../models/AtividadeColetivaProfissionais";
import { AtividadeColetivaForm } from "../../../../models/AtividadeColetivaForm";

import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";

@Component({
  selector: "app-profissionais",
  templateUrl: "./profissionais.page.html",
  styleUrls: ["./profissionais.page.scss"],
})
export class ProfissionaisPage implements OnInit {
  public subtitle = "Atividade Coletiva";

  public model: AtividadeColetivaProfissionais = new AtividadeColetivaProfissionais();
  public collectionFilter: AtividadeColetivaProfissionais[];
  public collection: AtividadeColetivaProfissionais[];
  public modelAtividade: AtividadeColetivaForm = new AtividadeColetivaForm();
  public models: Array<AtividadeColetivaProfissionais> = [];

  public flagForm: boolean = true;

  public permissoes = {
    Route: "",
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0,
  }; // Permissoes do modulo para o usuario logado
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    // this take the value that you past to the modal
    const atividadeColetiva: string = this.navParams.get("atividade_coletiva");
    this.model.atividade_coletiva = parseInt(atividadeColetiva);
    this.CRUDAtividadeColetivaProfissionais(
      "spCRUDAtividadeColetivaProfissional",
      "READ",
      {
        atividade_coletiva: this.model.atividade_coletiva,
      }
    );
  }
  getAtividadeColetivaProfissionais() {
    this.router.navigate([
      "atividade-coletiva-form",
      this.model.atividade_coletiva,
    ]);
  }
  CRUDAtividadeColetivaProfissionais(
    storeProcedure: string,
    statusCRUD: string,
    formValues: any
  ) {
    this.sendRequest(
      storeProcedure,
      {
        StatusCRUD: statusCRUD,
        formValues: formValues,
      },
      (resultado) => {
        switch (statusCRUD) {
          case "CREATE":
            this.CRUDAtividadeColetivaProfissionais(
              "spCRUDAtividadeColetivaProfissional",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            let results = JSON.parse(atob(resultado.results));
            this.models = results.map(function callback(value) {
              let model = new AtividadeColetivaProfissionais();

              model.codigo = value.codigo;
              model.atividade_coletiva = value.atividade_coletiva;
              model.cns_profissional = value.cns_profissional;
              model.cbo = value.cbo;

              console.log("model", model);

              return model;
            });

            break;
          default:
          // code block
        }
      }
    );
  }
  Save() {
    let cns_profissional_seconda: string = "";
    let cbo_seconda: string = "";

    let ret: any = {
      cns_profissional: cns_profissional_seconda,
      cbo: cbo_seconda,
    };

    this.model.atividade_coletiva = parseInt(
      this.Authorizer.CodigoUsuarioSistema
    );
    console.log(this.model);
    //this.model.atividade_coletiva = this.modelAtividade.codigo;

    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: this.model.codigo > 0 ? "UPDATE" : "CREATE",
      formValues: this.model,
    };
    console.log(this.model.atividade_coletiva);
    if (
      params.StatusCRUD === "CREATE" ||
      (params.StatusCRUD === "UPDATE" &&
        this.model.atividade_coletiva ===
          parseInt(this.Authorizer.CodigoUsuarioSistema))
    ) {
      this.sendRequest(
        "spCRUDAtividadeColetivaProfissional",
        params,
        (resultado) => {
          console.log(resultado);
          if (params.StatusCRUD === "CREATE") {
            this.goBack();
          }
        }
      );
      this.goBack();
    } else {
      this.alertService.presentAlert({
        pTitle: "ATENÇÃO",
        pSubtitle: this.subtitle,
        pMessage: "Nao pode Editar essa Fiscalizacao!",
      });
      this.goBack();
    }
    this.modalCtrl.dismiss();
  }

  Cancel() {
    this.modalCtrl.dismiss();
  }

  goBack() {
    if (this.flagForm) {
      this.navCtrl.back();
    } else {
      this.flagForm = !this.flagForm;
      this.collection = [];
      this.collectionFilter = [];
    }
  }

  // NEEDED FUNCTIONS
  private getPermissoesModulo() {
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
      // console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
      // this.goBack();
    }
  }
  /**
   * Autor: Hatem chaouch
   * Data: 12/11/2020
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  private sendRequest(
    procedure: string,
    params: { StatusCRUD: string; formValues: any },
    next: any
  ) {
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

            if (procedure === "spCRUDAtividadeColetivaProfissional") {
              this.alertService.showLoader(resultado.message, 1000);
            }
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
  }
  /***************************DELETE METHODE********************************/
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = "";
    }
  }
  delete(model: AtividadeColetivaForm) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atividade Coletiva Profissional: <strong>${model.cns_profissional}</strong>!!!`;
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
            "spCRUDAtividadeColetivaProfissional",
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
  /*************************************************************************/
}
