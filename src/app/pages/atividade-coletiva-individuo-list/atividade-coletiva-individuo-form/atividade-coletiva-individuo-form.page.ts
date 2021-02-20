import { Component, OnInit, ViewChild } from "@angular/core";
import { AtividadeColetivaIndividioForm } from "../../../models/AtividadeColetivaIndividioForm";
import { NgForm } from "@angular/forms";
import {
  NavController,
  PopoverController,
  ModalController,
  NavParams,
} from "@ionic/angular";
import { AlertService } from "../../../services/alert.service";
import { AuthService } from "../../../services/auth.service";
import { EnvService } from "../../../services/env.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-atividade-coletiva-individuo-form",
  templateUrl: "./atividade-coletiva-individuo-form.page.html",
  styleUrls: ["./atividade-coletiva-individuo-form.page.scss"],
})
export class AtividadeColetivaIndividuoFormPage implements OnInit {
  public subtitle = "Atividade Coletiva";

  public step = 0;
  public flagForm: boolean = true;

  public model: AtividadeColetivaIndividioForm = new AtividadeColetivaIndividioForm();
  public collectionFilter: AtividadeColetivaIndividioForm[];
  public collection: AtividadeColetivaIndividioForm[];

  // mask
  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";

  public flagAvaliacao_alterada = false;
  public flagCessou_habito_fumar = false;
  public flagAbandonou_groupo = false;

  public collectionSexo: any = [
    { id: "1", nome: "Masculino" },
    { id: "2", nome: "Feminino" },
  ];
  private permissoes = {
    Route: "",
    Pesquisar: 0,
    Inserir: 0,
    Editar: 0,
    Deletar: 0,
  };
  public atividadeColetivo;

  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log("passed value", res);
      this.model.atividade_coletiva = res.codigo;
      if (this.model.atividade_coletiva) {
        this.CRUDatividadeColetivoCidadao(
          "spCRUDAtividadeColetivaCidadao",
          "READ",
          {
            codigo: this.model.atividade_coletiva,
          }
        );
      }
    });
  }
  goGalleries() {
    this.navCtrl.navigateRoot("/atividade-coletiva-foto");
  }
  /************************************Retrive DATA****************************************************/
  CRUDatividadeColetivoCidadao(
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
            this.CRUDatividadeColetivoCidadao(
              "spCRUDAtividadeColetivaCidadao",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            let results = JSON.parse(atob(resultado.results));

            this.model.codigo = results[0].codigo;
            this.model.atividade_coletiva = results[0].atividade_coletiva;
            this.model.cns_cidadao = results[0].cns_cidadao;
            this.model.data_nascimento = results[0].data_nascimento;
            this.model.sexo = results[0].sexo;
            this.model.avaliacao_alterada = results[0].avaliacao_alterada;
            this.model.antropometria_peso = results[0].antropometria_peso;
            this.model.antropometria_altura = results[0].antropometria_altura;
            this.model.tabagismo_cessou_habito_fumar =
              results[0].tabagismo_cessou_habito_fumar;
            this.model.tabagismo_abandonou_grupo =
              results[0].tabagismo_abandonou_grupo;

            console.log("model", this.model);

            return this.model;

            break;
          default:
        }
      }
    );
  }
  /************************************Save methode****************************************************/
  salvar() {
    if (this.model.data_nascimento !== "") {
      this.model.data_nascimento = this.formatarData(
        this.model.data_nascimento
      );
      console.log(this.model.data_nascimento);
    }

    this.activatedRoute.params.subscribe((res) => {
      console.log("passed value", res);
      // this.model.codigo = res.codigo;
      this.model.atividade_coletiva = res.atividade_coletiva;
    });

    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: this.model.codigo > 0 ? "UPDATE" : "CREATE",
      formValues: this.model,
    };
    this.activatedRoute.params.subscribe((res) => {
      console.log("atividade_coletiva", res);
      this.model.atividade_coletiva = res.atividade_coletiva;
    });
    console.log(this.model.atividade_coletiva);
    if (params.StatusCRUD === "CREATE" || params.StatusCRUD === "UPDATE") {
      this.sendRequest(
        "spCRUDAtividadeColetivaCidadao",
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

  /****************************Convert form date****************************************** */
  private formatarData(strData: string) {
    // alterar formato de dd/mm/yyyy HH:mm:ss para yyyy-mm-dd HH:mm:ss
    const datahora = strData.split("T");
    if (datahora.length === 2) {
      const data = datahora[0];
      const hora = datahora[1];
      const min = hora.split(".");
      const diaMesAno = data.split("-");
      return (
        diaMesAno[1] + "/" + diaMesAno[2] + "/" + diaMesAno[0] + " " + min[0]
      );
    } else {
      return strData;
    }
  }

  private formatarData2(strData: string) {
    // alterar formato de yyyy-mm-dd HH:mm:ss para mm/dd/yyyy HH:mm:ss
    const datahora = strData.split("T");
    if (datahora.length === 2) {
      const data = datahora[0];
      const hora = datahora[1];
      const diaMesAno = data.split("-");
      return diaMesAno[1] + "/" + diaMesAno[2] + "/" + diaMesAno[0];
    } else if (datahora.length === 1) {
      const data = datahora[0];
      const diaMesAno = data.split("/");
      return diaMesAno[1] + "/" + diaMesAno[2] + "/" + diaMesAno[0];
    } else {
      return strData;
    }
  }
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
            this.alertService.showLoader(resultado.message, 100);
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
  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }
  public changeCheck(modelAttr, flag) {
    this.model[modelAttr] = this[flag] ? "S" : "N";
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
    alert.message = `Deseja excluir o Atividade Coletiva: <strong>${model.cns_cidadao}</strong>!!!`;
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
