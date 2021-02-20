import { threadId } from "worker_threads";

export class AtendimentoIndividualCidadao {
  codigo: number;
  atendimento_individual: number;
  turno: string;
  numero_prontuario: string;
  cns_cidadao: string;
  data_nascimento: string;
  sexo: string;
  local_atendimento: string;
  tipo_atendimento: string;
  atencao_domiciliar: string;
  racionalidade_saude: string;
  perimetro_cefalico: string;
  peso: string;
  altura: string;
  vacinacao_em_dia: string;
  aleitamento_materno: string;
  dum: string;
  gravidez_planejada: string;
  idade_gestacional: string;
  gestas_previas: string;
  partos: string;
  /***************************problema_condicao_avaliada******************************** */
  asma: string;
  desnutricao: string;
  diabetes: string;
  dpoc: string;
  hipertensao_arterial: string;
  obesidade: string;
  prenatal: string;
  puericultura: string;
  puerperio: string;
  saude_sexual_reprodutiva: string;
  tabagismo: string;
  usuario_alcool: string;
  usuario_outras_drogas: string;
  saude_mental: string;
  reabilitacao: string;
  /*********************************************************** */
  /***************************doencas_transmissiveis******************************** */
  tuberculose: string;
  hanseniase: string;
  dengue: string;
  dst: string;
  /*********************************************************** */
  /**************************rastreamento********************************* */
  cancer_colo_utero: string;
  cancer_mama: string;
  risco_cardiovascular: string;
  /*********************************************************** */
  ciap2_1: string;
  ciap2_2: string;
  cid10_1: string;
  cid10_2: string;
  colesterol_total: string;
  creatinina: string;
  eas_equ: string;
  eletrocardiograma: string;
  eletroforese_hemoglobina: string;
  espirometria: string;
  exame_escarro: string;
  glicemia: string;
  hdl: string;
  hemoglobina_glicada: string;
  hemograma: string;
  ldl: string;
  retinografia: string;
  sorologia_sifilis: string;
  sorologia_dengue: string;
  sorologia_hiv: string;
  teste_antiglobulina: string;
  teste_gravidez: string;
  ultrassonografia_obstetrica: string;
  urocultura: string;
  teste_orelinha: string;
  teste_olhinho: string;
  teste_pezinho: string;
  ficou_em_observacao: string;
  /***************nasf_polo******************* */
  nasf_avaliacao: string;
  nasf_procedimentos_clinicos: string;
  nasf_prescricao_terapeutica: string;
  /****************************************** */
  /*******************conduta_desfecho*********************** */
  retorno_consulta_agendada: string;
  retorno_programado: string;
  agendamento_grupos: string;
  agendamento_nasf: string;
  alta_do_episodio: string;
  /****************************************** */
  /********************encaminhamento**********************/
  encaminhamento_interno_dia: string;
  encaminhamento_especializado: string;
  encaminhamento_caps: string;
  encaminhamento_internacao: string;
  encaminhamento_urgencia: string;
  encaminhamento_atencao_domiciliar: string;
  encaminhamento_intersetorial: string;
  /******************************************/
  data_importacao: string;
  agendar_prontobook: string;
  /***************CADASTRO INDIVÍDUO*****************/

  /** PROBLEMA/CONDIÇÃO AVALIADA **/

  /** EXAMES (S)olicitados e (A)valiados **/

  constructor() {
    this.codigo = 0;
    this.atendimento_individual = 0;
    this.turno = "";
    this.numero_prontuario = "";
    this.cns_cidadao = "";
    this.data_nascimento = "";
    this.sexo = "";
    this.local_atendimento = "";
    this.tipo_atendimento = "";
    this.atencao_domiciliar = "";
    this.racionalidade_saude = "";
    this.perimetro_cefalico = "";
    this.peso = "";
    this.altura = "";
    this.vacinacao_em_dia = "";
    this.aleitamento_materno = "";
    this.dum = "";
    this.gravidez_planejada = "";
    this.idade_gestacional = "";
    this.gestas_previas = "";
    this.partos = "";
    this.asma = "N";
    this.desnutricao = "N";
    this.diabetes = "N";
    this.dpoc = "N";
    this.hipertensao_arterial = "N";
    this.obesidade = "N";
    this.prenatal = "N";
    this.puericultura = "N";
    this.puerperio = "N";
    this.saude_sexual_reprodutiva = "N";
    this.tabagismo = "N";
    this.usuario_alcool = "N";
    this.usuario_outras_drogas = "N";
    this.saude_mental = "N";
    this.reabilitacao = "N";
    this.tuberculose = "N";
    this.hanseniase = "N";
    this.dengue = "N";
    this.dst = "N";
    this.cancer_colo_utero = "N";
    this.cancer_mama = "N";
    this.risco_cardiovascular = "N";
    this.ciap2_1 = "";
    this.ciap2_2 = "";
    this.cid10_1 = "";
    this.cid10_2 = "";
    this.colesterol_total = "";
    this.creatinina = "";
    this.eas_equ = "";
    this.eletrocardiograma = "";
    this.eletroforese_hemoglobina = "";
    this.espirometria = "";
    this.exame_escarro = "";
    this.glicemia = "";
    this.hdl = "";
    this.hemoglobina_glicada = "";
    this.hemograma = "";
    this.ldl = "";
    this.retinografia = "";
    this.sorologia_sifilis = "";
    this.sorologia_dengue = "";
    this.sorologia_hiv = "";
    this.teste_antiglobulina = "";
    this.teste_gravidez = "";
    this.ultrassonografia_obstetrica = "";
    this.urocultura = "";
    this.teste_orelinha = "";
    this.teste_olhinho = "";
    this.teste_pezinho = "";
    this.ficou_em_observacao = "";
    this.nasf_avaliacao = "N";
    this.nasf_procedimentos_clinicos = "N";
    this.nasf_prescricao_terapeutica = "N";
    this.retorno_consulta_agendada = "N";
    this.retorno_programado = "N";
    this.agendamento_grupos = "N";
    this.agendamento_nasf = "N";
    this.alta_do_episodio = "N";
    this.encaminhamento_interno_dia = "N";
    this.encaminhamento_especializado = "N";
    this.encaminhamento_caps = "N";
    this.encaminhamento_internacao = "N";
    this.encaminhamento_urgencia = "N";
    this.encaminhamento_atencao_domiciliar = "N";
    this.encaminhamento_intersetorial = "N";
    this.data_importacao = "";
    this.agendar_prontobook = "N";
    /**************CADASTRO INDIVÍDUO*****************/
  }
}
