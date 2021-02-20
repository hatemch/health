import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { AlertService } from "src/app/services/alert.service";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";
import { environment } from "../../../environments/environment.prod";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.page.html",
  styleUrls: ["./principal.page.scss"],
})
export class PrincipalPage implements OnInit {
  public items: any;
  public itemsMenu: any;
  public AppName: string = environment.AppName;

  public AppVersion: string = "0.0.1";
  public AppGreetings: string = "Bem-Vindos ao Pronto Book!";
  public MenuOptions: any;

  public dados: any;

  constructor(
    public navCtrl: NavController,
    private alertService: AlertService,
    //  private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService
  ) {}

  /* itemSelected(item: { name: string, icon:string, details:string,route:string}){
      //if(item.name ==='Produtos'){
      //this.alertService.presentToast("Acessando...: "+item.name);
      this.navCtrl.navigateRoot(item.route);
      //}
    }*/

  ngOnInit() {
    /* if (!sessionStorage.SessionHashkey) {
        this.navCtrl.navigateRoot('/login');
      } */
    if (!this.Authorizer.HashKey) {
      this.navCtrl.navigateRoot("/login");
    }

    /* this.dados = JSON.parse(sessionStorage.getItem('SessionUser'));
      // this.alertService.showLoader('Carregando... aguarde!!!');
      this.getModul(); */
  }
  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    //// console.log(("ionViewDidEnter");
    if (this.Authorizer.HashKey) {
      this.CarragaMenuPrincipalAPI();
    }
  }
  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    //// console.log(("ionViewDidLeave");
    if (this.Authorizer.HashKey) {
      this.CarragaMenuPrincipalAPI();
    }
  }

  public CarragaMenuPrincipalAPI() {
    // paramStatus: Pesquisando, Editando, Deletando
    let params = {
      CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema,
      CodigoMenuSistemaPai: this.Authorizer.CodigoMenuSistemaPai,
      Hashkey: this.Authorizer.HashKey,
    };
    this.Authorizer.QueryStoreProc(
      "ExecutarPost",
      "spCarregaMenuPrincipal",
      params
    ).then((res) => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
          // this.alertService.showLoader(resultado.message,1000);
          this.itemsMenu = JSON.parse(atob(resultado.results));
          this.items = JSON.parse(atob(resultado.results));
          console.log(this.itemsMenu);
        } else {
          this.alertService.presentAlert({
            pTitle: "ATENÇÃO",
            pSubtitle: this.AppName,
            pMessage: resultado.message,
          });
          this.navCtrl.navigateRoot("/login");
        }
      } catch (err) {
        this.alertService.presentAlert({
          pTitle: this.AppName,
          pSubtitle: "Minha Conta",
          pMessage: resultado.message,
        });
        this.navCtrl.navigateRoot("/login");
      }
    });
  }

  getItems(ev: any) {
    // this.CarregaMenuPrincipalStatic();
    this.items = this.itemsMenu;
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.items = this.items.filter((item) => {
        return (
          item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.Details.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }
  itemSelected(item: any) {
    // this.alertService.showLoader("Acessando...: " + item.Name,1000);
    this.CarragaMenuPrincipalAPI();
    this.navCtrl.navigateRoot(item.Route);
  }

  goBack() {
    this.navCtrl.back();
  }

  /* getModul() {
    let params = {
      StatusCRUD: "pesquisar",
      formValues: this.dados[0].position,
      CodigoUsuarioSistema: 0,
      Hashkey: sessionStorage.getItem("SessionHashkey"),
    };
    console.log('gutykuejbdl',params)
  this.Authorizer.QueryStoreProc('Executar',"spPermission", params).then(res => {
    let resultado: any = res[0];
    console.log(JSON.parse(resultado.results))
    try {
      if (resultado.success) {
          // this.alertService.presentAlert({ pTitle: 'Atendimento', pSubtitle: 'Success', pMessage: 'Atendimento excluído com sucesso !'});
         if (this.dados[0].position == 'Doutor') {
          this.items  =  [
            {
              id : 1,
              name : "Notícias",
              icon : "assets/imgs/Noticias.png",
              route :JSON.parse(resultado.results)[0].module
            }
        ];
          this.items.push( {
            id : 2,
            name : "Agenda",
            icon : "assets/imgs/Agenda.png",
            route :JSON.parse(resultado.results)[5].module
          });
          this.items.push( {
            id : 3,
            name : "Grupos",
            icon : "assets/imgs/Grupos.png",
            route :JSON.parse(resultado.results)[3].module
          });
          this.items.push( {
            id : 4,
            name : "Prontuários",
            icon : "assets/imgs/Prontuarios.png",
            route :JSON.parse(resultado.results)[6].module
          });
          this.items.push( {
            id : 5,
            name : "Exames",
            icon : "assets/imgs/Exames.png",
            route :JSON.parse(resultado.results)[1].module
          });
          this.items.push( {
            id : 6,
            name : "Hospitais",
            icon : "assets/imgs/Hospitais.png",
            route :JSON.parse(resultado.results)[2].module
          });
          this.items.push( {
            id : 7,
            name : "Estatísticas",
            icon : "assets/imgs/Estatisticas.png",
            route :JSON.parse(resultado.results)[4].module
          });
          this.items.push( {
             id : 8,
             name : "Cadastro Individual",
             icon : "assets/imgs/5.png",
             route :JSON.parse(resultado.results)[7].module
           });
          this.items.push( {
             id : 9,
             name : "Cadastro Domiciliar",
             icon : "assets/imgs/5.png",
             route :JSON.parse(resultado.results)[8].module
           });
          this.items.push( {
             id : 10,
             name : "Atendimento Individual",
             icon : "assets/imgs/5.png",
             route :JSON.parse(resultado.results)[9].module
           });

         } else {
          this.items  =  [
            {
              id : 1,
              name : "Agenda",
              icon : "assets/imgs/Agenda.png",
              route :JSON.parse(resultado.results)[0].module
            }
        ];
          this.items.push( {
            id : 2,
            name : "Prontuários",
            icon : "assets/imgs/Prontuarios.png",      
            route :JSON.parse(resultado.results)[1].module
          });
        }
        }
      }
      catch (err) {
        //this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Atendimento', pMessage: 'Nenhum usuário!' });
      }
  });
  }*/
}
