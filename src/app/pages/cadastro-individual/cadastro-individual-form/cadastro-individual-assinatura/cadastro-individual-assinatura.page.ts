import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input} from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import {AlertController, ModalController, NavController } from "@ionic/angular";
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { AuthService } from 'src/app/services/auth.service';
import {NgForm} from "@angular/forms";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import {ActivatedRoute, Router} from "@angular/router";
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {CadastroIndividualFoto} from "../../../../models/CadastroIndividualFoto";
import {FotoPage} from "../../../foto/foto.page";


@Component({
  selector: 'app-cadastro-individual-assinatura',
  templateUrl: './cadastro-individual-assinatura.page.html',
  styleUrls: ['./cadastro-individual-assinatura.page.scss'],
})
export class CadastroIndividualAssinaturaPage implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  @Input() assinatura;

  public AppName: string = environment.AppName;
  public subtitle = 'Cadastro Individual';
  isDrawing = false;
  public flagForm: boolean = false;
  public tipo_assinatura;
  public Assinatura: any;
  private podesalvar: boolean;
  private salvou: boolean;

  public model: CadastroIndividualFoto = new CadastroIndividualFoto();
  public collectionFilter: CadastroIndividualFoto[];
  public collection: CadastroIndividualFoto[];
  public fotosAssinatura: Array<CadastroIndividualFoto> = [];


  public cadastroIndividual: any;

  public collectionTipo: any = [
    { id: 'profissional', nome: 'Profissional' },
    { id: 'cidadao', nome: 'Cidadão' },
    { id: 'termo recusa', nome: 'Termo de recusa' }
  ];

  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(private navCtrl: NavController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private alertService: AlertService,
              private Authorizer: AuthService,
              private env: EnvService,
              public storage: Storage,
              private router: Router,
              public activatedRoute: ActivatedRoute) { }


  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.
    if (!this.Authorizer.HashKey) {
      this.navCtrl.navigateRoot('/login');
    } else {
      this.podesalvar = false;
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      console.log('passed value',res);
      this.model.tipo ='2';
      this.model.cadastro_individual = res.codigo;
      //Online
      this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'READ', { cadastro_individual: this.model.cadastro_individual, tipo: this.model.tipo});
    });
    this.podesalvar = false;
  }

  /**
   * Autor: Lina Jimenez
   * Data: 04/12/2019
   * @param procedure Nome da procedura armazanada no banco de dados
   * @param params JSON do parametros precisados pelo procedure
   * @param next Callback executado depois de executar a request
   */
  private sendRequest(
      procedure: string,
      params: { StatusCRUD: string; formValues: any; },
      next: any) {
    if (typeof this.Authorizer.HashKey !== 'undefined') {
      /*if (
          ((params.StatusCRUD === 'READ') && (this.permissoes.Pesquisar > 0) ||
              (params.StatusCRUD === 'DELETE') && (this.permissoes.Pesquisar > 0))
      ) {*/
      const _params = {
        StatusCRUD: params.StatusCRUD,
        formValues: params.formValues,
        CodigoUsuarioSistema: this.Authorizer.CodigoUsuarioSistema, // Por defeito sempre está este valor
        Hashkey: this.Authorizer.HashKey // Por defeito sempre está este valor
      }

      this.Authorizer.QueryStoreProc('ExecutarPost', procedure, _params).then(res => {
        const resultado: any = res[0];
        try {
          if (resultado.success) {
            next(resultado);
            if( resultado.message !== 'tem'){
              this.alertService.showLoader(resultado.message, 1000);
            }
          } else {
            this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.subtitle, pMessage: resultado.message });
            this.navCtrl.back();
          }
        } catch (err) {
          this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.subtitle, pMessage: 'Erro ao fazer a petição' });
        }
      });
      /*} else {
        this.alertService.presentAlert({
          pTitle: 'SEM PERMISSÃO', pSubtitle: this.subtitle, pMessage: 'Você não tem permissão para esta ação'
        });
      }*/
    } else {
      this.goBack();
    }
  }

  CRUDCadastroIndividualFotos(storeProcedure: string, statusCRUD: string, formValues: any) {
    this.sendRequest(storeProcedure, {
      StatusCRUD: statusCRUD,
      formValues: formValues
    }, (resultado) => {
      switch (statusCRUD) {
        case 'CREATE':
          console.log('was created', resultado);
          let temtipoassinatura = JSON.parse(atob(resultado.results))[0];

          if ( temtipoassinatura.tem === 0) {
            this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'READ', {
              cadastro_individual: this.model.cadastro_individual,
              tipo: this.model.tipo
            });
          } else {
            const alert = document.createElement('ion-alert');
            alert.header = 'Aviso!';
            alert.message = `Já existe uma assinatura para o tipo selecionado. Deseja substituir?`;
            alert.buttons = [
              {
                text: 'Não',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Sim',
                handler: () => {
                  this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'UPDATE', {
                    cadastro_individual: this.model.cadastro_individual,
                    codigo: temtipoassinatura.codigo,
                    foto_url:this.model.foto_url
                  });

                }
              }
            ];

            document.body.appendChild(alert);
            return alert.present();
          }
          break;
        case 'UPDATE':
          const items = JSON.parse(atob(resultado.results))[0];
          this.collectionFilter.forEach((item, index) => {
            if (item.codigo === items.codigo ) {
              this.collectionFilter[index] = JSON.parse(atob(resultado.results))[0];
            }
          });
          this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'READ', {
            cadastro_individual: this.model.cadastro_individual,
            tipo: this.model.tipo
          });
          break;
        case 'READ':
          this.collectionFilter = (JSON.parse(atob(resultado.results)));
          for (let foto of this.collectionFilter){
            foto.foto_url = this.env.API_NAME + foto.foto_url;
            switch(foto.tipo_assinatura){
              case 'profissional':
                foto.tipo_assinatura = 'Profissional';
                break;
              case 'cidadao':
                foto.tipo_assinatura = 'Cidadão';
                break;
              case 'termo recusa':
                foto.tipo_assinatura = 'Termo de recusa';
                break;
              default:
                break;
            }
          }
          break;
        case 'DELETE':

          break;
        default:
          // code block
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  newAsignatura(){
    this.flagForm = true;
  }

  salvar() {
    this.model.tipo_assinatura = this.tipo_assinatura.id;
    if (this.podesalvar == false) return;
    this.flagForm = false;
    this.Assinatura = this.signaturePad.toDataURL();
    console.log( 'signatured pad',this.Assinatura);
    const file = this.dataURLtoFile(this.Assinatura,'assignature.png');
    console.log(file);
    this.readFile(file);
    this.signaturePad.clear();
  }


  salvarImagem(formData : FormData) {
    this.Authorizer.QueryStoreImagem('SalvarImagem', '', this.env.IMAGE_PRODUCT, formData).then(res => {
      let resultado: any = res[0];
      if (resultado.success) {
        // resultado.results // This is the complete path. Ejemplo: ""D:/web/ServiceSaude/uploads/imagems/fotos/lxe0mwqxjxx.jpg"
        let imagepath = res[0].results;
        this.model.tipo = '2'; // for 1 because is foto 2 is tipo asinatura
        this.model.foto_url = imagepath;
        this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'CREATE', this.model);
      } else {
        this.alertService.showLoader(res[0].message, 2000);
      }
    });
  }

  showAlert(titulo: string, conteudo) {
    this.alertService.presentAlert({
      pTitle: "Atenção",
      pSubtitle: titulo,
      pMessage: conteudo,
    });
  }
  getSair() {
    let dat = { salvou: this.salvou };
    this.modalCtrl.dismiss(dat);
  }

  drawComplete() {
    this.isDrawing = false;
    this.podesalvar = true;
  }

  drawStart() {
    this.isDrawing = true;
  }
  limpar(){
    this.podesalvar = false;
    this.signaturePad.clear();
  }

  changeSelect(item) {
    console.log(item);
    this.tipo_assinatura = item;
  }

  private encripta(valor: string): string {
    let retorno: string;
    let stexto: string;
    retorno = "";
    try {
      stexto = valor.trim();
    } catch (err) {
      stexto = valor;
    }
    if (stexto == null) stexto = "";
    if (stexto == "") return stexto;
    while (true) {
      let letra: string;
      let nnumero: number;
      let snumero: string;
      if (stexto.length > 1) letra = stexto.substring(0, 1);
      else letra = stexto;

      nnumero = letra.toString().charCodeAt(0);
      nnumero += 166;
      snumero = nnumero.toString();
      if (snumero.length < 3) snumero = "0" + snumero;
      if (snumero.length < 3) snumero = "0" + snumero;

      retorno += snumero;
      if (stexto.length > 1) stexto = stexto.substring(1);
      else stexto = "";
      if (stexto == "") break;
    }
    return retorno;
  }

  // convert a image Base64 --Add by Viviana
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formImagem = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formImagem.append("nome", '');
      formImagem.append("ruta", this.env.IMAGE_PRODUCT);
      formImagem.append("imagem", imgBlob, file.name);
      this.salvarImagem(formImagem);
    };
    reader.readAsArrayBuffer(file);
  }
  async mostrarImagen(item) {
    const modal = await this.modalCtrl
        .create({
          component: FotoPage ,
          componentProps: { foto: item },
        });
    return await modal.present();
  }

  delete(item){
    const alert = document.createElement('ion-alert');
    alert.header = 'Excluíndo!';
    alert.message = `Deseja excluir a Assinatura`;
    alert.buttons = [
      {
        text: 'Desistir',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Confirmar',
        handler: () => {
          this.CRUDCadastroIndividualFotos('spCRUDCadastroIndividualFoto', 'DELETE', {codigo: item.codigo, cadastro_individual: item.cadastro_individual});
          this.collectionFilter.forEach(function (item, index, collection) {
            if (item.codigo == this) {
              collection.splice(index, 1);
            }
          }, item.codigo);
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }
}
