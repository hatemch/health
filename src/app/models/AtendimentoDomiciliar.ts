export class AtendimentoDomiciliar {
    codigo: number;
    cns_do_profissional : string;
    cbo : string;
    cnes : string;
    ine : string ;
    data_atendimento_domiciliar: string;
    tip_de_atendimento: string;
    condicao_avaliada : string;
    modaliadade_ad : string;
    numProntuario : string;
    usuario : number
    local_deatendimento : string;
    sexo : string;
    latitude : string ;
    longitude : string;
    data_de_nascimento : string;
    ciap : string;
    cid : string ;
    procedimento : string ;
    conduta_desfecho : string;
    encaminhamento : string ;

    constructor(){
        this.codigo = 0;
        this.usuario = 0;
        this.latitude = '';
        this.longitude ='';
        this.cns_do_profissional = '';
        this.cbo= '';
        this.cnes = '';
        this.ine = '';
        this.data_atendimento_domiciliar ='';
        this.tip_de_atendimento = '';
        this.condicao_avaliada ='';
        this.modaliadade_ad ='';
        this.numProntuario ='';
        this.local_deatendimento ='';
        this.sexo ='';
        this.data_de_nascimento ='';
        this.ciap ='';
        this.cid='';
        this.procedimento='';
        this.conduta_desfecho='';
        this.encaminhamento ='';
    }
}
/**/
