import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NavController,
  PopoverController,
  ModalController,
  NavParams,
} from "@ionic/angular";
import { AtendimentoIndividualCidadao } from "src/app/models/AtendimentoIndividualCidadao";
import { AtendimentoIndividualCidadaoSIGTAP } from "src/app/models/AtendimentoIndividualCidadaoSIGTAP";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";
@Component({
  selector: "app-sigtap-form",
  templateUrl: "./sigtap-form.page.html",
  styleUrls: ["./sigtap-form.page.scss"],
})
export class SIGTAPFormPage implements OnInit {
  public subtitle = "SIGTAP ";
  public model: AtendimentoIndividualCidadaoSIGTAP = new AtendimentoIndividualCidadaoSIGTAP();
  public collectionFilter: AtendimentoIndividualCidadaoSIGTAP[];
  public collection: AtendimentoIndividualCidadaoSIGTAP[];
  public modelAtividade: AtendimentoIndividualCidadao = new AtendimentoIndividualCidadao();
  public models: Array<AtendimentoIndividualCidadaoSIGTAP> = [];

  public sigtap: any = [];
  public permissoes = {
    Route: "",
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0,
  }; // Permissoes do modulo para o usuario logado
  public flagForm: boolean = true;
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
    const atendimentoIndividual: string = this.navParams.get(
      "atendimento_individual"
    );
    if (atendimentoIndividual !== undefined) {
      this.model.atendimento_individual_cidadao = parseInt(
        atendimentoIndividual
      );
    }
    this.sigtap = this.navParams.get("sigtap");
    if (this.sigtap !== undefined) {
      this.model = this.sigtap;
    }
  }
  getAtividadeColetivaSigtap() {
    this.router.navigate([
      "atendimento-individual-individuos-form",
      this.model.atendimento_individual_cidadao,
    ]);
  }
  CRUDAtividadeColetivaSigtap(
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
            this.CRUDAtividadeColetivaSigtap(
              "spCRUDAtendimentoIndividualCidadaoSIGTAP",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            let results = JSON.parse(atob(resultado.results));
            this.models = results.map(function callback(value) {
              let model = new AtendimentoIndividualCidadaoSIGTAP();

              model.codigo = value.codigo;
              model.atendimento_individual_cidadao =
                value.atendimento_individual_cidadao;
              model.sigtap = value.sigtap;
              model.exame = value.exame;

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
    let sigtap: string = "";
    let opt: string = "";
    if (this.model.exame) opt = "1";
    else opt = "2";
    console.log(this.model);
    this.modalCtrl.dismiss(this.model);
    //this.model.atividade_coletiva = this.modelAtividade.codigo;

    // Salvando a informação no banco de dados
    /*const params = {
      StatusCRUD: this.model.codigo > 0 ? "UPDATE" : "CREATE",
      formValues: this.model,
    };
    if (
      params.StatusCRUD === "CREATE" ||
      (params.StatusCRUD === "UPDATE" )
    ) {
      this.sendRequest(
        "spCRUDAtividadeColetivaProfissional",
        params,
        (resultado) => {
          console.log(resultado);

          if (params.StatusCRUD === "CREATE") {
            // this.goBack();
          }
        }
      );
      // this.goBack();
    } else {
      this.alertService.presentAlert({
        pTitle: "ATENÇÃO",
        pSubtitle: this.subtitle,
        pMessage: "Nao pode Editar essa Fiscalizacao!",
      });
      this.goBack();
    }*/
    /***********************************************************************************/
    // let sigtap: string = "";
    // let opt: string = "";
    // if (this.model.option) opt = "1";
    // else opt = "2";
    // let ret: any = {
    //   opt: opt,
    //   sigtap: sigtap,
    // };
    // this.model.atendimento_individual = parseInt(
    //   this.Authorizer.CodigoUsuarioSistema
    // );
    // console.log(this.model);
    // // Salvando a informação no banco de dados
    // const params = {
    //   StatusCRUD: "CREATE_SIGTAP",
    //   formValues: this.model,
    // };
    // console.log(this.model.atendimento_individual);
    // if (params.StatusCRUD === "CREATE_SIGTAP") {
    //   this.sendRequest(
    //     "spCRUDAtendimentoIndividualCidadaoSIGTAP",
    //     params,
    //     (resultado) => {
    //       console.log(resultado);
    //       if (params.StatusCRUD === "CREATE_SIGTAP") {
    //         this.modalCtrl.dismiss(ret);
    //       }
    //     }
    //   );
    //this.modalCtrl.dismiss();
    // }
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

            if (procedure === "spCRUDAtendimentoIndividualCidadaoSIGTAP") {
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
  delete(model: AtendimentoIndividualCidadao) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atendimento Individual Cidadao SIGTAP: <strong>${model.cns_cidadao}</strong>!!!`;
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
            "spCRUDAtendimentoIndividualCidadaoSIGTAP",
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
