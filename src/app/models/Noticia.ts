export class Noticia {
    public codigo: number;
    public nome : string;
    public data_evento: string;
    public link: string;
    public descricao: string;
    constructor() {
        this.codigo = 0;
        this.nome = '';
        this.data_evento = '';
        this.link = '';
        this.descricao = '';
    }
}
