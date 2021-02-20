import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import {  Platform } from '@ionic/angular';
import { NgForm ,FormGroup, FormBuilder  } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { AlertController } from '@ionic/angular';






@Component({
  selector: 'app-hospitais',
  templateUrl: './hospitais.page.html',
  styleUrls: ['./hospitais.page.scss'],
})
export class HospitaisPage implements OnInit {


  

  public ishidden: boolean = true;
  
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder : FormBuilder,
    public alertController: AlertController
  
    ) { 
    
  }

  ngOnInit() {
    this.MostraDados();
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
    
  }
  goBack() {
    this.navCtrl.back();
  }

  novoHospital(){
    this.navCtrl.navigateRoot('/incluirhosp');
    }

  goToo(code,UF){
    console.log("code",code);

    sessionStorage.setItem("currentUF",UF)
    console.log("'ÜF:'" ,UF)
      this.navCtrl.navigateRoot('/edithosp',code);
      sessionStorage.setItem("codigoH",btoa(code))
      }


  //delete(form: NgForm)
  async cancelar(code) {

    console.log(code)
    //create form 

    //console.log("Delete:", params);


    const alert = await this.alertController.create({
      header: 'Excluindo...',
      message: 'Tem certeza que deseja excluir hospital?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            console.log('Confirm Ok');
            console.log('aaa', code)
            this.delete(code);
            await alert.remove();
          }
        }
      ]
    });

    await alert.present();


  }
  //delete(form: NgForm)
  delete(code) {

    console.log(code)
    //create form 
    let myForm: FormGroup;
    // ------ NEW FORM WITH EDIT DATA
    myForm = this.formBuilder.group({
      code: code
    });


    let params = {
      'StatusCRUD': 'Delete',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spHospital", params).then(res => {
      let resultado: any = res;
      this.alertService.presentAlert({ pTitle: 'Excluindo...', pSubtitle: '', pMessage: 'Hospital excluído com sucesso !' });

    });
    this.MostraDados();
  }




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
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Minha Conta', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Minha Conta', pMessage: 'Nenhum usuário!' });
      }
    });
  }


  public a: any ;
  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
console.log('params',params)
    this.Authorizer.QueryStoreProc('Executar', 'spHospital', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado",resultado)
      try {
        if (resultado.success) { 
          this.a=  JSON.parse(resultado.results);
          console.log('this.a',this.a)    
       
         //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Hospitais', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Hospitais', pMessage: 'Nenhum usuário!' });
      }
    });
    
  }




  expandFazenda() {
    this.ishidden = !this.ishidden;
  }


}
