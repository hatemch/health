import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { NavController, Events, ModalController, Platform } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { EnvService } from 'src/app/services/env.service';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-incluirhosp',
  templateUrl: './incluirhosp.page.html',
  styleUrls: ['./incluirhosp.page.scss'],
})
export class IncluirhospPage implements OnInit {
  //@ViewChild("Nome") iNome : ElementRef;
  @ViewChild('Nome') iNome;
  private DECIMAL_SEPARATOR=".";
  private GROUP_SEPARATOR=",";
  private pureResult: any;
  private maskedId: any;
  private val: any;
  private v: any;

  public Codigo: any;
  public Nome: String;
  public Endereco     : String;
  public CodigoCidade : String;
  public Telefone    : String;
  public Email    : String;
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
    public platform :Platform,

  ) { }

  ngOnInit() {
    console.log("Init");
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/hospitais');
    })
    
    
  }

  ionViewWillEnter() {
    // Disparado quando o roteamento de componentes está prestes a se animar.    
    console.log("ionViewWillEnter");
    //this.getUfs();
  }


  ionViewDidEnter() {
    // Disparado quando o roteamento de componentes terminou de ser animado.        
    console.log("ionViewDidEnter");
    this.getUfs();
    
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

   
    let params = {
      'StatusCRUD': 'Criacao',
      'formValues': form.value,
      'CodigoUsuarioSistema': 0,
      'Hashkey': sessionStorage.getItem("SessionHashkey")
    };

    console.log("Register:", params);
    this.Authorizer.QueryStoreProc('Executar', 'spHospital', params).then(res => {
      let resultado: any = res[0];
      console.log(resultado);
      try {
        
        if (resultado.success) {
          
          this.alertService.presentAlert({ pTitle: 'Salvando Hospital...', pSubtitle: '', pMessage: 'Operaração realizada com sucesso!' });
          this.alertService.showLoader(resultado.message, 1000);
          this.goBack();
        }
      } catch (err) {
        this.alertService.presentAlert({ pTitle: 'Atenção', pSubtitle: 'Erro', pMessage: 'Verifique seus dados!' });
      }
    });
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
        this.ufs =JSON.parse(resultado.results);
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
public selectedUf :any;
// ------------------------UFS ENDS-----------------------------


getCidadeCodigo(form) {
  /*     let Sig = form.value.Nome_municipio;
      form.value.Nome_municipio = ""; */

  console.log('form', form.value)

  this.selectedUf = this.ufs.filter((uf) => {
    return uf.Sigla == form.value.UF;
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


  

}