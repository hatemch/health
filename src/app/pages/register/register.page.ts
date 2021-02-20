import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgForm } from '@angular/forms';
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
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators';
const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //@ViewChild("Nome") iNome : ElementRef;


  //imagen 
  private imageFileBase64: string;
  private imageCroquiExtension: string;
  private imageFile: any;


  @ViewChild('inputcamera') cameraInput: ElementRef;

  @ViewChild('Nome') iNome;
  images = [];
  imageData = [];
  public SrcPhotoAvatar: any = "assets/imgs/user.jpg";
  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";
  private pureResult: any;
  private maskedId: any;
  private val: any;
  private v: any;

  public CodigoUsuario: any;
  public NomeUsuarioLogado: string;

  public Nome: string;
  public SobreNome: string;
  public Email: string;
  public Data: Date;
  public poss: any[] = [
    {
      id: 1,
      pos: 'Doutor'
    },
    {
      id: 2,
      pos: 'Assistente'
    }
  ];
  public sexos: any[] = [
    {
      id: 1,
      sexo: 'Masculino'
    },
    {
      id: 2,
      sexo: 'Feminino'
    }
  ];
  public RHs: any[] = [
    {
      id: 1,
      RH: 'O-'
    },
    {
      id: 2,
      RH: 'O+'
    },
    {
      id: 3,
      RH: 'B-'
    },
    {
      id: 4,
      RH: 'B+'
    },
    {
      id: 5,
      RH: 'A+'
    },
    {
      id: 6,
      RH: 'A-'
    },
    {
      id: 7,
      RH: 'AB+'
    },
    {
      id: 8,
      RH: 'AB-'
    }
  ];


  constructor(


    private navCtrl: NavController,
    private alertService: AlertService,
    private env: EnvService,
    private Authorizer: AuthService,
    private Eventos: Events,
    public modalController: ModalController,
    public platform: Platform,
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
    private filePath: FilePath

  ) { }

  ngOnInit() {
    console.log("Init");
    this.CodigoUsuario = sessionStorage.getItem("SessionCodigoUsuario");
    this.NomeUsuarioLogado = sessionStorage.getItem("SessionNomeUsuario");
    this.platform.backButton.subscribe(()=>{
      this.goBack();
    })
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    console.log("ionViewWillEnter");
  }





  ionViewDidEnter() {


    console.log("ionViewDidEnter");
    setTimeout(() => {
      this.iNome.setFocus();
    }, 150);



    const element = this.cameraInput.nativeElement as HTMLInputElement;

    this.imageFileBase64 = "assets/imgs/user.jpg";
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

  ionViewWillLeave() {
    // Disparado quando o roteamento de componentes está prestes a ser animado.    
    console.log("ionViewWillLeave");


  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    console.log("ionViewDidLeave");
  }

  goBack() {
    this.navCtrl.back();
  }



  GravarDados(form: NgForm) {
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
          form.value.Senha = Md5.hashStr(form.value.Senha);
          form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
          let params = {
            'StatusCRUD': 'Register',
            'formValues': form.value,
            'CodigoUsuarioSistema': 0,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };

          console.log("Register:", params);
          this.Authorizer.QueryStoreProc('MinhaConta', 'spRegister', params).then(res => {
            let resultado: any = res[0];
            //console.log(resultado);
            try {

              if (resultado.success) {

                this.alertService.presentAlert({ pTitle: 'Salvando Conta...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
                this.alertService.showLoader(resultado.message, 1000);
                this.goBack();
              }
              else {
                this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });

              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
            }
          });


        }
      }
      );
    } else {

      form.value.Senha = Md5.hashStr(form.value.Senha);
      form.value.ReSenha = Md5.hashStr(form.value.ReSenha);

      let params = {
        'StatusCRUD': 'Register',
        'formValues': form.value,
        'CodigoUsuarioSistema': 0,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };

      console.log("Register:", params);
      this.Authorizer.QueryStoreProc('MinhaConta', 'spRegister', params).then(res => {
        let resultado: any = res[0];
        //console.log(resultado);
        try {

          if (resultado.success) {

            this.alertService.presentAlert({ pTitle: 'Salvando Conta...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });

          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
        }
      });


    }



  }
  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  };






  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
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
