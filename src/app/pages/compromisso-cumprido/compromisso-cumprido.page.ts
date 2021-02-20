

import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import {  FormBuilder  } from '@angular/forms';

import {  Platform } from '@ionic/angular';


import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-compromisso-cumprido',
  templateUrl: './compromisso-cumprido.page.html',
  styleUrls: ['./compromisso-cumprido.page.scss'],
})
export class CompromissoCumpridoPage implements OnInit {

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
    private db : Storage
    
  
    ) { 
    
  }
public dados:any;
  ngOnInit() {   
  this.MostraDados();
  this.platform.backButton.subscribe(()=>{
    this.navCtrl.navigateRoot('/agenda');
  })
  }
  goBack() {
    this.navCtrl.back();
  }

 


 


  //delete(form: NgForm)
  




  


  public a: any ;
  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisarcumpridas',
      'formValues': '',
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
console.log('params',params)
    this.Authorizer.QueryStoreProc('Executar', 'spAtendimento', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado",resultado)
      try {
        if (resultado.success) { 
          this.a=  JSON.parse(resultado.results);
          console.log('this.a',this.a)    
        
         //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Atendimento', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Atendimento', pMessage: 'Nenhum usuário!' });
      }
    });
    
  }




  expandFazenda() {
    this.ishidden = !this.ishidden;
  }

}


