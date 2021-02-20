
import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm ,FormGroup, FormBuilder  } from '@angular/forms';

import {  Platform } from '@ionic/angular';


import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-atender',
  templateUrl: './atender.page.html',
  styleUrls: ['./atender.page.scss'],
})
export class AtenderPage implements OnInit {


  public Nome : String;
  public SobreNome : String;
  public CPF: String;
  public Email : String;

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
  this.dados= sessionStorage.getItem('atendimento');
  console.log(this.dados);
  this.atualizarr();
  }
  goBack() {
    this.navCtrl.back();
  }

 


 


  //delete(form: NgForm)
 public result:any;

  atualizarr()
  {




    let params = {
      'StatusCRUD': 'Pesquisaratender1',
      'formValues': this.dados,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log("Pesquisar:", params);
    this.Authorizer. QueryStoreProc('Executar',"spAtendimento", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) { 
           
           
         this.result= JSON.parse(resultado.results)
         this.Nome      = JSON.parse(resultado.results)[0].name;
         this.SobreNome  = JSON.parse(resultado.results)[0].last_name;
         this.Email  = JSON.parse(resultado.results)[0].email;
         
          }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: ' Não  paciente' });
          //this.navCtrl.navigateRoot('/login');
      
          this.Nome      = '';
          this.SobreNome  = '';
          this.Email  = '';
     
        }}
        catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Patient', pMessage: 'Nenhum usuário!' });
        }
    });
    
    
  }



  Criacao(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
 form.value.SobreNome=this.SobreNome
 form.value.Nome=this.Nome
 form.value.Email=this.Email
 form.value.CPF=this.dados
    console.log(form.value);
    let params = {
      'StatusCRUD': 'Addatender',
      'formValues': form.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Novo Atendimento:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spAtendimento', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        
        if (resultado.success) {
          
          this.alertService.presentAlert({ pTitle: 'Salvando...', pSubtitle: '', pMessage:'Operação realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 1000);
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados' });
      }
    });
    sessionStorage.removeItem('rdv')
    this.goBack();
    
  }


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
            this.alertService.presentAlert({ pTitle: 'Salvando...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!'});
            
          }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'você não pode excluir este paciente'});
          //this.navCtrl.navigateRoot('/login');
        }}
        catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Erro', pMessage: 'Nenhum usuário!' });
        }
    });
    this.dados=sessionStorage.setItem('rdv',"");
    this.ngOnInit();
    
  }


  



  


}

