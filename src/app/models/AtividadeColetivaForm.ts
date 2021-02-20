export class AtividadeColetivaForm {
  codigo: number;
  usuario: number;
  cns_profissional: number;
  cbo: number;
  cnes: number;
  ine: number;
  data_cadastro: string;
  // professionais: string;
  turno: string;
  longitude: string;
  latitude: string;
  pim: string;
  imei: string;
  versao: string;

  //local de atividade
  local_inep: number;
  local_cnes: number;
  local_outra_localidade: string;

  //reuniao
  atividade_reuniao: string;
  /*************select variable temas_para_reuniao************************/
  tema_reuniao_questoes_administrativas: string;
  tema_reuniao_processos_trabalho: string;
  tema_reuniao_diagnostico_territorio: string;
  tema_reuniao_planejamento_acoes_equipe: string;
  tema_reuniao_discussao_caso: string;
  tema_reuniao_educacao_permanente: string;
  tema_reuniao_outros: string;
  //attendamento
  atividade_saude: string;
  /*************select variable publico_alvo************************/
  publico_alvo_comunidade_geral: string;
  publico_alvo_crianca0_3_anoas: string;
  publico_alvo_crianca4_5_anoas: string;
  publico_alvo_crianca6_11_anoas: string;
  publico_alvo_adolescente: string;
  publico_alvo_mulher: string;
  publico_alvo_gestante: string;
  publico_alvo_homem: string;
  publico_alvo_familiares: string;
  publico_alvo_idoso: string;
  publico_alvo_pessoas_doencas_cronicas: string;
  publico_alvo_usuario_tabaco: string;
  publico_alvo_usuario_alcool: string;
  publico_alvo_usuario_outras_drogas: string;
  publico_alvo_pessoas_sofrimento: string;
  publico_alvo_profissional_educacao: string;
  publico_alvo_outros: string;

  /*************select variable publico_alvo************************/
  tema_saude_acoes_combate_aedes_aegypti: string;
  tema_saude_agravos_negligenciados: string;
  tema_saude_alimentacao_saudavel: string;
  tema_saude_autocuidado_pessoas_doencas_cronicas: string;
  tema_saude_cidadania_direitos_humanos: string;
  tema_saude_dependencia: string;
  tema_saude_envelhecimento: string;
  tema_saude_plantas_medicinais: string;
  tema_saude_prevencao_violencia: string;
  tema_saude_ambiental: string;
  tema_saude_bucal: string;
  tema_saude_trabalhador: string;
  tema_saude_mental: string;
  tema_saude_sexual_reprodutiva: string;
  tema_saude_semana_saude_escola: string;
  tema_saude_outros: string;
  /*************select variable pratica_saude************************/

  pratica_saude_antropometria: string;
  pratica_saude_aplicacao_topica_fluor: string;
  pratica_saude_desenvolvimento_linguagem: string;
  pratica_saude_escovacao_dental_supervisionada: string;
  pratica_saude_praticas_corporais: string;
  pratica_saude_pnct_sessao1: string;
  pratica_saude_pnct_sessao2: string;
  pratica_saude_pnct_sessao3: string;
  pratica_saude_pnct_sessao4: string;
  pratica_saude_auditiva: string;
  pratica_saude_ocular: string;
  pratica_saude_verificacao_situacao_vacinal: string;
  pratica_saude_outras: string;
  pratica_saude_outro_procedimento_coletivo: string;
  pratica_saude_sigtap: string;

  numero_participantes: number;
  numero_avaliacoes_alteradas: number;
  publico_alvo: string;
  pratica_saude: string;

  constructor() {
    this.codigo = 0;
    this.usuario = 0;
    this.latitude = "";
    this.longitude = "";
    this.cns_profissional = 0;
    this.cbo = 0;
    this.cnes = 0;
    this.ine = 0;
    this.data_cadastro = "";
    // this.professionais = "";
    this.local_inep = 0;
    this.local_cnes = 0;
    this.local_outra_localidade = "";
    this.atividade_reuniao = "";
    this.atividade_saude = "";
    this.numero_participantes = 0;
    this.numero_avaliacoes_alteradas = 0;
    this.pim = "";
    this.imei = "";
    this.versao = "";
    /*************select variable temas_para_reuniao************************/
    this.tema_reuniao_questoes_administrativas = "N";
    this.tema_reuniao_processos_trabalho = "N";
    this.tema_reuniao_diagnostico_territorio = "N";
    this.tema_reuniao_planejamento_acoes_equipe = "N";
    this.tema_reuniao_discussao_caso = "N";
    this.tema_reuniao_educacao_permanente = "N";
    this.tema_reuniao_outros = "N";
    /*************select variable publico_alvo************************/
    this.publico_alvo_comunidade_geral = "N";
    this.publico_alvo_crianca0_3_anoas = "N";
    this.publico_alvo_crianca4_5_anoas = "N";
    this.publico_alvo_crianca6_11_anoas = "N";
    this.publico_alvo_adolescente = "N";
    this.publico_alvo_mulher = "N";
    this.publico_alvo_gestante = "N";
    this.publico_alvo_homem = "N";
    this.publico_alvo_familiares = "N";
    this.publico_alvo_idoso = "N";
    this.publico_alvo_pessoas_doencas_cronicas = "N";
    this.publico_alvo_usuario_tabaco = "N";
    this.publico_alvo_usuario_alcool = "N";
    this.publico_alvo_usuario_outras_drogas = "N";
    this.publico_alvo_pessoas_sofrimento = "N";
    this.publico_alvo_profissional_educacao = "N";
    this.publico_alvo_outros = "N";
    /*************select variable publico_alvo************************/
    this.tema_saude_acoes_combate_aedes_aegypti = "N";
    this.tema_saude_agravos_negligenciados = "N";
    this.tema_saude_alimentacao_saudavel = "N";
    this.tema_saude_autocuidado_pessoas_doencas_cronicas = "N";
    this.tema_saude_cidadania_direitos_humanos = "N";
    this.tema_saude_dependencia = "N";
    this.tema_saude_envelhecimento = "N";
    this.tema_saude_plantas_medicinais = "N";
    this.tema_saude_prevencao_violencia = "N";
    this.tema_saude_ambiental = "N";
    this.tema_saude_bucal = "N";
    this.tema_saude_trabalhador = "N";
    this.tema_saude_mental = "N";
    this.tema_saude_sexual_reprodutiva = "N";
    this.tema_saude_semana_saude_escola = "N";
    this.tema_saude_outros = "N";
    /*************select variable publico_alvo************************/
    this.pratica_saude_antropometria = "N";
    this.pratica_saude_aplicacao_topica_fluor = "N";
    this.pratica_saude_desenvolvimento_linguagem = "N";
    this.pratica_saude_escovacao_dental_supervisionada = "N";
    this.pratica_saude_praticas_corporais = "N";
    this.pratica_saude_pnct_sessao1 = "N";
    this.pratica_saude_pnct_sessao2 = "N";
    this.pratica_saude_pnct_sessao3 = "N";
    this.pratica_saude_pnct_sessao4 = "N";
    this.pratica_saude_auditiva = "N";
    this.pratica_saude_ocular = "N";
    this.pratica_saude_verificacao_situacao_vacinal = "N";
    this.pratica_saude_outras = "N";
    this.pratica_saude_outro_procedimento_coletivo = "N";
    this.pratica_saude_sigtap = "N";
  }
}
