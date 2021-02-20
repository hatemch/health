
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
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-novopaciente',
  templateUrl: './novopaciente.page.html',
  styleUrls: ['./novopaciente.page.scss'],
})
export class NovopacientePage implements OnInit {
  @ViewChild('Nome') iNome;
  //imagen 
  private imageFileBase64: string;
  private imageCroquiExtension: string;
  private imageFile: any;
  public slideOneForm: FormGroup;


  @ViewChild('inputcamera') cameraInput: ElementRef;

  private DECIMAL_SEPARATOR = ".";
  private GROUP_SEPARATOR = ",";
  private pureResult: any;
  private maskedId: any;
  private val: any;
  private v: any;
  images = [];
  imageData = [];
  public SrcPhotoAvatar: any = "assets/imgs/user.jpg";
  public CodigoUsuario: any;
  public Nome: String;
  public SobreNome: String;
  public DataDeNascimento: String;
  public Sexo: any;
  public RH: any;
  public Email: String;
  public CPF: String;
  public CNS: String;
  public Perfile: number;
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
    private filePath: FilePath,
    public formBuilder: FormBuilder

  ) {

    this.slideOneForm = formBuilder.group({

      cpfCont: [''],
      cns: [''],
      nome: [''],
      sobrenome: [''],
      email: [''],
      sexo: [''],
      rh: [''],
      data: [''],
      perfile: [''],
    }); 
  }

  ngOnInit() {

    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/prontuarios');
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








  atualizar(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
    if (this.imageFile) {
      this.Authorizer.QueryStoreImagem('SalvarImagem', '', 'images/', this.imageFile).then(res => {

        let resultado: any = res[0];
        //resultado.results // This is the complete path. Ejemplo: "C:\web\sites\ServiceImobiliario\uploads\imagems\croqui\y35swmarzjt.jpg"
        if (res[0].success) {
          // rutaImagem = this.envService.API_NAME + res[0].results;

          // this.imageFileBase64 = this.envService.API_NAME + res[0].results;
          console.log('I am the path', res[0].results);

          console.log('formmmmmm', form)
          form.value.path = res[0].results;
          let params = {
            'StatusCRUD': 'Criacao',
            'formValues': form.value,
            'CodigoUsuarioSistema': 0,
            'Hashkey': sessionStorage.getItem("SessionHashkey")
          };

          console.log("valores:", params);
          this.Authorizer.QueryStoreProc('Executar', 'spPatient', params).then(res => {
            let resultado: any = res[0];
            console.log("resultado", resultado)
            try {
              if (resultado.success) {
                this.alertService.presentAlert({ pTitle: 'Salvando Paciente...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
                this.alertService.showLoader(resultado.message, 1000);
                this.goBack();
              }
              else {
                this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
                //this.navCtrl.navigateRoot('/login');
              }
            } catch (err) {
              this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
            }
          });

        }
      }
      );
    }

    else {
      let params = {
        'StatusCRUD': 'Criacao',
        'formValues': form.value,
        'CodigoUsuarioSistema': 0,
        'Hashkey': sessionStorage.getItem("SessionHashkey")
      };

      console.log("valores:", params);
      this.Authorizer.QueryStoreProc('Executar', 'spPatient', params).then(res => {
        let resultado: any = res[0];
        console.log("resultado", resultado)
        try {
          if (resultado.success) {
            this.alertService.presentAlert({ pTitle: 'Salvando Paciente...', pSubtitle: '', pMessage: 'Operação realizada com sucesso!' });
            this.alertService.showLoader(resultado.message, 1000);
            this.goBack();
          }
          else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Operação não realizada!' });
            //this.navCtrl.navigateRoot('/login');
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
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






  /* ------------------------------------------- MASK CPF ----------------------------------------- */
 

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

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Elimina todo lo que no es Digito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca punto entre el trecero y cuarto digito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca punto entre el trecero y cuarto digito
    //de nuevo (para el segundo bloque de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca un guion entre Coloca el tercero y cuarto digito del ultimo bloque
    return v;
  }




  /* ValString: value to be validated
     idComponent: this is the id of your HTML component. For example id="" 
  */
 format(valStringTemp: any, idComponent: string) {

  let valString = valStringTemp.form.value.cpfCont;

  let mask: string;

  if (!valString) {
    return '';
  }
  let val = valString.toString();
  const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);

  if (parts[0].length > 0 && parts[0].length <= 11) { // this is for CPF validation
    mask = this.cpf_mask(parts[0]);

  } 
  else{
    // This is to separate string, maybe you would like to use to make validations in the future
    mask = parts[0].substring(0, 11);
  }

  //Warning: This is old code but it works, if you find a better solution 
  // just tell me. Your friend JC.
  (<HTMLInputElement>document.getElementById(idComponent)).value = mask;
  
}
  /* ------------------------------------------- END MASK CPF ------------------------------------------ */

}



