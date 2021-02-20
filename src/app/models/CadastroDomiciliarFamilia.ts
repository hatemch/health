export class CadastroDomiciliarFamilia {
    codigo: number;
    cadastro_domiciliar: number;
    numero_prontuario_familiar: string;
    cns_responsavel: string;
    data_nascimento_responsavel: string;
    renda_familiar: string;
    numero_membros_familia: number;
    reside_desde_mes: string;
    reside_desde_ano: string;
    mudou: string;
    constructor() {
        this.codigo = 0;
        this.cadastro_domiciliar = 0;
        this.numero_prontuario_familiar = '';
        this.cns_responsavel = '';
        this.data_nascimento_responsavel = '';
        this.renda_familiar = '';
        this.numero_membros_familia = 0;
        this.reside_desde_mes = '';
        this.reside_desde_ano = '';
        this.mudou = '';
    }
}
