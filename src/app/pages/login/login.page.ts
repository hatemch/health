import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../../environments/environment.prod';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from "@ionic/storage";



// for install: https://www.npmjs.com/package/ts-md5
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('email') iemail;

  public CodigoUsuarioSistema: string;
  public NomeUsuarioSistema: string;

  public storage: any;
  public Login: string;
  public Senha: string;
  public AppName: string = this.env.AppName;

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private db: Storage,
  ) { }

  ngOnInit() {
    // Uso a instrução (fetch) para pegar o ip do roteador.
    const ipAPI: any = 'https://api.ipify.org?format=json';
    fetch(ipAPI).then(response => response.json()).then(data => sessionStorage.setItem('SessionIP', data.ip)).catch(() => { }
    );
    // Este método retorna ON/OFF do Serviço onde esta API.
    // this.Authorizer.EngineStatusConection(this.env.API_HOST);

    // Teste de recuperação de dados

    // Zero a SessionConection
    sessionStorage.setItem('SessionConection', '0');
    sessionStorage.setItem('SessionUser', '');
    sessionStorage.setItem('SessionHashkey', '');
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.
    // console.log("ionViewWillEnter");
  }


  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log("ionViewDidEnter");
    setTimeout(() => {
      this.iemail.setFocus();
    }, 150);

  }

  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    // console.log("ionViewDidLeave");

  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      console.log('exit');
      navigator['app'].exitApp();
    });
  }

  AuthLogin(form: NgForm) {
    // this.alertService.showLoader('Carregando... aguarde!!!');
    // this.alertService.presentAlert({pTitle:'e-Cupom33',pSubtitle:'Teste',pMessage:'TESTANDO DIALOG'} );
    // this.alertService.presentAlertConfirm({pTitleConfirm: 'e-Cupom33', pMessage:'Confirmar procedimento?',pTextBtnCancel:'Não',pTextOkay:'Sim' });
    // this.alertService.presentToast("Mensagem Toast: Logando...");
    // let pwd : any = Md5.hashStr(form.value.password);
    // form.value.password = Md5.hashStr(form.value.password);
    const SenhaCpt    =  Md5.hashStr(form.value.password);
    form.value.password  = SenhaCpt;
    console.log(form.value);

    this.Authorizer.Login(form).then(res => {
      // console.log("Resultado Json:", res);
      const resultado: any = res[0];
      if (resultado.success == true) {
        this.db.set('SessionUser', resultado.results);
        this.db.get('SessionUser').then((Usuario) => {
          console.log('Usuario Logado:' + JSON.stringify(Usuario));
        });
        this.alertService.showLoader(resultado.message);
        this.navCtrl.navigateRoot('/menu/options');
      }
    });
  }

}
