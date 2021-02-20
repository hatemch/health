
import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
const STORAGE_KEY = 'my_images';


@Component({
  selector: 'app-fisico',
  templateUrl: './fisico.page.html',
  styleUrls: ['./fisico.page.scss'],
})
export class FisicoPage implements OnInit {

  private imageFileBase64: string;
  private imageCroquiExtension: string;
  private imageFile: any;



  @ViewChild('inputcamera') cameraInput: ElementRef;




  public Nome: String;
  public SobreNome: String;
  public CPF: String;
  public Sexo: any;
  public numberMask: any;
  masks :any;

  



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
    public formBuilder: FormBuilder,
    private camera: Camera,
    private file: File,
    private http: HttpClient,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private storage: Storage,
    private plt: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
  ) {
    this.masks = {
      valorInicialMask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      numberMask: createNumberMask({ prefix: 'Kg ',includeThousandsSeparator : false,requireDecimal: true , allowDecimal: true, decimalSymbol: ',' }),
      numberMask2: createNumberMask({ prefix: 'Cm ', thousandsSeparatorSymbol: '.', allowDecimal: true, decimalSymbol: ',' })
    };
  }

   


  ngOnInit() {
    //console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/consultfisico');
    })
    
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //console.log("ionViewWillEnter");
    //this.CRUDActionAPIForm('Pesquisando', null);  

    const element = this.cameraInput.nativeElement as HTMLInputElement;

    this.imageFileBase64 = "assets/imgs/checkupp.png";
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

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
  }

  ionViewWillLeave() {
  }

  ionViewDidLeave() {
  }
  goBack() {
    this.navCtrl.back();
  }









  atualizarr(Codigo) {

    console.log(Codigo.form.value.Codigo)
    //create form 



    let params = {
      'StatusCRUD': 'Pesquisar1',
      'formValues': Codigo.form.value.Codigo,
      'exame': this.checked,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log("Pesquisar:", params);
    this.Authorizer.QueryStoreProc('Executar', "spExame", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {


          let result = JSON.parse(resultado.results)

          console.log('est', result)
          if (JSON.parse(resultado.results)[0].name != undefined) {
            this.Nome = JSON.parse(resultado.results)[0].name;
            this.SobreNome = JSON.parse(resultado.results)[0].last_name;
            this.Sexo = JSON.parse(resultado.results)[0].gender;
            this.CPF = JSON.parse(resultado.results)[0].cpf;
          }
          else {
            this.Nome = JSON.parse(resultado.results)[0].Nome;
            this.SobreNome = JSON.parse(resultado.results)[0].Sobrenome;
            this.Sexo = JSON.parse(resultado.results)[0].Sexo;
            this.CPF = JSON.parse(resultado.results)[0].CPF;

          }

        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: ' Não  paciente' });
          //this.navCtrl.navigateRoot('/login');

          this.Nome = '';
          this.SobreNome = '';
          this.Sexo = '';
          this.CPF = '';
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Patient', pMessage: 'Nenhum usuário!' });
      }
    });


  }



  public checked: any;
  getAtend(event) {
    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (event.detail.checked == true) {
      this.checked = 'atendimento';
    }
  }


  getPaciente(event) {
    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (event.detail.checked == true) {
      this.checked = 'paciente';
    }
  }

  public checked_tipo: any;
  getPrimeira(event) {
    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (event.detail.checked == true) {
      this.checked_tipo = 'primeira vez';
    }
  }

  getControle(event) {
    console.log('exemple', event);
    console.log('checked state', event.detail.checked)

    if (event.detail.checked == true) {
      this.checked_tipo = 'controle';
    }
  }
  public checked_fumar: any;
  getSim(event) {
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






  Criacao(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
    if (this.imageFile) {
      this.Authorizer.QueryStoreImagem('SalvarImagem', '', 'images/', this.imageFile).then(res => {

        let resultado: any = res[0];
        //resultado.results // This is the complete path. Ejemplo: "C:\web\sites\ServiceImobiliario\uploads\imagems\croqui\y35swmarzjt.jpg"
        if (res[0].success) {
          // rutaImagem = this.envService.API_NAME + res[0].results;

          // this.imageFileBase64 = this.envService.API_NAME + res[0].results;
          console.log('I am the path', res[0].results);


          form.value.path = res[0].results;
          form.value.CPF =this.CPF;
          let params = {
            'StatusCRUD': 'Criacao',
            'formValues': form.value,
            'exame': this.checked,
            'tipo': this.checked_tipo,
            'fumar': this.checked_fumar,
            'CodigoUsuarioSistema': 0,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };

          console.log("Novo Fisico:", params);
          this.Authorizer.QueryStoreProc('Executar', 'spExame', params).then(res => {
            let resultado: any = res[0];
            console.log(resultado);
            try {

              if (resultado.success) {

                this.alertService.presentAlert({ pTitle: 'Salvando Exame...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
                this.alertService.showLoader(resultado.message, 1000);
                this.goBack();
              } else {
                this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
            }
          });

        }
      }
      );

    }
    else {
      form.value.CPF =this.CPF;

      let params = {
        'StatusCRUD': 'Criacao',
        'formValues': form.value,
        'exame': this.checked,
        'tipo': this.checked_tipo,
        'fumar': this.checked_fumar,
        'CodigoUsuarioSistema': 0,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };

      console.log("Novo Fisico:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spExame', params).then(res => {
        let resultado: any = res[0];
        console.log(resultado);
        try {

          if (resultado.success) {

            this.alertService.presentAlert({ pTitle: 'Salvando Exame...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          } else {
            this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      }
      );

    }
  }









/////////////////////////////  image insert //////////////////////////////

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




  ///////////////////////////////////////////////////////////////////////////////////////




}




