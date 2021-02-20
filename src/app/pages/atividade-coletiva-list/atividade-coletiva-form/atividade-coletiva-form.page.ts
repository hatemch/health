import { Component, OnInit, ViewChild } from "@angular/core";
import { AtividadeColetivaForm } from "../../../models/AtividadeColetivaForm";
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
import { ProfissionaisPage } from "../atividade-coletiva-form/profissionais/profissionais.page";

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AtividadeColetivaProfissionais } from "src/app/models/AtividadeColetivaProfissionais";
@Component({
  selector: "app-atividade-coletiva-form",
  templateUrl: "./atividade-coletiva-form.page.html",
  styleUrls: ["./atividade-coletiva-form.page.scss"],
})
export class AtividadeColetivaFormPage implements OnInit {
  public subtitle = "Atividade Coletiva";

  public step = 0;
  public flagForm: boolean = true;

  public model: AtividadeColetivaForm = new AtividadeColetivaForm();
  public models: Array<AtividadeColetivaForm> = [];
  public collectionFilter: AtividadeColetivaForm[];
  public collection: AtividadeColetivaForm[];
  public modelProfissionais: AtividadeColetivaProfissionais = new AtividadeColetivaProfissionais();

  //Variable
  public Latitude: any;
  public Longitude: any;
  public pratica_saude;
  public temas_para_saude;
  public publico_alvo;
  public temas_para_reuniao;
  public cns_profissional;
  public cbo;
  public cnes;
  public ine;
  public turno;
  public local_inep;
  public local_cnes;
  public local_outra_localidade;
  public numero_participantes;
  public numero_avaliacoes_alteradas;
  // mask
  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";

  public collectionPublicoAlvo: any = [
    { id: "1", nome: "Comunidade em geral" },
    { id: "2", nome: "Criança 0 a 3 anos" },
    { id: "3", nome: "Criança 4 a 5 anos" },
    { id: "4", nome: "Criança 6 a 11 anos" },
    { id: "5", nome: "Adolescente" },
    { id: "6", nome: "Mulher" },
    { id: "7", nome: "Gestante" },
    { id: "8", nome: "Homem" },
    { id: "9", nome: "Familiares" },
    { id: "10", nome: "Idoso" },
    { id: "11", nome: "Pessoas com doenças cronicas" },
    { id: "12", nome: "Usuàrio de tabaco" },
    { id: "13", nome: "Usuàrio de àlcool" },
    { id: "14", nome: "Pessoas com sofrimento ou transtorno mental" },
    { id: "15", nome: "Profissional de educação" },
    { id: "16", nome: "Outros" },
  ];
  public collectionAtividadeReuniao: any = [
    { id: "1", nome: "Reunião de equipe" },
    { id: "2", nome: "Reunião com outras equipes de saúde" },
    {
      id: "3",
      nome: "Reunião intersetorial/Conselho Local de saúde/Controle social",
    },
  ];
  public collectionTemasParaReuniao: any = [
    { id: "1", nome: "Questões administrativas/Funcioamento" },
    { id: "2", nome: "Processos de trabalho" },
    { id: "3", nome: "Diagnóstico do território/Monitoramento do território" },
    { id: "4", nome: "Planejamento/Monitoramento das ações da equipe" },
    { id: "5", nome: "Discussão de caso/Projeto Terapêutico Singular" },
    { id: "6", nome: "Educação Permanente" },
    { id: "7", nome: "outros" },
  ];
  public collectionAtividadeSaude: any = [
    { id: "1", nome: "Educação em saúde" },
    { id: "2", nome: "Atendimento em grupo" },
    { id: "3", nome: "Avaliação/Procedimento coletivo" },
    { id: "4", nome: "Mobilização social" },
  ];

  public collectionTemasParaSaude: any = [
    { id: "1", nome: "Ações de combate ao Aedes aegypti" },
    { id: "2", nome: "Agravos negligenciados" },
    { id: "3", nome: "Alimentação saudável" },
    { id: "4", nome: "Autocuidado de pessoas com doenças crônicas" },
    { id: "5", nome: "Cidadania e dereitos humanos" },
    { id: "6", nome: "Dependência química/tabaco/álcool/outras drogas" },
    { id: "7", nome: "Envelhecimento/climatério/andropausa/etc" },
    { id: "8", nome: "Plantas medicinais/Filoterapia" },
    { id: "9", nome: "Prevenção da violência e promoção da cultura da paz" },
    { id: "10", nome: "Saúde ambiental" },
    { id: "11", nome: "Saúde bucal" },
    { id: "12", nome: "Saúde do trabalhador" },
    { id: "13", nome: "Saúde mental" },
    { id: "14", nome: "Saúde sexual e reprodutiva" },
    { id: "15", nome: "Semana saúde na escola" },
    { id: "16", nome: "Outros" },
  ];
  public collectionPraticaSaude: any = [
    { id: "1", nome: "Antropometria" },
    { id: "2", nome: "Aplicação tópica de fluor" },
    { id: "3", nome: "Desenvolvimento da linguagem" },
    { id: "4", nome: "Escovação dental supervisionada" },
    { id: "5", nome: "Práticas corporais e atividade física" },
    { id: "6", nome: "PNCT Sessão 1" },
    { id: "7", nome: "PNCT Sessão 2" },
    { id: "8", nome: "PNCT Sessão 3" },
    { id: "9", nome: "PNCT Sessão 4" },
    { id: "10", nome: "Saúde auditiva" },
    { id: "11", nome: "Saúde ocular" },
    { id: "12", nome: "Verificação da situação vacinal" },
    { id: "13", nome: "Outros" },
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
    private geolocation: Geolocation,
    public activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log("passed value", res);
      this.model.codigo = res.codigo;
      if (this.model.codigo) {
        this.CRUDatividadeColetivo("spCRUDAtividadeColetiva", "READ", {
          codigo: this.model.codigo,
        });
      }
    });
    this.activatedRoute.params.subscribe((res) => {
      console.log("passed Profissionais value", res);
      this.model.codigo = res.atividade_coletiva;
      if (this.model.codigo) {
        this.CRUDatividadeColetivo(
          "spCRUDAtividadeColetivaProfissional",
          "READ",
          {
            atividade_coletiva: this.modelProfissionais.atividade_coletiva,
          }
        );
      }
    });
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
  CRUDatividadeColetivo(
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
            this.CRUDatividadeColetivo("spCRUDAtividadeColetiva", "READ", {
              codigo: this.model.codigo,
            });
            break;
          case "READ":
            let results = JSON.parse(atob(resultado.results));

            this.model.codigo = results[0].codigo;
            this.model.usuario = results[0].usuario;

            this.model.cnes = results[0].cnes;
            this.model.data_cadastro = results[0].data_cadastro;
            this.model.cns_profissional = results[0].cns_profissional;
            this.model.cbo = results[0].cbo;
            this.model.ine = results[0].ine;
            this.model.data_cadastro = results[0].data_cadastro;
            this.model.turno = results[0].turno;
            this.model.longitude = results[0].longitude;
            this.model.latitude = results[0].latitude;
            this.model.pim = results[0].pim;
            this.model.imei = results[0].imei;
            this.model.versao = results[0].versao;
            this.model.local_inep = results[0].local_inep;
            this.model.local_cnes = results[0].local_cnes;
            this.model.local_outra_localidade =
              results[0].local_outra_localidade;
            this.model.atividade_reuniao = results[0].atividade_reuniao;
            this.model.tema_reuniao_questoes_administrativas =
              results[0].tema_reuniao_questoes_administrativas;
            this.model.tema_reuniao_processos_trabalho =
              results[0].tema_reuniao_processos_trabalho;
            this.model.tema_reuniao_diagnostico_territorio =
              results[0].tema_reuniao_diagnostico_territorio;
            this.model.tema_reuniao_planejamento_acoes_equipe =
              results[0].tema_reuniao_planejamento_acoes_equipe;
            this.model.tema_reuniao_discussao_caso =
              results[0].tema_reuniao_discussao_caso;
            this.model.tema_reuniao_educacao_permanente =
              results[0].tema_reuniao_educacao_permanente;
            this.model.tema_reuniao_outros = results[0].tema_reuniao_outros;
            this.model.atividade_saude = results[0].atividade_saude;
            this.model.publico_alvo_comunidade_geral =
              results[0].publico_alvo_comunidade_geral;
            this.model.publico_alvo_crianca0_3_anoas =
              results[0].publico_alvo_crianca0_3_anoas;
            this.model.publico_alvo_crianca4_5_anoas =
              results[0].publico_alvo_crianca4_5_anoas;
            this.model.publico_alvo_crianca6_11_anoas =
              results[0].publico_alvo_crianca6_11_anoas;
            this.model.publico_alvo_adolescente =
              results[0].publico_alvo_adolescente;
            this.model.publico_alvo_mulher = results[0].publico_alvo_mulher;
            this.model.publico_alvo_gestante = results[0].publico_alvo_gestante;
            this.model.publico_alvo_homem = results[0].publico_alvo_homem;
            this.model.publico_alvo_familiares =
              results[0].publico_alvo_familiares;
            this.model.publico_alvo_idoso = results[0].publico_alvo_idoso;
            this.model.publico_alvo_pessoas_doencas_cronicas =
              results[0].publico_alvo_pessoas_doencas_cronicas;
            this.model.publico_alvo_usuario_tabaco =
              results[0].publico_alvo_usuario_tabaco;
            this.model.publico_alvo_usuario_alcool =
              results[0].publico_alvo_usuario_alcool;
            this.model.publico_alvo_usuario_outras_drogas =
              results[0].publico_alvo_usuario_outras_drogas;
            this.model.publico_alvo_pessoas_sofrimento =
              results[0].publico_alvo_pessoas_sofrimento;
            this.model.publico_alvo_profissional_educacao =
              results[0].publico_alvo_profissional_educacao;
            this.model.publico_alvo_outros = results[0].publico_alvo_outros;
            this.model.tema_saude_acoes_combate_aedes_aegypti =
              results[0].tema_saude_acoes_combate_aedes_aegypti;
            this.model.tema_saude_agravos_negligenciados =
              results[0].tema_saude_agravos_negligenciados;
            this.model.tema_saude_alimentacao_saudavel =
              results[0].tema_saude_alimentacao_saudavel;
            this.model.tema_saude_autocuidado_pessoas_doencas_cronicas =
              results[0].tema_saude_autocuidado_pessoas_doencas_cronicas;
            this.model.tema_saude_cidadania_direitos_humanos =
              results[0].tema_saude_cidadania_direitos_humanos;
            this.model.tema_saude_dependencia =
              results[0].tema_saude_dependencia;
            this.model.tema_saude_envelhecimento =
              results[0].tema_saude_envelhecimento;
            this.model.tema_saude_plantas_medicinais =
              results[0].tema_saude_plantas_medicinais;
            this.model.tema_saude_prevencao_violencia =
              results[0].tema_saude_prevencao_violencia;
            this.model.tema_saude_ambiental = results[0].tema_saude_ambiental;
            this.model.tema_saude_bucal = results[0].tema_saude_bucal;
            this.model.tema_saude_trabalhador =
              results[0].tema_saude_trabalhador;
            this.model.tema_saude_mental = results[0].tema_saude_mental;
            this.model.tema_saude_sexual_reprodutiva =
              results[0].tema_saude_sexual_reprodutiva;
            this.model.tema_saude_semana_saude_escola =
              results[0].tema_saude_semana_saude_escola;
            this.model.tema_saude_outros = results[0].tema_saude_outros;
            this.model.pratica_saude_antropometria =
              results[0].pratica_saude_antropometria;
            this.model.pratica_saude_aplicacao_topica_fluor =
              results[0].pratica_saude_aplicacao_topica_fluor;
            this.model.pratica_saude_desenvolvimento_linguagem =
              results[0].pratica_saude_desenvolvimento_linguagem;
            this.model.pratica_saude_escovacao_dental_supervisionada =
              results[0].pratica_saude_escovacao_dental_supervisionada;
            this.model.pratica_saude_praticas_corporais =
              results[0].pratica_saude_praticas_corporais;
            this.model.pratica_saude_pnct_sessao1 =
              results[0].pratica_saude_pnct_sessao1;
            this.model.pratica_saude_pnct_sessao2 =
              results[0].pratica_saude_pnct_sessao2;
            this.model.pratica_saude_pnct_sessao3 =
              results[0].pratica_saude_pnct_sessao3;
            this.model.pratica_saude_pnct_sessao4 =
              results[0].pratica_saude_pnct_sessao4;
            this.model.pratica_saude_auditiva =
              results[0].pratica_saude_auditiva;
            this.model.pratica_saude_ocular = results[0].pratica_saude_ocular;
            this.model.pratica_saude_verificacao_situacao_vacinal =
              results[0].pratica_saude_verificacao_situacao_vacinal;
            this.model.pratica_saude_outras = results[0].pratica_saude_outras;
            this.model.pratica_saude_outro_procedimento_coletivo =
              results[0].pratica_saude_outro_procedimento_coletivo;
            this.model.pratica_saude_sigtap = results[0].pratica_saude_sigtap;
            this.model.numero_participantes = results[0].numero_participantes;
            this.model.numero_avaliacoes_alteradas =
              results[0].numero_avaliacoes_alteradas;
            console.log("model", this.model);

            return this.model;

            break;
          default:
        }
      }
    );
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
  /************************************Save methode****************************************************/
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
      this.sendRequest("spCRUDAtividadeColetiva", params, (resultado) => {
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
  /****************************our fragment******************************/

  OpenModal() {
    // I add componentProps because we need to past the codigo of atividade coletiva for he READ the list of Profissionais.ts
    const modal = this.modalCtrl
      .create({
        component: ProfissionaisPage,
        componentProps: { atividade_coletiva: this.model.codigo },
      })
      .then((modalElement) => {
        modalElement.present();
      });
  }
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = "";
    }
  }
  getAtividadeColetivaIDProfissionais() {
    this.router.navigate(["profissionais/edit/:codigo", this.model.codigo]);
  }
  /****************************changeSelect******************************/
  public changeSelectTemasParaReuniao(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.tema_reuniao_questoes_administrativas = "S";
            break;
          case "2":
            this.model.tema_reuniao_processos_trabalho = "S";
            break;
          case "3":
            this.model.tema_reuniao_diagnostico_territorio = "S";
            break;
          case "4":
            this.model.tema_reuniao_planejamento_acoes_equipe = "S";
            break;
          case "5":
            this.model.tema_reuniao_discussao_caso = "S";
            break;
          case "6":
            this.model.tema_reuniao_educacao_permanente = "S";
            break;
          case "7":
            this.model.tema_reuniao_outros = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectPublicoAlvo(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.publico_alvo_comunidade_geral = "S";
            break;
          case "2":
            this.model.publico_alvo_crianca0_3_anoas = "S";
            break;
          case "3":
            this.model.publico_alvo_crianca4_5_anoas = "S";
            break;
          case "4":
            this.model.publico_alvo_crianca6_11_anoas = "S";
            break;
          case "5":
            this.model.publico_alvo_adolescente = "S";
            break;
          case "6":
            this.model.publico_alvo_mulher = "S";
            break;
          case "7":
            this.model.publico_alvo_gestante = "S";
            break;
          case "8":
            this.model.publico_alvo_homem = "S";
            break;
          case "9":
            this.model.publico_alvo_familiares = "S";
            break;
          case "10":
            this.model.publico_alvo_idoso = "S";
            break;
          case "11":
            this.model.publico_alvo_pessoas_doencas_cronicas = "S";
            break;
          case "12":
            this.model.publico_alvo_usuario_tabaco = "S";
            break;
          case "13":
            this.model.publico_alvo_usuario_alcool = "S";
            break;
          case "14":
            this.model.publico_alvo_usuario_outras_drogas = "S";
            break;
          case "15":
            this.model.publico_alvo_pessoas_sofrimento = "S";
            break;
          case "16":
            this.model.publico_alvo_profissional_educacao = "S";
            break;
          case "17":
            this.model.publico_alvo_outros = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectTemasParaSaude(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.tema_saude_acoes_combate_aedes_aegypti = "S";
            break;
          case "2":
            this.model.tema_saude_agravos_negligenciados = "S";
            break;
          case "3":
            this.model.tema_saude_alimentacao_saudavel = "S";
            break;
          case "4":
            this.model.tema_saude_autocuidado_pessoas_doencas_cronicas = "S";
            break;
          case "5":
            this.model.tema_saude_cidadania_direitos_humanos = "S";
            break;
          case "6":
            this.model.tema_saude_dependencia = "S";
            break;
          case "7":
            this.model.tema_saude_envelhecimento = "S";
            break;
          case "8":
            this.model.tema_saude_plantas_medicinais = "S";
            break;
          case "9":
            this.model.tema_saude_prevencao_violencia = "S";
            break;
          case "10":
            this.model.tema_saude_ambiental = "S";
            break;
          case "11":
            this.model.tema_saude_bucal = "S";
            break;
          case "12":
            this.model.tema_saude_trabalhador = "S";
            break;
          case "13":
            this.model.tema_saude_mental = "S";
            break;
          case "14":
            this.model.tema_saude_sexual_reprodutiva = "S";
            break;
          case "15":
            this.model.tema_saude_semana_saude_escola = "S";
            break;
          case "16":
            this.model.tema_saude_outros = "S";
            break;

          default:
            break;
        }
      }
    }
  }
  public changeSelectPraticaSaude(item) {
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.pratica_saude_antropometria = "S";
            break;
          case "2":
            this.model.pratica_saude_aplicacao_topica_fluor = "S";
            break;
          case "3":
            this.model.pratica_saude_desenvolvimento_linguagem = "S";
            break;
          case "4":
            this.model.pratica_saude_escovacao_dental_supervisionada = "S";
            break;
          case "5":
            this.model.pratica_saude_praticas_corporais = "S";
            break;
          case "6":
            this.model.pratica_saude_pnct_sessao1 = "S";
            break;
          case "7":
            this.model.pratica_saude_pnct_sessao2 = "S";
            break;
          case "8":
            this.model.pratica_saude_pnct_sessao3 = "S";
            break;
          case "9":
            this.model.pratica_saude_pnct_sessao4 = "S";
            break;
          case "10":
            this.model.pratica_saude_auditiva = "S";
            break;
          case "11":
            this.model.pratica_saude_ocular = "S";
            break;
          case "12":
            this.model.pratica_saude_verificacao_situacao_vacinal = "S";
            break;
          case "13":
            this.model.pratica_saude_outras = "S";
            break;
          case "14":
            this.model.pratica_saude_outro_procedimento_coletivo = "S";
            break;
          case "15":
            this.model.pratica_saude_sigtap = "S";
            break;

          default:
            break;
        }
      }
    }
  }

  public changeSelects(item, selectName) {
    console.log(item);
    console.log(selectName);
    this[selectName] = item;
  }
  public changeSelect(modelAttr, e) {
    this.model[modelAttr] = e.target.value;
  }
  getAtividadeColetivaID() {
    this.router.navigate([
      "atividade-coletiva-individuo-list",
      this.model.codigo,
    ]);
  }
  delete(model: AtividadeColetivaForm) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atividade Coletiva: <strong>${model.cns_profissional}</strong>!!!`;
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

          this.sendRequest("spCRUDAtividadeColetiva", params, (resultado) => {
            this.collection.forEach(function (model, index, collection) {
              if (model.codigo == this) {
                collection.splice(index, 1);
              }
            }, model.codigo);
            this.resetModel();
          });
        },
      },
    ];

    document.body.appendChild(alert);
    return alert.present();
  }
  /*************************************************************************/
}
