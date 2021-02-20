import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Camera } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-editsangue',
  templateUrl: './editsangue.page.html',
  styleUrls: ['./editsangue.page.scss'],
})
export class EditsanguePage implements OnInit {
  @ViewChild('Nome') iNome;

  @ViewChild('inputcamera') cameraInput: ElementRef;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/user.jpg";
  public photopath: String;
  public Nome: String;
  public SobreNome: String;
  public fumar: String;
  public tipo: String;
  public vidas: String;
  public coll: String;
  public hdll: String;
  public ldll: String;
  public trii: String;
  public psaa: String;
  public ca: number;
  public Glicemia: number;
  public ps: number;
  public pd: number;
  public CPF: String;
  public Exame: String;
  public Sexo: any;
  public pac: boolean = false;
  public aten: boolean = false;


  public prim: boolean = false;
  public con: boolean = false;

  public vs: boolean = false;
  public hdl: boolean = false;
  public ldl: boolean = false;
  public tri: boolean = false;
  public col: boolean = false;
  public psa: boolean = false;
  public sexos: any[] = [
    {
      id: 1,
      Sexo: 'M'
    },
    {
      id: 2,
      Sexo: 'F'
    },
  ];

  public UPDATE_TIME: number = 0;
  public UPDATE_TIME1: number = 0;
  public UPDATE_TIME2: number = 0;
  public UPDATE_TIME3: number = 0;
  public UPDATE_TIME4: number = 0;
  public UPDATE_TIME5: number = 0;
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public platform: Platform,
    private actionSheetController: ActionSheetController,


  ) { }


  ngOnInit() {


    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateRoot('/consultsangue');
    })
  }



  ionViewDidEnter() {
    this.MostraDados();

    // Disparado quando o roteamento de componentes terminou de ser animado.        

    console.log("ionViewDidEnter");

    const element = this.cameraInput.nativeElement as HTMLInputElement;

    this.imageFileBase64 = "assets/imgs/sanguee.png";
    this.imageFile = null;
    element.onchange = () => {

      // Depois colocar um loading aqui!!!     

      const reader = new FileReader();

      reader.onload = (r: any) => {

        //THIS IS THE ORIGINAL BASE64 STRING AS SNAPPED FROM THE CAMERA
        //THIS IS PROBABLY THE ONE TO UPLOAD BACK TO YOUR DB AS IT'S UNALTERED
        //UP TO YOU, NOT REALLY BOTHERED
        let base64 = r.target.result as string;

        //this.imageFileName = r.target.result as string; //MEU JC
        this.imageFileBase64 = r.target.result as string; //MEU JC

        //FIXING ORIENTATION USING NPM PLUGIN fix-orientation
        // fixOrientation(base64, { image: true }, (fixed: string, image: any) => {
        //   //fixed IS THE NEW VERSION FOR DISPLAY PURPOSES
        //   this.CadastroIndividualFoto = fixed;
        //   //this.alertService.hideLoader(500);
        // });

      };

      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };

  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //console.log("ionViewWillEnter");
    //this.CRUDActionAPIForm('Pesquisando', null);  

  }

  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.   
    console.log('hello world1')
    this.UPDATE_TIME = this.UPDATE_TIME + 1

  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    //console.log("ionViewDidLeave");   
    //console.log('hello world') 

  }


  goBack() {
    this.navCtrl.navigateRoot('/consultsangue');
  }





  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando    
    this.UPDATE_TIME = this.UPDATE_TIME + 1;
    this.UPDATE_TIME1 = this.UPDATE_TIME1 + 1;
    this.UPDATE_TIME2 = this.UPDATE_TIME2 + 1;
    this.UPDATE_TIME3 = this.UPDATE_TIME3 + 1;
    this.UPDATE_TIME4 = this.UPDATE_TIME4 + 1;
    this.UPDATE_TIME5 = this.UPDATE_TIME5 + 1;
    let i = sessionStorage.getItem('CPFPatient')
    console.log('vlue of i :', atob(i));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_editexam_sangue',
      'formValues': atob(i),
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spExame', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {


          this.photopath = JSON.parse(resultado.results)[0].photopath;
          if (this.photopath) {
            let path = this.env.API_HOST + '/ServiceProntoBook/';
            this.imageFileBase64 = path + JSON.parse(resultado.results)[0].photopath;
          }
          else { this.photopath = '' }

          this.Nome = JSON.parse(resultado.results)[0].Nome;
          this.SobreNome = JSON.parse(resultado.results)[0].Sobrenome;
          this.CPF = JSON.parse(resultado.results)[0].CPF;
          this.Exame = JSON.parse(resultado.results)[0].exame;
          this.tipo = JSON.parse(resultado.results)[0].tipo;
          this.ca = JSON.parse(resultado.results)[0].ca;
          this.Glicemia = JSON.parse(resultado.results)[0].Glicemia;
          this.ps = JSON.parse(resultado.results)[0].ps;
          this.pd = JSON.parse(resultado.results)[0].pd;
          this.tipo = JSON.parse(resultado.results)[0].tipo;
          this.trii = JSON.parse(resultado.results)[0].tri;
          this.vidas = JSON.parse(resultado.results)[0].vs;
          this.coll = JSON.parse(resultado.results)[0].col;
          this.hdll = JSON.parse(resultado.results)[0].hdl;
          this.ldll = JSON.parse(resultado.results)[0].ldl;
          this.psaa = JSON.parse(resultado.results)[0].psa;
          let S: any = JSON.parse(resultado.results)[0].Sexo;
          if (typeof (S) == 'undefined')
            S = '';
          if (S == null)
            S = '';
          if (S != '')
            this.Sexo = S;

          console.log('Exame ', this.Exame)
          console.log('tipo', this.tipo)
          if (this.Exame == 'paciente') {
            this.pac = true;
            this.aten = false;
          } else {
            this.aten = true;
            this.pac = false;
          }

          if (this.tipo == 'primeira vez') {
            this.prim = true;
            this.con = false;
          } else {
            this.prim = false;
            this.con = true;
          }

          if (this.trii == 'Triglicerídeos') {
            this.tri = true;
          } else {
            this.UPDATE_TIME4 = this.UPDATE_TIME4 + 1;
            this.tri = false;
          }

          if (this.vidas == 'Vida sexual') {
            this.vs = true;

          } else {
            this.vs = false;
            this.UPDATE_TIME = this.UPDATE_TIME + 1;
          }

          if (this.ldll == 'LDL') {
            this.ldl = true;
          } else {
            this.UPDATE_TIME3 = this.UPDATE_TIME3 + 1;
            this.ldl = false;
          }

          if (this.hdll == 'HDL') {
            this.hdl = true;
          } else {
            this.UPDATE_TIME2 = this.UPDATE_TIME2 + 1;
            this.hdl = false;
          }

          if (this.psaa == 'PSA') {
            this.psa = true;
          } else {
            this.UPDATE_TIME5 = this.UPDATE_TIME5 + 1;
            this.psa = false;
          }

          if (this.coll == 'Colesterol') {
            this.col = true;
          } else {
            this.col = false;
            this.UPDATE_TIME1 = this.UPDATE_TIME1 + 1;
          }
          console.log('prim', this.prim);
          //this.alertService.showLoader(resultado.message, 1000);
        }

      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Exame', pMessage: 'Não exame' });

      }
    });

  }



  public checked_vs: any;
  getVs(event) {
    if (this.UPDATE_TIME == 1) {
      this.UPDATE_TIME = this.UPDATE_TIME + 1
      return
    }



    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (this.vidas == 'Vida sexual') {
      this.vidas = '';
      this.checked_vs = 'vs';
    }
    else {
      this.vidas = 'Vida sexual';
      this.checked_vs = '';
    }
  }

  public checked_col: any;

  getCol(event) {
    if (this.UPDATE_TIME1 == 1) {
      this.UPDATE_TIME1 = this.UPDATE_TIME1 + 1
      return
    }


    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (this.coll == 'Colesterol') {
      this.coll = '';
      this.checked_col = 'col';
    }
    else {
      this.coll = 'Colesterol';
      this.checked_col = '';
    }
  }
  public checked_hdl: any;
  getHdl(event) {
    if (this.UPDATE_TIME2 == 1) {
      this.UPDATE_TIME2 = this.UPDATE_TIME2 + 1;
      return
    }

    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (this.hdll == 'HDL') {
      this.hdll = '';
      this.checked_hdl = 'hdl';
    }
    else {
      this.hdll = 'HDL';
      this.checked_hdl = '';
    }
  }
  public checked_ldl: any;
  getLdl(event) {
    if (this.UPDATE_TIME3 == 1) {
      this.UPDATE_TIME3 = this.UPDATE_TIME3 + 1;
      return
    }

    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (this.ldll == 'LDL') {
      this.ldll = '';
      this.checked_ldl = 'ldl';
    }
    else {
      this.ldll = 'LDL';
      this.checked_ldl = '';
    }
  }
  public checked_tri: any;
  getTri(event) {
    if (this.UPDATE_TIME4 == 1) {
      this.UPDATE_TIME4 = this.UPDATE_TIME4 + 1;
      return
    }

    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (this.trii == 'Triglicerídeos') {
      this.trii = '';
      this.checked_tri = 'tri';
    }
    else {
      this.trii = 'Triglicerídeos';
      this.checked_tri = '';
    }
  }
  public checked_psa: any;
  getPsa(event) {
    if (this.UPDATE_TIME5 == 1) {
      this.UPDATE_TIME5 = this.UPDATE_TIME5 + 1;
      return
    }
    this.UPDATE_TIME = this.UPDATE_TIME + 1

    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (this.psaa == 'PSA') {
      this.psaa = '';
      this.checked_psa = 'psa';
    }
    else {
      this.psaa = 'PSA';
      this.checked_psa = '';
    }
  }


  atualizar(form: NgForm) {
    // paramStatus: Pesquisando, Editando, Deletando   

    if (this.imageFile) {
      this.Authorizer.QueryStoreImagem('SalvarImagem', '', 'images/', this.imageFile).then(res => {

        let resultado: any = res[0];
        //resultado.results // This is the complete path. Ejemplo: "C:\web\sites\ServiceImobiliario\uploads\imagems\croqui\y35swmarzjt.jpg"
        if (res[0].success) {
          // rutaImagem = this.envService.API_NAME + res[0].results;

          // this.imageFileBase64 = this.envService.API_NAME + res[0].results;
          console.log('I am the path', res[0].results);
          form.value.path = res[0].results;

          if (form.value.con == true) {
            form.value.tipo = 'controle'
          }
          if (form.value.prim == true) {
            form.value.tipo = 'primeira vez'
          }

          if (form.value.aten == true) {
            form.value.exame = 'atendimento'
          }
          if (form.value.pac == true) {
            form.value.exame = 'paciente'
          }

          /* if (form.value.col == true) {
            form.value.col = 'Colesterol'
          }
          if (form.value.vs == true) {
            form.value.vs = 'Vida sexual'
          }
          if (form.value.hdl == true) {
            form.value.hdl = 'HDL'
          }
          if (form.value.ldl == true) {
            form.value.ldl = 'LDL'
          }
          if (form.value.tri == true) {
            form.value.tri = 'Triglicerídeos'
          }
          if (form.value.psa == true) {
            form.value.psa = 'PSA'
          } */

          form.value.vs = this.vidas;
          form.value.col = this.coll;
          form.value.hdl = this.hdll;
          form.value.ldl = this.ldll;
          form.value.tri = this.trii;
          form.value.psa = this.psaa;

          form.value.CPF = this.CPF
          form.value.Nome = this.Nome
          form.value.SobreNome = this.SobreNome
          form.value.Sexo = this.Sexo
          let params = {
            'StatusCRUD': 'Gravar_sangue',
            'formValues': form.value,
            'CodigoUsuarioSistema': 0,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };

          console.log('formm: ', form)
          console.log("gravar:", params);
          this.Authorizer.QueryStoreProc('Executar', 'spExame', params).then(res => {
            let resultado: any = res[0];
            try {
              if (resultado.success) {

                this.alertService.showLoader(resultado.message, 1000);

                this.goBack();
              }
             else {
                this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
                //this.navCtrl.navigateRoot('/login');
              } 
            } catch (err) {
              this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Editar Exame', pMessage: 'Nenhum usuário!' });
            }
          });


        }
      });
    } else {
      if (form.value.con == true) {
        form.value.tipo = 'controle'
      }
      if (form.value.prim == true) {
        form.value.tipo = 'primeira vez'
      }

      if (form.value.aten == true) {
        form.value.exame = 'atendimento'
      }
      if (form.value.pac == true) {
        form.value.exame = 'paciente'
      }

      /*  if (form.value.col == true) {
         form.value.col = 'Colesterol'
       }
       if (form.value.vs == true) {
         form.value.vs = 'Vida sexual'
       }
       if (form.value.hdl == true) {
         form.value.hdl = 'HDL'
       }
       if (form.value.ldl == true) {
         form.value.ldl = 'LDL'
       }
       if (form.value.tri == true) {
         form.value.tri = 'Triglicerídeos'
       }
       if (form.value.psa == true) {
         form.value.psa = 'PSA'
       } */

      form.value.vs = this.vidas;
      form.value.col = this.coll;
      form.value.hdl = this.hdll;
      form.value.ldl = this.ldll;
      form.value.tri = this.trii;
      form.value.psa = this.psaa;

      form.value.CPF = this.CPF
      form.value.Nome = this.Nome
      form.value.SobreNome = this.SobreNome
      form.value.Sexo = this.Sexo
      form.value.path = this.photopath
      let params = {
        'StatusCRUD': 'Gravar_sangue',
        'formValues': form.value,
        'CodigoUsuarioSistema': 0,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };

      console.log('formm: ', form)
      console.log("gravar:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spExame', params).then(res => {
        let resultado: any = res[0];
        try {
          if (resultado.success) {

            this.alertService.showLoader(resultado.message, 1000);
            

            this.goBack();
          }
           else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Editar Exame', pMessage: 'Nenhum usuário!' });
        }
      });



    }



  }





  takePicture() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }

  async seleccionarImagen() {

    const actionSheet = await this.actionSheetController.create({
      header: "SELECIONAR FONTE DA IMAGEM",
      buttons: [{
        text: 'Carregar da biblioteca de Imagens',
        handler: () => {
          // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          this.takePicture();
        }
      },
      {
        text: 'Use a Câmera',
        handler: () => {
          //this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Fechar',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


}




