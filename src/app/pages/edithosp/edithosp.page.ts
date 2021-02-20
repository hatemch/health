
import { Component, ViewChild, OnInit, ChangeDetectorRef, Input } from '@angular/core';
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
  selector: 'app-edithosp',
  templateUrl: './edithosp.page.html',
  styleUrls: ['./edithosp.page.scss'],
})
export class EdithospPage implements OnInit {
  @ViewChild('Nome') iNome;

  public Nome: String;
  public Endereco: String;
  public CodigoCidade: String;
  public Telefone: String;
  public Email: String;
  public Codigopostal: String;
  public UF: any;
  public NCidade: any;
  public UFs: any[] = [
    {
      id: 1,
      UF: 'RO'
    },
    {
      id: 2,
      UF: 'AC'
    },
    {
      id: 3,
      UF: 'AM'
    },
    {
      id: 4,
      UF: 'RR'
    },
    {
      id: 5,
      UF: 'PA'
    },
    {
      id: 6,
      UF: 'AP'
    },
    {
      id: 7,
      UF: 'TO'
    },
    {
      id: 8,
      UF: 'MA'
    },
    {
      id: 9,
      UF: 'PI'
    },
    {
      id: 10,
      UF: 'CE'
    },
    {
      id: 11,
      UF: 'RN'
    },
    {
      id: 12,
      UF: 'PB'
    },
    {
      id: 12,
      UF: 'PE'
    },
    {
      id: 13,
      UF: 'AL'
    },
    {
      id: 14,
      UF: 'SE'
    },
    {
      id: 15,
      UF: 'BA'
    },
    {
      id: 16,
      UF: 'MG'
    },
    {
      id: 17,
      UF: 'ES'
    },
    {
      id: 18,
      UF: 'RJ'
    },
    {
      id: 19,
      UF: 'SP'
    },
    {
      id: 20,
      UF: 'PR'
    },
    {
      id: 21,
      UF: 'SC'
    },
    {
      id: 22,
      UF: 'RS'
    },
    {
      id: 23,
      UF: 'MS'
    },
    {
      id: 24,
      UF: 'MT'
    },
    {
      id: 25,
      UF: 'GO'
    },
    {
      id: 26,
      UF: 'DF'
    }

  ];


  public NCidades: any[] = [
    {
      id: 1,
      NCidade: 'Rondônia'
    },
    {
      id: 2,
      NCidade: 'Acre'
    },
    {
      id: 3,
      NCidade: 'Amazonas'
    },
    {
      id: 4,
      NCidade: 'Roraima'
    },
    {
      id: 5,
      NCidade: 'Pará'
    },
    {
      id: 6,
      NCidade: 'Amapá'
    },
    {
      id: 7,
      NCidade: 'Tocantins'
    },
    {
      id: 8,
      NCidade: 'Maranhão'
    },
    {
      id: 9,
      NCidade: 'Piauí'
    },
    {
      id: 10,
      NCidade: 'Ceará'
    },
    {
      id: 11,
      NCidade: 'Rio Grande do Norte'
    },
    {
      id: 12,
      NCidade: 'Paraíba'
    },
    {
      id: 12,
      NCidade: 'Pernambuco'
    },
    {
      id: 13,
      NCidade: 'Alagoas'
    },
    {
      id: 14,
      NCidade: 'Sergipe'
    },
    {
      id: 15,
      NCidade: 'Bahia'
    },
    {
      id: 16,
      NCidade: 'Minas Gerais'
    },
    {
      id: 17,
      NCidade: 'Espírito Santo'
    },
    {
      id: 18,
      NCidade: 'Rio de Janeiro'
    },
    {
      id: 19,
      NCidade: 'São Paulo'
    },
    {
      id: 20,
      NCidade: 'Paraná'
    },
    {
      id: 21,
      NCidade: 'Santa Catarina'
    },
    {
      id: 22,
      NCidade: 'Rio Grande do Sul'
    },
    {
      id: 23,
      NCidade: 'Mato Grosso do Sul'
    },
    {
      id: 24,
      NCidade: 'Mato Grosso'
    },
    {
      id: 25,
      NCidade: 'Goiás'
    },
    {
      id: 26,
      NCidade: 'Distrito Federal'
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
    this.getUfs();
    this.MostraDados();
    console.log("ionViewDidEnter");
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/hospitais');
    })
    
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    //console.log("ionViewWillEnter");
    //this.CRUDActionAPIForm('Pesquisando', null);  
    
  }

  ionViewDidEnter() {
    
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    this.MostraDados();
    console.log("ionViewDidEnter");
    /*
    setTimeout(() => {
      this.iNome.setFocus();
    },150);
    */
   this.selectedUf =  sessionStorage.getItem("currentUF")
   console.log("selectedUf: ", this.selectedUf)
    

    this.getCidadeCodigoEdit(this.selectedUf);
    
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

  MostraDados() {
    // paramStatus: Pesquisando, Editando, Deletando     
    let i = sessionStorage.getItem('codigoH')
    //   i    =parseInt(atob(i)); 
    let params = {
      'StatusCRUD': 'Pesquisar1',
      'formValues': parseInt(atob(i)),
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };
    console.log('params', params)
    this.Authorizer.QueryStoreProc('Executar', 'spHospital', params).then(res => {
      let resultado: any = res[0];
      console.log("resultado", resultado)
      try {
        if (resultado.success) {

          this.Nome = JSON.parse(resultado.results)[0].name;
          this.Endereco = JSON.parse(resultado.results)[0].address;
          //this.NCidades  = JSON.parse(resultado.results)[0].city;
          //this.UFs  = JSON.parse(resultado.results)[0].UF;
          this.Codigopostal = JSON.parse(resultado.results)[0].zip;
          this.Telefone = JSON.parse(resultado.results)[0].phone;
          this.Email = JSON.parse(resultado.results)[0].email;
          let U: any = JSON.parse(resultado.results)[0].UF;
          if (typeof (U) == 'undefined')
            U = '';
          if (U == null)
            U = '';
          if (U != '')
            this.UF = U;

          let nc: any = JSON.parse(resultado.results)[0].city;
          if (typeof (nc) == 'undefined')
            nc = '';
          if (nc == null)
            nc = '';
          if (nc != '')
            this.NCidade = nc;


          //this.alertService.showLoader(resultado.message, 1000);
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Editar hospital', pMessage: 'Nenhum usuário!' });
      }
    });

  }



  // ------------------------UFS Begins-----------------------------
  public ufs;
  public ufs2;

  getUfs() {

    let dataUfs = {
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey"),
      'StatusCRUD': 'Pesquisaruf'
    };

    this.Authorizer.QueryStoreProc('Executar', 'spHospital', dataUfs).then(res => {
      let resultado: any = res[0];

      try {
        if (resultado.success) {
          this.ufs = JSON.parse(resultado.results);
          console.log("Ufs: ", this.ufs)
          this.ufs2 = JSON.parse(resultado.results);
          //console.log("Ufs2: ", this.ufs2)

          for (let i = 0; i < this.ufs2.length; i++) {
            this.ufs2[i] = this.ufs[i].Sigla;
          }
          //console.log("ufs2: ", this.ufs2)
          //console.log("Ufs: ", this.ufs)
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.AppName, pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.AppName, pMessage: resultado.message });
        //this.navCtrl.navigateRoot('/login');
      }
    });
  }

  //
  public selectedUf: any;
  // ------------------------UFS ENDS-----------------------------


  getCidadeCodigo(form) {
    /*     let Sig = form.value.Nome_municipio;
        form.value.Nome_municipio = ""; */
    if (this.ufs!=null) {
      console.log('form', form.value)

      this.selectedUf = this.ufs.filter((uf) => {
        return uf.Sigla == form.value.UF;
      });
      console.log('selectedUf: ', this.selectedUf)
      //console.log('selectedUf: ', this.selectedUf[0].CodigoBaseUF)
      this.cidades2 = [];
      this.getCidades();
    }

  }

  getCidadeCodigoEdit(ufEdit) {
    /*     let Sig = form.value.Nome_municipio;
        form.value.Nome_municipio = ""; */

    console.log('form', ufEdit)


    this.selectedUf = this.ufs.filter((uf) => {
      return uf.Sigla == ufEdit;
    });
    console.log('selectedUf: ', this.selectedUf)
    //console.log('selectedUf: ', this.selectedUf[0].CodigoBaseUF)
    this.cidades2 = [];
    this.getCidades();
  }


  public cidades;
  public cidades2;

  // ------------------------Cidades Begins-----------------------------

  getCidades() {

    let dataCidades = {
      'CodigoUsuarioSistema': '',
      'Hashkey': '',
      'StatusCRUD': 'PesquisarCidades',
      'formValues': this.selectedUf[0].CodigoBaseUF
    };

    console.log("dataCidades: ", dataCidades)



    this.Authorizer.QueryStoreProc('Executar', 'spHospital', dataCidades).then(res => {
      let resultado: any = res[0];

      try {
        if (resultado.success) {
          this.cidades = JSON.parse(resultado.results);
          this.cidades2 = JSON.parse(resultado.results);
          console.log("cidades: ", this.cidades)
          for (let i = 0; i < this.cidades2.length; i++) {
            this.cidades2[i] = this.cidades[i].Nome;
          }
        }
        else {
          //this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: this.AppName, pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        //this.alertService.presentAlert({ pTitle: this.AppName, pSubtitle: this.AppName, pMessage: resultado.message });
        //this.navCtrl.navigateRoot('/login');
      }
    });

  }

  // ------------------------Cidades ENDS-----------------------------






  atualizar(form: NgForm) {
    // paramStatus: Pesquisando, Editando, Deletando      
    let params = {
      'StatusCRUD': 'Gravar',
      'formValues': form.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("gravar:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spHospital', params).then(res => {
      let resultado: any = res[0];
      try {
        if (resultado.success) {

          this.alertService.showLoader(resultado.message, 1000);
          this.goBack();
        }
        else {
          this.alertService.presentAlert({ pTitle: 'ATENÇÃO', pSubtitle: 'Erro', pMessage: resultado.message });
          //this.navCtrl.navigateRoot('/login');
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: this.env.AppName, pSubtitle: 'Editar hospital', pMessage: 'Nenhum usuário!' });
      }
    });


  }


}




