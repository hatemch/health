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
  selector: 'app-editfisico',
  templateUrl: './editfisico.page.html',
  styleUrls: ['./editfisico.page.scss'],
})
export class EditfisicoPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('Nome') iNome;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/checkupp.png";

  public Nome: String;
  public pesokg: String;
  public pesogr: String;

  public altura: String;
  public SobreNome: String;
  public fumar: String;
  public tipo: String;
  public CPF: String;
  public Exame: String;
  public Sexo: any;
  public photopath: String;
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
      this.navCtrl.navigateRoot('/consultfisico');
    })
  }



  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    this.MostraDados();
    console.log("ionViewDidEnter");

    const element = this.cameraInput.nativeElement as HTMLInputElement;

    this.imageFileBase64 = "assets/sanguee.png";
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

  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    //console.log("ionViewDidLeave");    
  }


  goBack() {
    this.navCtrl.navigateRoot('/consultfisico');
  }


  public pac: boolean = false;
  public aten: boolean = false;

  public sim: boolean = false;
  public nao: boolean = false;

  public prim: boolean = false;
  public con: boolean = false;


  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando    

    let i = sessionStorage.getItem('CPFPatient')
    console.log('vlue of i :', atob(i));
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar_editexam',
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
          else { this.photopath = '' 
                this.imageFileBase64 = "assets/imgs/checkupp.png";
        }

          this.Nome = JSON.parse(resultado.results)[0].Nome;
          this.SobreNome = JSON.parse(resultado.results)[0].Sobrenome;
          this.pesokg = JSON.parse(resultado.results)[0].pesokg;
          this.pesogr = JSON.parse(resultado.results)[0].pesogr;
          this.altura = JSON.parse(resultado.results)[0].altura;
          this.Exame = JSON.parse(resultado.results)[0].exame;
          this.fumar = JSON.parse(resultado.results)[0].fumar;
          this.tipo = JSON.parse(resultado.results)[0].tipo;
          this.CPF = JSON.parse(resultado.results)[0].CPF;
          let S: any = JSON.parse(resultado.results)[0].Sexo;
          if (typeof (S) == 'undefined')
            S = '';
          if (S == null)
            S = '';
          if (S != '')
            this.Sexo = S;

          console.log('fumarr', this.fumar)
          console.log('Exame ', this.Exame)
          console.log('tipo', this.tipo)
          if (this.Exame == 'paciente') {
            this.pac = true;
            this.aten = false;
          } else {
            this.aten = true;
            this.pac = false;
          }

          /* if (this.fumar == 'nao') {
            this.nao = true;
            this.sim = false;
          } else {
            this.nao = false;
            this.sim = true;
          } */

          if (this.tipo == 'primeira vez') {
            this.prim = true;
            this.con = false;
          } else {
            this.prim = false;
            this.con = true;
          }


          //this.alertService.showLoader(resultado.message, 1000);
        }

      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Exame', pMessage: 'Não exame' });

      }
    });

  }

  public checked_fumar: any;
  /* getSim(event) {
    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (event.detail.checked == true) {
      this.checked_fumar = 'sim';
    }
  }

  getNao(event) {
    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (event.detail.checked == true) {
      this.checked_fumar = 'nao';
    }
  }
 */

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

          form.value.fumar = this.fumar
          form.value.CPF = this.CPF
          form.value.Nome = this.Nome
          form.value.SobreNome = this.SobreNome
          form.value.Sexo = this.Sexo

          let params = {
            'StatusCRUD': 'Gravar',
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
              /* else {
                this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Editar Exame', pMessage: resultado.message });
                //this.navCtrl.navigateRoot('/login');
              } */
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

      
      form.value.fumar = this.fumar
      form.value.CPF = this.CPF
      form.value.Nome = this.Nome
      form.value.SobreNome = this.SobreNome
      form.value.Sexo = this.Sexo
      form.value.path = this.photopath
      let params = {
        'StatusCRUD': 'Gravar',
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
          /* else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Editar Exame', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          } */
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




