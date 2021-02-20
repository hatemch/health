export class AtendimentoIndividualCidadaoProntobook {
  public codigo: number;
  public usuario: number;
  public hospital: string;
  public especialidade: string;
  public medico: string;
  public data_agendamento: string;
  public Hora_agendamento: string;

  constructor() {
    this.codigo = 0;
    this.usuario = 0;
    this.hospital = "";
    this.especialidade = "";
    this.medico = "";
    this.data_agendamento = "";
    this.Hora_agendamento = "";
  }
}
