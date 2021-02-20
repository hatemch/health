import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import {CadastroIndividualFoto} from '../../../models/CadastroIndividualFoto';
import { AuthService } from 'src/app/services/auth.service';
import { EnvService } from 'src/app/services/env.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-cadastro-individual-foto',
  templateUrl: './atendimento-domiciliar-foto.page.html',
  styleUrls: ['./atendimento-domiciliar-foto.page.scss'],
})
export class AtendimentoDomiciliarFotoPage implements OnInit {
  @ViewChild('inputGallery') galleryInput: ElementRef;
  public subtitle = 'Atendimento Domiciliar';


  public model: CadastroIndividualFoto = new CadastroIndividualFoto();
  public collectionFilter: CadastroIndividualFoto[];

  public Fotos;
  state: any = {};
  public imageFileBase64: any;
  constructor(
      private navCtrl: NavController,
      private camera: Camera,
      private Authorizer: AuthService,
      private env: EnvService,
      private alertService: AlertService,
  ) {}

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  public setFunctionCamera(srcType){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.Authorizer.QueryStoreImagem('SalvarImagem', '', this.env.IMAGE_PRODUCT,imageData).then(res => {

        let resultado: any = res[0];
        //resultado.results // This is the complete path. Ejemplo: "C:\web\sites\ServiceImobiliario\uploads\imagems\croqui\y35swmarzjt.jpg"
        if (res[0].success) {
          // rutaImagem = this.envService.API_NAME + res[0].results;

          this.imageFileBase64 = res[0].results;
          this.model.foto_url= this.imageFileBase64;
          //this.model.legenda  = formProduto.value.legenda;
          console.log('I am the path', this.imageFileBase64);


          //formProduto.value.foto_jpg = res[0].results;

         // this.CRUDAutofiscalizacaoFotos('spCRUDFiscalizacao_Fotos', 'CREATE', { fiscalizacao: this.model.fiscalizacao, ano: this.model.ano, foto_url: this.model.foto_url, legenda:this.model.legenda });
          //this.cancelImagem();


        } else {
          this.alertService.showLoader(res[0].message, 2000);

        }
      });
    }, (err) => {
      // Handle error
      console.log('estes es un error', err)
    });
  }
  public openCamera(){
    this.setFunctionCamera(this.camera.PictureSourceType.CAMERA);
  }

  public openGallery(){
    this.setFunctionCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
  }


}


