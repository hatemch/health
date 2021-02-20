export class AtividadeColetivaIndividioForm {
  codigo: number;
  atividade_coletiva: number;
  cns_cidadao: number;
  data_nascimento: string;
  sexo: string;
  avaliacao_alterada: string;
  antropometria_peso: number;
  antropometria_altura: number;
  tabagismo_cessou_habito_fumar: string;
  tabagismo_abandonou_grupo: string;

  constructor() {
    this.codigo = 0;
    this.atividade_coletiva = 0;
    this.cns_cidadao = 0;
    this.data_nascimento = "";
    this.sexo = "";
    this.avaliacao_alterada = "N";
    this.antropometria_peso = 0;
    this.antropometria_altura = 0;
    this.tabagismo_cessou_habito_fumar = "N";
    this.tabagismo_abandonou_grupo = "N";
  }
}
