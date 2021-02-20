import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {NavController, Platform} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment.prod';
import { Storage } from "@ionic/storage";
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public CodigoUsuarioSuporte: any;
  public NomeUsuarioSistema: any;

  public AppName: string = environment.AppName;
  public AppVersion: string = environment.AppVersion;
  private selectedPath = '';
  public SideMenu = [ ];

  /*
  pages = [
    {
      title: 'Menu Principal',
      url: '/menu/options',
      icon : 'menu'
    },
    {
      title: 'Perfil',
      icon : 'person',
      url: '/menu/minhaconta'
    }
  ];*/

  constructor(public platformt: Platform,
              // private document: DocumentViewer,
              private db: Storage,
              private Authorizer: AuthService,
              private alertService: AlertService,
              // private principalPage : PrincipalPage,
              public navCtrl: NavController,
              private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    //// console.log(("ionViewDidEnter");
    if (this.Authorizer.HashKey) {
      this.CodigoUsuarioSuporte = this.Authorizer.CodigoUsuarioSuporte;
      this.CarragaMenuLateralAPI();
      /* this.db.get('LSU').then((LSU) => {
        let SU = JSON.parse(atob(LSU));
        this.CodigoUsuarioSistema = SU[0].CodigoUsuario;
        this.CodigoUsuarioSuporte = SU[0].CodigoUsuarioSuporte;
        this.NomeUsuarioSistema = SU[0].Nome;
      }); */
    }  else {
      this.navCtrl.navigateRoot('/login');
    }
  }
  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    //// console.log(("ionViewDidLeave");
  }

  CarragaMenuLateralAPI() {
    // paramStatus: Pesquisando, Editando, Deletando
    const params = {
      CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
      Hashkey             : this.Authorizer.HashKey
    };
    this.Authorizer.QueryStoreProc('ExecutarPost', 'spCarregaMenuLateral', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          // this.alertService.showLoader(resultado.message,1000);
          this.SideMenu = JSON.parse(atob(resultado.results));
          this.NomeUsuarioSistema = this.Authorizer.NomeUsuarioSistema;
        } else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.AppName, pMessage: resultado.message });
          this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: 'Minha Conta', pMessage: resultado.message });
        this.navCtrl.navigateRoot('/login');
      }
    });
  }
  itemSelected(item:any) {
    // this.alertService.showLoader("Acessando...: " + item.Name,1000);
    this.Authorizer.CodigoMenuSistemaPai = item.CodigoMenuSistema;
    this.navCtrl.navigateRoot(item.Route);
  }

  logout() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Sair!';
    alert.message = `Deseja realmente sair?`;
    alert.buttons = [
      {
        text: 'Desistir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          this.navCtrl.navigateRoot('/login');
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }
}
