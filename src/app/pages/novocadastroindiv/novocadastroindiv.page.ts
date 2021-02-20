import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { NavController, AlertController, ModalController } from '@ionic/angular';
//import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-novocadastroindiv',
  templateUrl: './novocadastroindiv.page.html',
  styleUrls: ['./novocadastroindiv.page.scss'],
})

export class NovocadastroindivPage implements OnInit {
  public Latitude: any;
  public Longitude: any;
  public Endereco: any;
  public Cidadao : boolean = true;
  public Mae : boolean = false;
  public Pai : boolean = false;
  public Membro : boolean = false;
  public Sexual : boolean = false;
  public Genero : boolean = false;
  public Deficiencia : boolean = false;
  public Obito : boolean = false;
  public Gozando : boolean = false;
  public Gestante : boolean = false;
  public Coracao : boolean = false;
  public Doenca : boolean = false;
  public Internacao : boolean = false;
  public Medicinais : boolean = false; 
  public CondicoesdeSaude : boolean = false; 
  public Rins : boolean = false; 
  public SituacaodeRua : boolean = false; 
  public Acompanhado : boolean = false;  
  public Frequencia : boolean = false; 
  public HigienePessoal : boolean = false;
  private imageFile: any;
  private imageFileBase64: string;
  private imageCroquiExtension: string;
  constructor(
    private geolocation: Geolocation,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private navCtrl: NavController
  ) { }
  @ViewChild('inputcamera') cameraInput: ElementRef;

  ngOnInit() {
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    this.imageFileBase64 = "assets/imgs/imgdefault.png";
    this.imageFile = null;
    element.onchange = () => {
      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();
      reader.onload = (r: any) => {
        let base64 = r.target.result as string;
        this.imageFileBase64 = r.target.result as string;
      };
      reader.readAsDataURL(element.files[0]);
      this.imageCroquiExtension = element.files[0].type;
      this.imageFile = element.files[0];
    };
  }
  goBack() {
    this.navCtrl.back();
  }


  getCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.Latitude = resp.coords.latitude;
      this.Longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onChangeSituacao(Situacao: string) {
   console.log('selected : ',Situacao);
  }
  onChangeNomedeMae(Mae: string) {
    console.log('selected : ',Mae);
   }
  onChangeNomedePai(Pai: string) {
    console.log('selected : ',Pai); 
   }
   onChangeQual(Membro: string) {
    console.log('selected : ',Membro); 
   }
   onChangeSexual(Sexual: string) {
    console.log('selected : ',Sexual); 
   }
   onChangeGenero(Genero: string) {
    console.log('selected : ',Genero); 
   }
   onChangeDeficiencia(Deficiencia: string) {
    console.log('selected : ',Deficiencia); 
   }
   onChangeObito(Obito: string) {
    console.log('selected : ',Obito); 
   }
   onChangeGozando(Gozando: string) {
    console.log('selected : ',Gozando); 
   }
   onChangeGestante(Gestante: string) {
    console.log('selected : ',Gestante); 
   }
   onChangeCoracao(Coracao: string) {
    console.log('selected : ',Coracao); 
   }
   onChangeDoenca(Doenca: string) {
    console.log('selected : ',Doenca); 
   }
   onChangeInternacao(Internacao: string) {
    console.log('selected : ',Internacao); 
   }
   onChangeMedicinais(Medicinais: string) {
    console.log('selected : ',Medicinais); 
   }
   onChangeCondicoesdeSaude(CondicoesdeSaude: string) {
    console.log('selected : ',CondicoesdeSaude); 
   }
   onChangeRins(Rins: string) {
    console.log('selected : ',Rins); 
   }
   onChangeSituacaodeRua(SituacaodeRua: string) {
    console.log('selected : ',SituacaodeRua); 
   }
   onChangeAcompanhado(Acompanhado: string) {
    console.log('selected : ',Acompanhado); 
   }
   onChangeFrequencia(Frequencia: string) {
    console.log('selected : ',Frequencia); 
   }
   onChangeHigienePessoal(HigienePessoal: string) {
    console.log('selected : ',HigienePessoal); 
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


  async Cancelar() {
    const alert = await this.alertController.create({
      header: 'Cancelar...',
      message: 'Tem certeza de que deseja cancelar esta operação?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SIM',
          handler: async () => {
            console.log('Confirm Ok');
            this.goBack();
            //await alert.remove();
          }
        }
      ]
    });
    await alert.present();
  }

  ///////////////////////////////////////////////////////////////////////////////////////

}
