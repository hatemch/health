import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { CadastroIndividualFoto } from "../../models/CadastroIndividualFoto";
import { AuthService } from "src/app/services/auth.service";
import { EnvService } from "src/app/services/env.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-cadastro-individual-foto",
  templateUrl: "./atividade-coletiva-foto.page.html",
  styleUrls: ["./atividade-coletiva-foto.page.scss"],
})
export class AtividadeColetivaFotoPage implements OnInit {
  @ViewChild("inputGallery") galleryInput: ElementRef;
  public subtitle = "Ficha Complementar";

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
    private alertService: AlertService
  ) {}

  ngOnInit() {}
  goBack() {
    this.navCtrl.back();
  }
  public setFunctionCamera(srcType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        console.log(imageData);
        let base64Image = "data:image/jpeg;base64," + imageData;

      },
      (err) => {
        console.log("estes es un error", err);
      }
    );
  }


  public openCamera() {
    this.setFunctionCamera(this.camera.PictureSourceType.CAMERA);
  }

  public openGallery() {
    this.setFunctionCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
  }
}
