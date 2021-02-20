import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NavController,
  PopoverController,
  ModalController,
  NavParams,
} from "@ionic/angular";
import { AtendimentoIndividual } from "../../../models/AtendimentoIndividual";
import { NgForm } from "@angular/forms";
import { AlertService } from "../../../services/alert.service";
import { AuthService } from "../../../services/auth.service";
import { EnvService } from "../../../services/env.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SIGTAPFormPage } from "../../sigtap-form/sigtap-form.page";
import { AtendimentoIndividualCidadao } from "src/app/models/AtendimentoIndividualCidadao";
import { IonicSelectableComponent } from "ionic-selectable";
import { AtendimentoIndividualCidadaoSIGTAP } from "src/app/models/AtendimentoIndividualCidadaoSIGTAP";
@Component({
  selector: "app-atendimento-individual-individuos-form",
  templateUrl: "./atendimento-individual-individuos-form.page.html",
  styleUrls: ["./atendimento-individual-individuos-form.page.scss"],
})
export class AtendimentoIndividualIndividuosFormPage implements OnInit {
  public subtitle = " Atendimento Individual ";

  public step = 0;
  public flagForm: boolean = true;

  public flagVacinacao = false;
  public flagGravidez_planejada = false;
  public flagAgendar_prontobook = false;
  public flagFicou_em_observacao = false;

  public model: AtendimentoIndividualCidadao = new AtendimentoIndividualCidadao();
  public collectionFilter: AtendimentoIndividualCidadao[];
  public collection: AtendimentoIndividualCidadao[];
  public modelSigtap: AtendimentoIndividualCidadaoSIGTAP = new AtendimentoIndividualCidadaoSIGTAP();
  public collectionSigtap: any = [];
  // Variable des select
  public nasf_polo;
  public problema_condicao_avaliada;
  public doencas_transmissiveis;
  public conduta_desfecho;
  public encaminhamento;
  // mask
  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";

  //collections
  public collectionSexo: any = [
    { id: "masculino", nome: "Masculino" },
    { id: "feminino", nome: "Feminino" },
  ];
  public collectionNasfPolo: any = [
    { id: "1", nome: "Avaliação/Diagnóstico" },
    { id: "2", nome: "Procedimentos clínicos/terapêutico" },
    { id: "3", nome: "Prescrição terapêutica" },
  ];
  public collectionProblemaCondicaoAvaliada: any = [
    { id: "1", nome: "Asma" },
    { id: "2", nome: "Desnutrição" },
    { id: "3", nome: "Diabetes" },
    { id: "4", nome: "DPOC" },
    { id: "5", nome: "Hipertensão arterial" },
    { id: "6", nome: "Obesidade" },
    { id: "7", nome: "Pré-natal" },
    { id: "8", nome: "Puericultura" },
    { id: "9", nome: "Puerpério (até 42 dias)" },
    { id: "10", nome: "Saúde sexual e reprodutiva" },
    { id: "11", nome: "Tabagismo" },
    { id: "12", nome: "Usuário de alcool" },
    { id: "13", nome: "Usuário de outras drogas" },
    { id: "14", nome: "Saúde mental" },
    { id: "15", nome: "Reabilitação" },
  ];
  public collectionLocalAtendimento: any = [
    { id: "1", nome: "UBS" },
    { id: "2", nome: "Unidade móvel" },
    { id: "3", nome: "Rua" },
    { id: "4", nome: "Domicílio" },
    { id: "5", nome: "Escola/Creche" },
    { id: "6", nome: "Polo(Academia da saúde)" },
    { id: "7", nome: "Instituição/Abrigo" },
    { id: "8", nome: "Unidade prisional ou congêneres" },
    { id: "9", nome: "Unidade socioeducativa" },
    { id: "10", nome: "Outros" },
  ];
  public collectionEncaminhamento: any = [
    { id: "1", nome: "Encaminhamento interno no dia" },
    { id: "2", nome: "Encaminhamento para serviço especializado" },
    { id: "3", nome: "Encaminhamento para CAPS" },
    { id: "4", nome: "Encaminhamento para internaçã hospitalar" },
    { id: "5", nome: "Encaminhamento para urgencia" },
    { id: "6", nome: "Encaminhamento para serviço de Atençã Domiciliar" },
    { id: "7", nome: "Encaminhamento intersetorial" },
  ];
  public collectionDoencasTransmissiveis: any = [
    { id: "1", nome: "Tuberculos" },
    { id: "2", nome: "Hanseniase" },
    { id: "3", nome: "Dengue" },
    { id: "4", nome: "DST" },
  ];
  public collectionCondutaDesfecho: any = [
    { id: "1", nome: "Retorno para consulta agendada" },
    { id: "2", nome: "Retorno para cuidado continuado/programado" },
    { id: "3", nome: "Agendamento para grupos" },
    { id: "4", nome: "Agendamento para NASF" },
    { id: "5", nome: "Alta do episódio" },
  ];
  public collectionRastreamento: any = [
    { id: "1", nome: "Câncer do colo do útero" },
    { id: "2", nome: "Câncer de mama" },
    { id: "3", nome: "Risco cardiovascular" },
  ];
  public collectionTipoAtendimento: any = [
    { id: "1", nome: "Consulta agendada programada/Cuidado continuado" },
    { id: "2", nome: "Consulta agendada" },
    { id: "3", nome: "Escuta inicial/Orientação" },
    { id: "4", nome: "Consulta no dia" },
    { id: "5", nome: "Atendimento de Urgência" },
  ];
  public collectionModalidadeAD: any = [
    { id: "1", nome: "AD1" },
    { id: "2", nome: "AD2" },
    { id: "3", nome: "AD3" },
  ];
  public collectionRacionalidadeSaude: any = [
    { id: "1", nome: "Medicina traditional chenisa" },
    { id: "2", nome: "Antroposofia aplicada à saúde" },
    { id: "3", nome: "Homeopatia" },
    { id: "4", nome: "Fitoterapia" },
    { id: "5", nome: "Ayurveda" },
    { id: "6", nome: "outra" },
  ];
  public collectionAleitamentoMaterno: any = [
    { id: "1", nome: "Exclusivo" },
    { id: "2", nome: "Predominante" },
    { id: "3", nome: "Complementado" },
    { id: "4", nome: "Inexistente" },
  ];
  // Permissoes do modulo para o usuario logado
  // private permissoes = {
  //   Route: "",
  //   Pesquisar: 0,
  //   Inserir: 0,
  //   Editar: 0,
  //   Deletar: 0,
  // };
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private Authorizer: AuthService,
    private env: EnvService,
    private popoverController: PopoverController,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log("passed value", res);
      this.model.atendimento_individual = res.codigo;
      if (this.model.atendimento_individual) {
        this.CRUDAtendimentoIndividualCidadao(
          "spCRUDAtendimentoIndividualCidadao",
          "READ",
          {
            codigo: this.model.atendimento_individual,
          }
        );
        // this.CRUDAtendimentoIndividualCidadaoSigtap(
        //   "spCRUDAtendimentoIndividualCidadaoSIGTAP",
        //   "READ",
        //   {
        //     atendimento_individual_cidadao: this.model.atendimento_individual,
        //   }
        // );
      }
    });
  }
  goGalleries() {
    this.navCtrl.navigateRoot("/atendimento-individual-foto");
  }
  /************************************Retrive DATA****************************************************/
  CRUDAtendimentoIndividualCidadaoSigtap(
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
            this.CRUDAtendimentoIndividualCidadaoSigtap(
              "spCRUDAtendimentoIndividualCidadaoSIGTAP",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            this.collectionSigtap = JSON.parse(atob(resultado.results));
            break;
          default:
          // code block
        }
      }
    );
  }
  CRUDAtendimentoIndividualCidadao(
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
            this.CRUDAtendimentoIndividualCidadao(
              "spCRUDAtendimentoIndividualCidadao",
              "READ",
              {
                codigo: this.model.codigo,
              }
            );
            break;
          case "READ":
            let results = JSON.parse(atob(resultado.results));

            this.model.codigo = results[0].codigo;
            this.model.atendimento_individual =
              results[0].atendimento_individual;
            this.model.turno = results[0].turno;
            this.model.numero_prontuario = results[0].numero_prontuario;
            this.model.cns_cidadao = results[0].cns_cidadao;
            this.model.data_nascimento = results[0].data_nascimento;
            this.model.sexo = results[0].sexo;
            this.model.local_atendimento = results[0].local_atendimento;
            this.model.tipo_atendimento = results[0].tipo_atendimento;
            this.model.atencao_domiciliar = results[0].atencao_domiciliar;
            this.model.racionalidade_saude = results[0].racionalidade_saude;
            this.model.perimetro_cefalico = results[0].perimetro_cefalico;
            this.model.peso = results[0].peso;
            this.model.altura = results[0].altura;
            this.model.vacinacao_em_dia = results[0].vacinacao_em_dia;
            this.model.aleitamento_materno = results[0].aleitamento_materno;
            this.model.dum = results[0].dum;
            this.model.gravidez_planejada = results[0].gravidez_planejada;
            this.model.idade_gestacional = results[0].idade_gestacional;
            this.model.gestas_previas = results[0].gestas_previas;
            this.model.partos = results[0].partos;
            this.model.asma = results[0].asma;
            this.model.desnutricao = results[0].desnutricao;
            this.model.diabetes = results[0].diabetes;
            this.model.dpoc = results[0].dpoc;
            this.model.hipertensao_arterial = results[0].hipertensao_arterial;
            this.model.obesidade = results[0].obesidade;
            this.model.prenatal = results[0].prenatal;
            this.model.puericultura = results[0].puericultura;
            this.model.puerperio = results[0].puerperio;
            this.model.saude_sexual_reprodutiva =
              results[0].saude_sexual_reprodutiva;
            this.model.tabagismo = results[0].tabagismo;
            this.model.usuario_alcool = results[0].usuario_alcool;
            this.model.usuario_outras_drogas = results[0].usuario_outras_drogas;
            this.model.saude_mental = results[0].saude_mental;
            this.model.reabilitacao = results[0].reabilitacao;
            this.model.tuberculose = results[0].tuberculose;
            this.model.hanseniase = results[0].hanseniase;
            this.model.dengue = results[0].dengue;
            this.model.dst = results[0].dst;
            this.model.cancer_colo_utero = results[0].cancer_colo_utero;
            this.model.cancer_mama = results[0].cancer_mama;
            this.model.risco_cardiovascular = results[0].risco_cardiovascular;
            this.model.ciap2_1 = results[0].ciap2_1;
            this.model.ciap2_2 = results[0].ciap2_2;
            this.model.cid10_1 = results[0].cid10_1;
            this.model.cid10_2 = results[0].cid10_2;
            this.model.colesterol_total = results[0].colesterol_total;
            this.model.creatinina = results[0].creatinina;
            this.model.eas_equ = results[0].eas_equ;
            this.model.eletrocardiograma = results[0].eletrocardiograma;
            this.model.eletroforese_hemoglobina =
              results[0].eletroforese_hemoglobina;
            this.model.espirometria = results[0].espirometria;
            this.model.exame_escarro = results[0].exame_escarro;
            this.model.glicemia = results[0].glicemia;
            this.model.hdl = results[0].hdl;
            this.model.hemoglobina_glicada = results[0].hemoglobina_glicada;
            this.model.hemograma = results[0].hemograma;
            this.model.ldl = results[0].ldl;
            this.model.retinografia = results[0].retinografia;
            this.model.sorologia_sifilis = results[0].sorologia_sifilis;
            this.model.sorologia_dengue = results[0].sorologia_dengue;
            this.model.sorologia_hiv = results[0].sorologia_hiv;
            this.model.teste_antiglobulina = results[0].teste_antiglobulina;
            this.model.teste_gravidez = results[0].teste_gravidez;
            this.model.ultrassonografia_obstetrica =
              results[0].ultrassonografia_obstetrica;
            this.model.urocultura = results[0].urocultura;
            this.model.teste_orelinha = results[0].teste_orelinha;
            this.model.teste_olhinho = results[0].teste_olhinho;
            this.model.teste_pezinho = results[0].teste_pezinho;
            this.model.ficou_em_observacao = results[0].ficou_em_observacao;
            this.model.nasf_avaliacao = results[0].nasf_avaliacao;
            this.model.nasf_procedimentos_clinicos =
              results[0].nasf_procedimentos_clinicos;
            this.model.nasf_prescricao_terapeutica =
              results[0].nasf_prescricao_terapeutica;
            this.model.retorno_consulta_agendada =
              results[0].retorno_consulta_agendada;
            this.model.retorno_programado = results[0].retorno_programado;
            this.model.agendamento_grupos = results[0].agendamento_grupos;
            this.model.agendamento_nasf = results[0].agendamento_nasf;
            this.model.alta_do_episodio = results[0].alta_do_episodio;
            this.model.encaminhamento_interno_dia =
              results[0].encaminhamento_interno_dia;
            this.model.encaminhamento_especializado =
              results[0].encaminhamento_especializado;
            this.model.encaminhamento_caps = results[0].encaminhamento_caps;
            this.model.encaminhamento_internacao =
              results[0].encaminhamento_internacao;
            this.model.encaminhamento_urgencia =
              results[0].encaminhamento_urgencia;
            this.model.encaminhamento_atencao_domiciliar =
              results[0].encaminhamento_atencao_domiciliar;
            this.model.encaminhamento_intersetorial =
              results[0].encaminhamento_intersetorial;
            this.model.data_importacao = results[0].data_importacao;
            this.model.agendar_prontobook = results[0].agendar_prontobook;

            console.log("model", this.model);

            return this.model;

            break;
          default:
        }
      }
    );
  }
  /**
   * Autor: HATEM CHAOUCH
   * Data: 22/10/2020
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */

  salvar() {
    if (this.model.dum !== "") {
      this.model.dum = this.formatarData2(this.model.dum);
      console.log(this.model.dum);
    }
    if (this.model.data_nascimento !== "") {
      this.model.data_nascimento = this.formatarData2(
        this.model.data_nascimento
      );
      console.log(this.model.data_nascimento);
    }
    this.activatedRoute.params.subscribe((res) => {
      console.log("passed value", res);
      this.model.atendimento_individual = res.atendimento_individual;
    });

    // Salvando a informação no banco de dados
    const params = {
      StatusCRUD: this.model.codigo > 0 ? "UPDATE" : "CREATE",
      formValues: this.model,
    };
    this.activatedRoute.params.subscribe((res) => {
      console.log("atendimento_individual", res);
      this.model.atendimento_individual = res.atendimento_individual;
    });
    console.log(this.model.atendimento_individual);
    if (params.StatusCRUD === "CREATE" || params.StatusCRUD === "UPDATE") {
      this.sendRequest(
        "spCRUDAtendimentoIndividualCidadao",
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

  public changeCheck(modelAttr, flag) {
    this.model[modelAttr] = this[flag] ? "S" : "N";
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

  /* ------------------------------------------- ADD SIGTAP ------------------------------------------ */
  async OpenModal() {
    // I add componentProps because we need to past the codigo of atividade coletiva for he READ the list of Sigtap.ts
    const modal = await this.modalCtrl.create({
      component: SIGTAPFormPage,
      componentProps: {
        atendimento_individual_cidadao: this.model.atendimento_individual,
      },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      const dados = data.data;
      this.collectionSigtap.push(dados);
    });
    return await modal.present();
  }

  async editarSigtap(model, index) {
    const modal = await this.modalCtrl.create({
      component: SIGTAPFormPage,
      componentProps: { sigtap: model },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.collectionSigtap[index] = data.data;
    });
    return await modal.present();
  }

  deleteSigtap(modelSigtap: any) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Sigtap: <strong>${modelSigtap.sigtap}</strong>!!!`;
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
          this.collectionSigtap.forEach(function (model, index, collection) {
            if (model.codigo === this) {
              collection.splice(index, 1);
            }
          }, modelSigtap.CodigoUsuarioPerfil);
        },
      },
    ];
    document.body.appendChild(alert);
    return alert.present();
  }

  // private resetModel() {
  //   // tslint:disable-next-line: forin
  //   for (const key in this.model) {
  //     this.model[key] = "";
  //   }
  // }
  getAtividadeColetivaIDSigtap() {
    this.router.navigate(["sigtap-form/edit/:codigo", this.model.codigo]);
  }
  /******************************DELETE**************************************/
  private resetModel() {
    // tslint:disable-next-line: forin
    for (const key in this.model) {
      this.model[key] = "";
    }
  }
  delete(model: AtendimentoIndividualCidadao) {
    const alert = document.createElement("ion-alert");
    alert.header = "Excluíndo!";
    alert.message = `Deseja excluir o Atendimento Individual : <strong>${model.cns_cidadao}</strong>!!!`;
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
  /****************************changeSelect******************************/
  public changeSelectEncaminhamento(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.encaminhamento_interno_dia = "S";
            break;
          case "2":
            this.model.encaminhamento_especializado = "S";
            break;
          case "3":
            this.model.encaminhamento_caps = "S";
            break;
          case "4":
            this.model.encaminhamento_internacao = "S";
            break;
          case "5":
            this.model.encaminhamento_urgencia = "S";
            break;
          case "6":
            this.model.encaminhamento_atencao_domiciliar = "S";
            break;
          case "7":
            this.model.encaminhamento_intersetorial = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectCondutaDesfecho(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.retorno_consulta_agendada = "S";
            break;
          case "2":
            this.model.retorno_programado = "S";
            break;
          case "3":
            this.model.agendamento_grupos = "S";
            break;
          case "4":
            this.model.agendamento_nasf = "S";
            break;
          case "5":
            this.model.alta_do_episodio = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectNasfPolo(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.nasf_avaliacao = "S";
            break;
          case "2":
            this.model.nasf_procedimentos_clinicos = "S";
            break;
          case "3":
            this.model.nasf_prescricao_terapeutica = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectRastreamento(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.cancer_colo_utero = "S";
            break;
          case "2":
            this.model.cancer_mama = "S";
            break;
          case "3":
            this.model.risco_cardiovascular = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectDoencasTransmissiveis(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.tuberculose = "S";
            break;
          case "2":
            this.model.hanseniase = "S";
            break;
          case "3":
            this.model.dengue = "S";
            break;
          case "4":
            this.model.dst = "S";
            break;
          default:
            break;
        }
      }
    }
  }
  public changeSelectProblemaCondicaoAvaliada(item) {
    // this.operacao = item;
    console.log(item);
    if (item.length > 0) {
      for (const a in item) {
        switch (item[a].id) {
          case "1":
            this.model.asma = "S";
            break;
          case "2":
            this.model.desnutricao = "S";
            break;
          case "3":
            this.model.diabetes = "S";
            break;
          case "4":
            this.model.dpoc = "S";
            break;
          case "5":
            this.model.obesidade = "S";
            break;
          case "6":
            this.model.prenatal = "S";
            break;
          case "7":
            this.model.puericultura = "S";
            break;
          case "8":
            this.model.puerperio = "S";
            break;
          case "9":
            this.model.saude_sexual_reprodutiva = "S";
            break;
          case "10":
            this.model.tabagismo = "S";
            break;
          case "11":
            this.model.usuario_alcool = "S";
            break;
          case "12":
            this.model.usuario_outras_drogas = "S";
            break;
          case "13":
            this.model.saude_mental = "S";
            break;
          case "14":
            this.model.reabilitacao = "S";
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
}
