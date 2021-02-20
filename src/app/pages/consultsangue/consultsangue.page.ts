import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import {  Platform } from '@ionic/angular';
import { NgForm ,FormGroup, FormBuilder  } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import {environment} from "../../../environments/environment.prod";



@Component({
  selector: 'app-consultsangue',
  templateUrl: './consultsangue.page.html',
  styleUrls: ['./consultsangue.page.scss'],
})
export class ConsultsanguePage implements OnInit {

  public AppName: string = environment.AppName;
  public subtitle = 'Consultar exames de sangue';
  

  public ishidden: boolean = true;
  
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder : FormBuilder
  
    ) { 
    
  }

  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/exames');
    })
    
  }
  goBack() {
    this.navCtrl.back();
  }

  goTo(){
    this.navCtrl.navigateRoot('/sangue');
    }

  goToo(CPF){
    console.log("CPF",CPF);
      this.navCtrl.navigateRoot('/editsangue',CPF);
      sessionStorage.setItem("CPFPatient",btoa(CPF))
      }


  //delete(form: NgForm)
 



  GravarDados(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
    form.value.Senha = Md5.hashStr(form.value.Senha);
    form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
    let params = {
      'StatusCRUD': 'Gravar',
      'formValues': form.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("gravar:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spHospital', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {
    
          this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Exame', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Exame', pMessage: 'Nenhum usuário!' });
      }
    });
  }


  public a: any ;
  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar_sangue',
      'formValues': '',
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
console.log('params',params)
    this.Authorizer.QueryStoreProc('Executar', 'spExame', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado",resultado)
      try {
        if (resultado.success) { 
          this.a=  JSON.parse(resultado.results);
          console.log('this.a',this.a)    
       
         //this.alertService.showLoader(resultado.message, 1000);
        }
       
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Exame', pMessage: 'Nao exame' });
      }
    });
    
  }




  expandFazenda() {
    this.ishidden = !this.ishidden;
  }


}

