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
  selector: 'app-minhaconta',
  templateUrl: './minhaconta.page.html',
  styleUrls: ['./minhaconta.page.scss'],
})
export class MinhaContaPage implements OnInit {
  @ViewChild('inputcamera') cameraInput: ElementRef;
  @ViewChild('Nome') iNome;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/user.jpg";
  public CodigoUsuario: any;
  public NomeUsuarioLogado: String;
  public Nome: String;
  public photopath: String;
  public SobreNome: String;
  public DataDeNascimento: String;
  public Sexo: any;
  public Pos: any;
  public RH: any;
  public Email: String;

  public poss: any[] = [
    {
      id_Pos: 1,
      Pos: 'Doutor'
    },
    {
      id_Pos: 2,
      Pos: 'Assistente'
    }
  ];

  public sexos: any[] = [
    {
      id_Sexo: 1,
      Sexo: 'Masculino'
    },
    {
      id_Sexo: 2,
      Sexo: 'Feminino'
    }
  ];
  public RHs: any[] = [
    {
      id_RH: 1,
      RH: 'O-'
    },
    {
      id_RH: 2,
      RH: 'O+'
    },
    {
      id_RH: 3,
      RH: 'B-'
    },
    {
      id_RH: 4,
      RH: 'B+'
    },
    {
      id_RH: 5,
      RH: 'A+'
    },
    {
      id_RH: 6,
      RH: 'A-'
    },
    {
      id_RH: 7,
      RH: 'AB+'
    },
    {
      id_RH: 8,
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
    this.CodigoUsuario = JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario;
    this.NomeUsuarioLogado = JSON.parse(sessionStorage.getItem('SessionUser'))[0].Nome;
    this.MostraDados(JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario);
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(()=>{
      this.goBack();
    })
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //console.log("ionViewWillEnter");
    //this.CRUDActionAPIForm('Pesquisando', null);  

  }


  ionViewDidEnter() {


    this.MostraDados(JSON.parse(sessionStorage.getItem('SessionUser'))[0].CodigoUsuario);
    console.log("ionViewDidEnter");



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

  }

  ionViewDidLeave() {
    // Disparado quando o roteamento de componentes terminou de ser animado.    
    //console.log("ionViewDidLeave");    
  }
  goBack() {
    this.navCtrl.back();
  }

  MostraDados(CodigoUsuario: any) {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': CodigoUsuario,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(res => {
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
          this.SobreNome = JSON.parse(resultado.results)[0].SobreNome;
          let dat: any = JSON.parse(resultado.results)[0].DataDeNascimento;
          if (typeof (dat) == 'undefined')
            dat = '';
          if (dat == null)
            dat = '';
          if (dat != '')
            this.DataDeNascimento = dat;

          let R: any = JSON.parse(resultado.results)[0].RH;
          if (typeof (R) == 'undefined')
            R = '';
          if (R == null)
            R = '';
          if (R != '')
            this.RH = R;

          let sex: any = JSON.parse(resultado.results)[0].Sexo;
          if (typeof (sex) == 'undefined')
            sex = '';
          if (sex == null)
            sex = '';
          if (R != '')
            this.Sexo = sex;

          let pos: any = JSON.parse(resultado.results)[0].position;
          if (typeof (pos) == 'undefined')
            pos = '';
          if (pos == null)
            pos = '';
          if (R != '')
            this.Pos = pos;


          //this.alertService.showLoader(resultado.message, 1000);
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
          form.value.Senha = Md5.hashStr(form.value.Senha);
          form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
          let params = {
            'StatusCRUD': 'Gravar',
            'formValues': form.value,
            'CodigoUsuarioSistema': JSON.parse(sessionStorage.SessionUser)[0].CodigoUsuario,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };

          console.log("valores:", params);
          this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(res => {
            let resultado: any = res[0];
            console.log("resultado", resultado)
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
      });
    } else {
      form.value.path = this.photopath
      form.value.Senha = Md5.hashStr(form.value.Senha);
      form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
      let params = {
        'StatusCRUD': 'Gravar',
        'formValues': form.value,
        'CodigoUsuarioSistema': JSON.parse(sessionStorage.SessionUser)[0].CodigoUsuario,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };

      console.log("valores:", params);
      this.Authorizer.QueryStoreProc('MinhaConta', 'spMinhaConta', params).then(res => {
        let resultado: any = res[0];
        console.log("resultado", resultado)
        try {
          if (resultado.success) {

            this.alertService.showLoader(resultado.message, 1000);
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: '', pMessage: resultado.message });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Erro', pMessage: 'Nenhum usuário!' });
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

