import { threadId } from "worker_threads";

export class AtendimentoIndividual {
  codigo: number;
  usuario: number;
  imei: string;
  pim: string;
  versao: string;
  latitude: string;
  longitude: string;
  data_importacao: string;
  /***************ATENDAMENTO INDIVÍDUO*****************/
  cns_profissional: string;
  cbo: string;
  cnes: string;
  ine: string;
  cns_profissional_secundario: string;
  cbo_secundario: string;
  cnes_secundario: string;
  ine_secundario: string;
  data_cadastro: string;

  constructor() {
    this.codigo = 0;
    this.usuario = 0;
    this.imei = "";
    this.pim = "";
    this.versao = "";
    this.latitude = "";
    this.longitude = "";
    this.data_importacao = "";
    /***************ATENDAMENTO INDIVÍDUO*****************/

    this.cns_profissional = "";
    this.cbo = "";
    this.cnes = "";
    this.ine = "";
    this.cns_profissional_secundario = "";
    this.cbo_secundario = "";
    this.cnes_secundario = "";
    this.ine_secundario = "";
    this.data_cadastro = "";
  }
}
