


import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm ,FormGroup, FormBuilder  } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import {  Platform } from '@ionic/angular';


import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-compromisso-lista',
  templateUrl: './compromisso-lista.page.html',
  styleUrls: ['./compromisso-lista.page.scss'],
})
export class CompromissoListaPage implements OnInit {

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
    private db : Storage,
    public alertController: AlertController
    
  
    ) { 
    
  }
public dados:any;
  ngOnInit() {   
  this.dados=JSON.parse(atob(sessionStorage.getItem('compromisso')));
  console.log(this.dados);
  this.platform.backButton.subscribe(()=>{
    this.navCtrl.navigateRoot('/consulta-nomeacoes');
  })
  
  }
  goBack() {
    this.navCtrl.back();
  }

 


 


  //delete(form: NgForm)
  async cancelar(cpf)
  {

    console.log(cpf)
    //create form 
    
    //console.log("Delete:", params);


    const alert = await this.alertController.create({
      header: 'Cancelando...',
      message: 'Tem certeza que deseja cancelar a consulta?',
      buttons: [
        {
          text: 'NAO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler:async () => {
            console.log('Confirm Ok');
            console.log('aaa',cpf)
            this.confdelete(cpf);
            await alert.remove();
          }
        }
      ]
    });

    await alert.present();
    
    
  }

confdelete(cpf){
  let myForm: FormGroup;
          // ------ NEW FORM WITH EDIT DATA
          myForm = this.formBuilder.group({
            cpf: cpf
          });


    let params = {
      'StatusCRUD': 'Cancelar',
      'formValues': cpf,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

  this.Authorizer. QueryStoreProc('Executar',"spAtendimento", params).then(res => {
    let resultado: any = res[0];
    console.log(resultado)
    try {
      if (resultado.success) { 
          this.alertService.presentAlert({ pTitle: 'Atendimento', pSubtitle: 'Success', pMessage: 'Atendimento excluído com sucesso !' });
        }
      else {
        this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Atendimento', pMessage: 'Não há atendimento como excluir' });
      }}
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Atendimento', pMessage: 'Nenhum usuário!' });
      }
  });
document.getElementById(cpf).remove()
 

}
/*
  cumpridas(cpf)
  {

    console.log(cpf)
    //create form 
    let myForm: FormGroup;
          // ------ NEW FORM WITH EDIT DATA
          myForm = this.formBuilder.group({
            cpf: cpf
          });


    let params = {
      'StatusCRUD': 'Cumpridas',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Delete:", params);
    this.Authorizer. QueryStoreProc('Executar',"spAtendimento", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) { 
            this.alertService.presentAlert({ pTitle: 'Atendimento', pSubtitle: 'Success', pMessage: 'Cumpridas !' });
            
          }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Atendimento', pMessage: 'você não pode excluir este paciente' });
          //this.navCtrl.navigateRoot('/login');
        }}
        catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Atendimento', pMessage: 'Nenhum usuário!' });
        }
    });
    this.dados=sessionStorage.setItem('atendimento',"");
    this.gotoo();
    
  }

*/

atualizar(form)
  {
    console.log("fgfhh",form)
    //create form 
    sessionStorage.setItem('atendimento', form);  
    this.gotoo();  

    
  }
  gotoo(){
    this.navCtrl.navigateRoot('/atender');
    }


  naocumpridas(cpf)
  {

    console.log(cpf)
    //create form 
    let myForm: FormGroup;
          // ------ NEW FORM WITH EDIT DATA
          myForm = this.formBuilder.group({
            cpf: cpf
          });


    let params = {
      'StatusCRUD': 'NaoCumpridas',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Delete:", params);
    this.Authorizer. QueryStoreProc('Executar',"spAtendimento", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) { 
          this.alertService.presentAlert({ pTitle: 'Atendimento', pSubtitle: '', pMessage: 'Compromisso ainda não concluído!' });
           
          }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Atendimento', pMessage: 'você não pode excluir este paciente' });
          //this.navCtrl.navigateRoot('/login');
        }}
        catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Atendimento', pMessage: 'Nenhum usuário!' });
        }
    });
    this.dados=sessionStorage.setItem('rdv',"");
    this.ngOnInit();
    
  }


  expandFazenda() {
    this.ishidden = !this.ishidden;
  }

}

