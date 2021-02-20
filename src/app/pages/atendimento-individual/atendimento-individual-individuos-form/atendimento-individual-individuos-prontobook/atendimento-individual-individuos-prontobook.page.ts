import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NavController,
  PopoverController,
  ModalController,
  NavParams,
} from "@ionic/angular";
import { NgForm } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { AtendimentoIndividualCidadaoProntobook } from "src/app/models/AtendimentoIndividualCidadaoProntobook";
import { IonicSelectableComponent } from "ionic-selectable";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";
@Component({
  selector: "app-atendimento-individual-individuos-prontobook",
  templateUrl: "./atendimento-individual-individuos-prontobook.page.html",
  styleUrls: ["./atendimento-individual-individuos-prontobook.page.scss"],
})
export class AtendimentoIndividualIndividuosProntobookPage implements OnInit {
  public subtitle = " Atendimento Individual ";

  public step = 0;
  public flagForm: boolean = true;
  public CodigoUsuario: any;
  public AgendarProntobook: any;

  public model: AtendimentoIndividualCidadaoProntobook = new AtendimentoIndividualCidadaoProntobook();
  public collectionFilter: AtendimentoIndividualCidadaoProntobook[];
  public collection: AtendimentoIndividualCidadaoProntobook[];
  public collectionAgendamentoProntobook: any = [];

  public collectionHospital: any = [
    { id: "1", nome: "Hospital Ancheita" },
    { id: "2", nome: "Level33 Hospital" },
  ];
  public collectionEspecialidade: any = [
    { id: "1", nome: "Clinico" },
    { id: "2", nome: "Ortopedista" },
    { id: "3", nome: "Ginecologista" },
  ];
  public collectionMedico: any = [{ id: "1", nome: "Clodio" }];
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
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getPermissoesModulo();
    this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
    this.storage.clear();
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
  CRUDAgendamentoProntobook(
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
            this.CRUDAgendamentoProntobook(
              "spCRUDAgendamentoProntobook",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            this.collectionAgendamentoProntobook = JSON.parse(
              atob(resultado.results)
            );
            break;
          default:
          // code block
        }
      }
    );
  }
  /***********************Mask Date****************************/
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
  /**
   * Autor: HATEM CHAOUCH
   * Data: 22/10/2020
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  /***********************Save Data****************************/
  salvar() {
    if (this.model.data_agendamento !== "") {
      this.model.data_agendamento = this.formatarData2(
        this.model.data_agendamento
      );
      console.log(this.model.data_agendamento);
      console.log(this.model.data_agendamento);
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
      this.sendRequest("spCRUDAgendamentoProntobook", params, (resultado) => {
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
  CarregaAtendimentoIndividual() {
    const params = {
      StatusCRUD: "READ",
      formValues: { usuario: this.Authorizer.CodigoUsuarioSistema },
    };

    this.sendRequest("spCRUDAgendamentoProntobook", params, (resultado) => {
      this.collectionFilter = JSON.parse(atob(resultado.results));
      this.collection = this.collectionFilter;
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
    }
  }
  /***********************Send Request****************************/
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
  /***********************Send Request****************************/
  public changeSelectHospital(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.hospital = "Hospital Ancheita";
            break;
          case "2":
            this.model.hospital = "Level33 Hospital";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectEspecialidade(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.especialidade = "Clinico";
            break;
          case "2":
            this.model.especialidade = "Ortopedista";
            break;
          case "3":
            this.model.especialidade = "Ginecologista";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectMedico(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.medico = "Clodio";
            break;
          default:
            break;
        }
      }
    }
  }
}
