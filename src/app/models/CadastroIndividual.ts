export class CadastroIndividual {
    codigo: number;
    cns_profissional: string;// '*'
    cbo: string; // '*'
    cnes: string; //'*'
    ine: string;// '*'
    microarea: string; //'*' is obigatory if fora_area is N
    fora_area: string;
    data_cadastro: string;// '*'
    cns_cidadao: string;
    responsavel_familiar: string;
    cns_resp_familiar: string;
    nome_completo: string;//'*' is obigatory if
    nome_social: string;
    data_nascimento: string;//'*'
    sexo: string;//'*'
    raca_cor: string;//'*'
    etnia: string; //'*' is obigatory if raca e indigena
    pis_pasep: string;
    nome_mae: string;//'*' is obigatory if nome_mae_desconhecido = S
    nome_mae_desconhecido: string;
    nome_pai: string;//'*' is is obigatory if nome_pai_desconhecido = S
    nome_pai_desconhecido: string;
    nacionalidade: string;//'*'
    pais_nascimento: string;//'*'is obigatory if nacionalidade is naturalizado/Estrangeiro
    data_naturalizacao: string;//'*'is obigatory if nacionalidade is naturalizado
    data_entrada_brasil: string;//'*'is obigatory if nacionalidade is estrangeiro
    portaria_naturalizacao: string;//'*'is obigatory if nacionalidade is naturalizado
    uf_nascimento: string;//'*'is obigatory if nacionalidade is brasileira
    municipio_nascimento: string;//'*'is obigatory if nacionalidade is brasileira
    telefone_celular: string;
    email: string;

    parentesco_resp_familiar: string;
    ocupacao: string;
    frequenta_escola_creche: string;
    curso_mais_elevado: string;
    situacao_mercado_trabalho: string;
    // crianca_fica: string; // adicionado pra obtener so uma informacao e dividir em todas as palabras que tem crianca
    crianca_fica_adulto_resp: string;
    crianca_fica_outra_crianca: string;
    crianca_fica_adolescente: string;
    crianca_fica_sozinha: string;
    crianca_fica_creche: string;
    crianca_fica_outro: string;
    frequenta_cuidador_tradicional: string;
    participa_grupo_comunitario: string;
    plano_saude_privado: string;
    membro_povo_tradicional: string;
    membro_povo_tradicional_desc: string;
    informar_orientacao_sexual: string;
    informar_orientacao_sexual_desc: string;
    informar_identidade_genero: string;
    informar_identidade_genero_desc: string;
    tem_alguma_deficiencia: string;
    deficiencia_auditiva: string;
    deficiencia_visual: string;
    deficiencia_intelectual: string;
    deficiencia_fisica: string;
    deficiencia_outra: string;
    saida_cidadao_cadastro: string;
    saida_cidadao_data_obito: string;
    saida_cidadao_numero_do: string;
    termo_recusa: string;
    rg_cidadao: string;
    gestante: string;
    maternidade_referencia: string;
    peso: string;
    fumante: string;
    faz_uso_alcool: string;
    faz_uso_outras_drogas: string;
    hipertensao_arterial: string;
    diabetes: string;
    avc_derrame: string;
    infarto: string;
    doenca_cardiaca: string;
    cardiaca_insuficiencia_cardiaca: string;
    cardiaca_outro: string;
    cardiaca_nao_sabe: string;
    problema_rins: string;
    rins_insuficiencia_renal: string;
    rins_outro: string;
    rins_nao_sabe: string;
    doenca_pulmao: string;
    pulmao_asma: string;
    pulmao_enfisema: string;
    pulmao_outro: string;
    pulmao_nao_sabe: string;
    hanseniase: string;
    tuberculose: string;
    cancer: string;
    internacao_ultimos_doze_meses: string;
    internacao_motivo: string;
    problema_saude_mental: string;
    acamado: string;
    domiciliado: string;
    usa_plantas_medicinais: string;
    usa_plantas_medicinais_desc: string;
    usa_outras_praticas_complementares: string;
    condicao_saude:string;
    outras_condicoes_saude_1: string;
    outras_condicoes_saude_2: string;
    outras_condicoes_saude_3: string;
    situacao_de_rua: string;
    tempo_situacao_rua: string;
    recebe_algum_beneficio: string;
    possui_referencia_familiar: string;
    quantas_vezes_alimenta_dia: string;
    origem_restaurante_popular: string;
    origem_doacao_grupo_religioso: string;
    origem_doacao_restaurante: string;
    origem_doacao_popular: string;
    origem_outros: string;
    acompanhado_outra_instituicao: string;
    acompanhado_outra_instituicao_desc: string;
    visita_familiar_frequencia: string;
    grau_parentesco_visita: string;
    acesso_higiene_pessoal: string;
    higiene_banho: string;
    higiene_acesso_sanitario: string;
    higiene_bucal: string;
    higiene_outros: string;
    usuario: number;
    imei: string;
    pim: string;
    versao: string;
    latitude: number;
    longitude: number;
    data_importacao: string;


    constructor() {
        this.codigo = 0;
        this.cns_profissional = '';
        this.cbo = '';
        this.cnes = '';
        this.ine = '';
        this.microarea = '';
        this.fora_area = 'N';
        this.data_cadastro ='';
        this.cns_cidadao = '';
        this.responsavel_familiar = 'N';
        this.cns_resp_familiar = '';
        this.cns_resp_familiar = '';
        this.nome_completo = '';
        this.nome_social = '';
        this.data_nascimento = '';
        this.sexo = '';
        this.raca_cor = '';
        this.etnia = '';
        this.pis_pasep = '';
        this.nome_mae = '';
        this.nome_mae_desconhecido = 'N';
        this.nome_pai = '';
        this.nome_pai_desconhecido = 'N';
        this.nacionalidade = '';
        this.pais_nascimento = '';
        this.data_naturalizacao = '';
        this.data_entrada_brasil = '';
        this.portaria_naturalizacao = '';
        this.uf_nascimento = '';
        this.municipio_nascimento = '';
        this.telefone_celular = '';
        this.email = '';
        this.parentesco_resp_familiar = '';
        this.ocupacao = '';
        this.frequenta_escola_creche = 'N';
        this.curso_mais_elevado = '';
        this.situacao_mercado_trabalho = '';
        this.crianca_fica_adulto_resp = 'N';
        this.crianca_fica_outra_crianca = 'N';
        this.crianca_fica_adolescente = 'N';
        this.crianca_fica_sozinha = 'N';
        this.crianca_fica_creche = 'N';
        this.crianca_fica_outro = 'N';
        this.frequenta_cuidador_tradicional = 'N';
        this.participa_grupo_comunitario = 'N';
        this.plano_saude_privado = 'N';
        this.membro_povo_tradicional = 'N';
        this.membro_povo_tradicional_desc = '';
        this.informar_orientacao_sexual = 'N';
        this.informar_orientacao_sexual_desc = '';
        this.informar_identidade_genero = 'N';
        this.informar_identidade_genero_desc = '';
        this.tem_alguma_deficiencia = 'N';
        this.deficiencia_auditiva = 'N';
        this.deficiencia_visual = 'N';
        this.deficiencia_intelectual = 'N';
        this.deficiencia_fisica = 'N';
        this.deficiencia_outra = 'N';
        this.saida_cidadao_cadastro = '';
        this.saida_cidadao_data_obito = '';
        this.saida_cidadao_numero_do = '';
        this.termo_recusa = 'N';
        this.rg_cidadao = '';
        this.gestante = 'N';
        this.maternidade_referencia = '';
        this.peso = '';
        this.fumante = 'N';
        this.faz_uso_alcool = 'N';
        this.faz_uso_outras_drogas = 'N';
        this.hipertensao_arterial = 'N';
        this.diabetes = 'N';
        this.avc_derrame = 'N';
        this.infarto = 'N';
        this.doenca_cardiaca = 'N';
        this.cardiaca_insuficiencia_cardiaca = 'N';
        this.cardiaca_outro = 'N';
        this.cardiaca_nao_sabe = 'N';
        this.problema_rins = 'N';
        this.rins_insuficiencia_renal = 'N';
        this.rins_outro = 'N';
        this.rins_nao_sabe = 'N';
        this.doenca_pulmao = 'N';
        this.pulmao_asma = 'N';
        this.pulmao_enfisema = 'N';
        this.pulmao_outro = 'N';
        this.pulmao_nao_sabe = 'N';
        this.hanseniase = 'N';
        this.tuberculose = 'N';
        this.cancer = 'N';
        this.internacao_ultimos_doze_meses = 'N';
        this.internacao_motivo = '';
        this.problema_saude_mental = 'N';
        this.acamado = 'N';
        this.domiciliado = 'N';
        this.usa_plantas_medicinais = 'N';
        this.usa_plantas_medicinais_desc = '';
        this.usa_outras_praticas_complementares = 'N';
        this.condicao_saude ='N';
        this.outras_condicoes_saude_1 = '';
        this.outras_condicoes_saude_2 = '';
        this.outras_condicoes_saude_3 = '';
        this.situacao_de_rua = 'N';
        this.tempo_situacao_rua = '';
        this.recebe_algum_beneficio = 'N';
        this.possui_referencia_familiar = 'N';
        this.quantas_vezes_alimenta_dia = '';
        this.origem_restaurante_popular = 'N';
        this.origem_doacao_grupo_religioso = 'N';
        this.origem_doacao_restaurante = 'N';
        this.origem_doacao_popular = 'N';
        this.origem_outros = 'N';
        this.acompanhado_outra_instituicao = 'N';
        this.acompanhado_outra_instituicao_desc = '';
        this.visita_familiar_frequencia = 'N';
        this.grau_parentesco_visita = '';
        this.acesso_higiene_pessoal = 'N';
        this.higiene_banho = 'N';
        this.higiene_acesso_sanitario = 'N';
        this.higiene_bucal = 'N';
        this.higiene_outros = 'N';
        this.usuario = 0;
        this.imei = '';
        this.pim = '';
        this.versao = '';
        this.latitude = 0;
        this.longitude = 0;
        this.data_importacao = '';
    }
}
