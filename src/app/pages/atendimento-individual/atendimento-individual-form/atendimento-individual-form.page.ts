import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, PopoverController } from "@ionic/angular";
import { AtendimentoIndividual } from "../../../models/AtendimentoIndividual";
import { NgForm } from "@angular/forms";
import { AlertService } from "../../../services/alert.service";
import { AuthService } from "../../../services/auth.service";
import { EnvService } from "../../../services/env.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-atendimento-individual-form",
  templateUrl: "./atendimento-individual-form.page.html",
  styleUrls: ["./atendimento-individual-form.page.scss"],
})
export class AtendimentoIndividualFormPage implements OnInit {
  public subtitle = "Cadastro Atendimento Individual ";

  public step = 0;
  public flagForm: boolean = true;

  public model: AtendimentoIndividual = new AtendimentoIndividual();
  public collectionFilter: AtendimentoIndividual[];
  public collection: AtendimentoIndividual[];
  //Variable
  public Latitude: any;
  public Longitude: any;
  public cns_profissional;
  public cbo;
  public cnes;
  public ine;
  public cns_profissional_secundario;
  public cbo_secundario;
  public cnes_secundario;
  public ine_secundario;
  public data_cadastro;
  // mask
  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";

  public currentLatitude: any = "";
  public currentLongitude: any = "";

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
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log("passed value", res);
      this.model.codigo = res.codigo;
      if (this.model.codigo) {
        this.CRUDAtendamentoIndividual("spCRUDAtendimentoIndividual", "READ", {
          codigo: this.model.codigo,
        });
      }
    });
    this.getCoordinates();
  }
  /****************************Get localisation****************************************** */

  async getCoordinates() {
    this.geolocation
      .getCurrentPosition({
        maximumAge: 1000,
        timeout: 5000,
        enableHighAccuracy: true,
      })
      .then(
        (resp) => {
          this.model.latitude = resp.coords.latitude.toString();
          this.model.longitude = resp.coords.longitude.toString();
          console.log("currentLatitude", this.model.latitude);
          console.log("currentLongitude", this.model.longitude);
        },
        (er) => {}
      )
      .catch((error) => {
        alert("Error getting location" + JSON.stringify(error));
      });
  }

  goGalleries() {
    this.navCtrl.navigateRoot("/atividade-coletiva-foto");
  }
  /************************************Retrive DATA****************************************************/
  CRUDAtendamentoIndividual(
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
            this.CRUDAtendamentoIndividual(
              "spCRUDAtendimentoIndividual",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            let results = JSON.parse(atob(resultado.results));

            this.model.codigo = results[0].codigo;
            this.model.usuario = results[0].usuario;
            this.model.cns_profissional = results[0].cns_profissional;
            this.model.cnes = results[0].cnes;
            this.model.cbo = results[0].cbo;
            this.model.ine = results[0].ine;
            this.model.cns_profissional_secundario =
              results[0].cns_profissional_secundario;
            this.model.cnes_secundario = results[0].cnes_secundario;
            this.model.cbo_secundario = results[0].cbo_secundario;
            this.model.ine_secundario = results[0].ine_secundario;
            this.model.data_cadastro = results[0].data_cadastro;

            console.log("model", this.model);

            return this.model;

            break;
          default:
        }
      }
    );
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

            if (procedure === "spCRUDAtividadeColetiva") {
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

  /**
   * Autor: HATEM CHAOUCH
   * Data: 07/10/2020
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */

  salvar() {
    if (this.model.data_cadastro !== "") {
      this.model.data_cadastro = this.formatarData(this.model.data_cadastro);
      console.log(this.model.data_cadastro);
    }

    this.model.usuario = parseInt(this.Authorizer.CodigoUsuarioSistema);
    console.log(this.model);
    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: this.model.codigo > 0 ? "UPDATE" : "CREATE",
      formValues: this.model,
    };
    console.log(this.model.usuario);
    if (
      params.StatusCRUD === "CREATE" ||
      (params.StatusCRUD === "UPDATE" &&
        this.model.usuario === parseInt(this.Authorizer.CodigoUsuarioSistema))
    ) {
      this.sendRequest("spCRUDAtendimentoIndividual", params, (resultado) => {
        console.log(resultado);
        if (params.StatusCRUD === "CREATE") {
          this.goBack();
        }
      });
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

  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }

  /* ------------------------------------------- MASK DATE ----------------------------------------- */
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
  getAtendimentoIndividualID() {
    this.router.navigate(["atendimento-individual-cidade", this.model.codigo]);
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
}
