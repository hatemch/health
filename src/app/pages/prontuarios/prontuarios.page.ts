import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController, Events, ModalController } from '@ionic/angular';
import { EmailValidator } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
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
import { AlertController } from '@ionic/angular';
import {environment} from "../../../environments/environment.prod";


@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.page.html',
  styleUrls: ['./prontuarios.page.scss'],
})
export class ProntuariosPage implements OnInit {

  public AppName: string = environment.AppName;
  public subtitle = 'Prontuários';

  @ViewChild('inputcamera') cameraInput: ElementRef;
  images = [];
  imageData = [];
  private imageFile: any;
  private imageCroquiExtension: string;
  public imageFileBase64: any = "assets/imgs/user.jpg";
  public photopath: String;

  public ishidden: boolean = true;

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
    private filePath: FilePath,
    public alertController: AlertController

  ) {

  }

  ngOnInit() {
    this.imageFileBase64 = "assets/imgs/user.jpg";
    this.MostraDados();
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }
  goBack() {
    this.navCtrl.back();
  }

  goTo() {
    this.navCtrl.navigateRoot('/novopaciente');
  }


  ionViewDidEnter() {



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




  //delete(form: NgForm)
  async cancelar(id)
  {

    console.log(id)
    //create form 
    
    //console.log("Delete:", params);


    const alert = await this.alertController.create({
      header: 'Excluindo Paciente...',
      message: 'Deseja excluir o paciente?',
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
          handler:async () => {
            console.log('Confirm Ok');
            console.log('aaa',id)
            this.delete(id);
            await alert.remove();
          }
        }
      ]
    });

    await alert.present();
    
    
  }




  //delete(form: NgForm)
  delete(id) {

    console.log(id)
    //create form 
    let myForm: FormGroup;
    // ------ NEW FORM WITH EDIT DATA
    myForm = this.formBuilder.group({
      id: id
    });


    let params = {
      'StatusCRUD': 'Delete',
      'formValues': myForm.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Delete:", params);
    this.Authorizer.QueryStoreProc('Executar', "spPatient", params).then(res => {
      let resultado: any = res[0];
      console.log(resultado)
      try {
        if (resultado.success) {
          this.alertService.presentAlert({ pTitle: 'Excluindo Paciente..', pSubtitle: '', pMessage: 'Paciente excluído com sucesso!' });
          this.MostraDados();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: 'Você não pode excluir este paciente!' });
          //this.navCtrl.navigateRoot('/login');
        }
      }
      catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Patient', pMessage: 'Nenhum usuário!' });
      }
    });
    this.MostraDados();

  }



  GravarDados(form: NgForm) {
    // paramStatus: Pesquisar, Gravar, Deletar
    form.value.Senha = Md5.hashStr(form.value.Senha);
    form.value.ReSenha = Md5.hashStr(form.value.ReSenha);
    let params = {
      'StatusCRUD': 'Gravar',
      'formValues': form.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("gravar:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spPatient', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {

          this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Paciente', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });
  }


  public a: any;
  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Pesquisar',
      'formValues': '',
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spPatient', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {
          this.photopath = JSON.parse(resultado.results)[0].photo;
          let path = this.env.API_HOST + '/ServiceProntoBook/';
          this.imageFileBase64 = path + JSON.parse(resultado.results)[0].photo;
          this.a = JSON.parse(resultado.results);
          for (let i = 0; i <= this.a.length; i++) {
            let b = this.a
            if (b[i].photo) {
              b[i].photo = path + this.a[i].photo;
              this.a = b;
            }
            else{
              b[i].photo ="assets/imgs/user.jpg";
              this.a = b;
            }
          }



          //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Paciente', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
       // this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Paciente', pMessage: 'Nenhum usuário!' });
      }
    });

  }




  expandFazenda() {
    this.ishidden = !this.ishidden;
  }



}

