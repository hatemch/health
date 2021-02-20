import { Component, ViewChild, OnInit , ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgForm ,FormGroup, FormBuilder  } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import {Md5} from 'ts-md5/dist/md5';
import {  Platform } from '@ionic/angular';
import {  Validators } from '@angular/forms';


@Component({
  selector: 'app-novo-compromisso',
  templateUrl: './novo-compromisso.page.html',
  styleUrls: ['./novo-compromisso.page.scss'],
})
export class NovoCompromissoPage implements OnInit {
    
  public slideOneForm: FormGroup;
  public Nome : String;
  public SobreNome : String;
  public CPF: String;
  public Sexo:any;
  public Email : String;
  public Codigo : number;
  

  public sexos: any[] = [
    {
      id_Sexo: 1,
      Sexo: 'M'
    },
    {
      id_Sexo: 2,
      Sexo: 'F'
    }
  ];
  
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    public modalController: ModalController,
    public platform: Platform,
    public navController: NavController,
    public formBuilder : FormBuilder,
    ){}
      
 

  ngOnInit() {
    this.ConsultaHosp();
    this.Consultaspec(); 
    this.Consultapos();
    //console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/agenda');
    })
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //console.log("ionViewWillEnter");
    //this.CRUDActionAPIForm('Pesquisando', null);  

  }

  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    //this.MostraDados(JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario);   
    console.log("ionViewDidEnter");
    /*
    setTimeout(() => {
      this.iNome.setFocus();
    },150);
    */
  }
  
  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.    
    
  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    //console.log("ionViewDidLeave");    
  }
  goBack() {
    this.navCtrl.back();
  }


  
  









  public a: any ;
  ConsultaHosp() 
  {
    console.log("Hospitais :")
   let params1=null;

    this.Authorizer.QueryStoreProc1('ConsultasHosp',"", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
          //nenhum modulo encontrado
          this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis encontrado!' });
        } else {
          //mostro os módulos
          console.log("Hospitais:", resultado);
          this.a = resultado;
          console.log(this.a)
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }

 


  public b: any ;
  Consultaspec() 
  {
    console.log("Speciality :")
   let params1=null;

    this.Authorizer.QueryStoreProc1('ConsultasSpeciality',"", params1).then(res => {
      let resultado: any = res;
      try {
        if (resultado.length == 0) {
        
          //this.alertService.presentAlert({ pTitle: 'Speciality', pSubtitle: 'Menu', pMessage: 'Nenhuma informação encontrada!' });
        } else {
          //mostro os módulos
          console.log("Speciality:", resultado);
          this.b = resultado;
          console.log(this.b)
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Sem informação!' });
      }
    });
  }


  public c: any ;
  Consultapos() 
  {
    console.log("Hospitais :")
   let params1=null;

    this.Authorizer.QueryStoreProc('Executar',"spConsultaDoutor", '').then(res => {
      let resultado: any = res;
      this.c=JSON.parse(resultado[0].results)
      console.log(this.c)
     
      try {
        if (resultado.length == 0) {
          let result= JSON.parse(resultado.results)
         this.Nome      = JSON.parse(resultado.results)[0].Nome;
         this.SobreNome  = JSON.parse(resultado.results)[0].SobreNome;}
          else {
          //mostro os módulos
          console.log("Doutors:", resultado);
          //this.c= resultado;
          console.log(this.c)
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: 'Hospitais', pSubtitle: 'Menu', pMessage: 'Nenhum Perfis!' });
      }
    });
  }



  atualizarr(Codigo)
  {

    console.log('lkrgfd',Codigo)
    //create form 
    let myForm: FormGroup;
          // ------ NEW FORM WITH EDIT DATA
          myForm = this.formBuilder.group({
            Codigo: Codigo
          });


    let params = {
      'StatusCRUD': 'Pesquisar1',
      'formValues': Codigo.form.value.Codigo,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log("Pesquisar:", params);
    this.Authorizer. QueryStoreProc('Executar',"spAtendimento", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) { 
           
           
         let result= JSON.parse(resultado.results)
         this.Nome      = JSON.parse(resultado.results)[0].name;
         this.SobreNome  = JSON.parse(resultado.results)[0].last_name;
         this.CPF  = JSON.parse(resultado.results)[0].cpf;
         this.Sexo  = JSON.parse(resultado.results)[0].gender;
          }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Atendimento', pMessage: ' não  paciente' });
          //this.navCtrl.navigateRoot('/login');
      
          this.Nome      = '';
          this.SobreNome  = '';
          this.CPF  = '';
          this.Sexo  = '';
        }}
        catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Patient', pMessage: 'Nenhum usuário!' });
        }
    });
    
    
  }
  




  Criacao(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar

   form.value.CPF = this.CPF
    let params = {
      'StatusCRUD': 'Criacao',
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
          
          this.alertService.presentAlert({ pTitle: 'Salvando...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 1000);
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'verifique seus dados' });
      }
    });
    this.goBack();
  }



  
}



