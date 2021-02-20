export class CadastroDomiciliarFoto {
    public codigo: string;
    public cadastro_domiciliar: string;
    public tipo: string;
    public tipo_assinatura: string;
    public foto_url: string;
    constructor() {
        this.codigo = '';
        this.cadastro_domiciliar ='';
        this.tipo = '';
        this.tipo_assinatura = null;
        this.foto_url = '';
    }
}
