import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from '@ionic/angular';
import {environment} from '../../../environments/environment.prod';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

    public AppName: string = environment.AppName;
    public subtitle = 'Agenda';

    private permissoes = {
        Route: '',
        Pesquisar: 0,
        Inserir: 0,
        Editar: 0,
        Deletar: 0
    };

    constructor(private navCtrl: NavController,
                public platform :Platform,
                private Authorizer: AuthService,
                private router: Router)
    { }


    ionViewWillEnter() {
        // Disparado quando o roteamento de componentes está prestes a se animar.
    }

    ionViewDidEnter() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        if (!this.Authorizer.HashKey) {
            this.navCtrl.navigateRoot('/login');
        }
    }

    ionViewWillLeave() {
        // Disparado quando o roteamento de componentes está prestes a ser animado.
        // console.log(("ionViewWillLeave");
    }

    ionViewDidLeave() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        // console.log(("ionViewDidLeave");
    }

    ngOnInit() {
        //Consulta permissoes Modulo Online
        this.getPermissoesModulo();
    }
    getPermissoesModulo() {
        const permissaoModulo = this.Authorizer.permissoesUsuario.filter(item => {
            return (item.Route === this.router.url);
        });

        if (permissaoModulo.length === 1) {
            this.permissoes = {
                Route: permissaoModulo[0].Route,
                Pesquisar: permissaoModulo[0].Pesquisar,
                Inserir: permissaoModulo[0].Inserir,
                Editar: permissaoModulo[0].Editar,
                Deletar: permissaoModulo[0].Deletar
            };
        } else {
            console.log('Houve um problema nas permissoes do modulo: ', this.router.url);
        }
    }

    // Consulte as nomeações or compromissos
    goConsultaCompromisso(){
        this.navCtrl.navigateRoot('/consulta-nomeacoes');
    }

    // Novo compromisso
    goNovoCompromisso(){
        this.navCtrl.navigateRoot('/novo-compromisso');
    }
    // Compromissos Cumpridos
    goCumpridos(){
        this.navCtrl.navigateRoot('/compromisso-cumprido');
    }

    // Compromissos Não Cumpridos
    goNaoCumpridos(){
        this.navCtrl.navigateRoot('/compromisso-nao-cumprido');
    }

    // Compromissos Cancelados
    goCancelados(){
        this.navCtrl.navigateRoot('/compromisso-cancelado');
    }

    goBack() {
        this.navCtrl.back();
    }
}
