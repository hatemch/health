import {Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {CadastroDomiciliar} from "../../models/CadastroDomiciliar";
import {ActivatedRoute, Router} from "@angular/router";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-cadastro-domiciliar-tabs',
    templateUrl: './cadastro-domiciliar-tabs.page.html',
    styleUrls: ['./cadastro-domiciliar-tabs.page.scss'],
})
export class CadastroDomiciliarTabsPage implements OnInit {

    @ViewChild('tabs') tabs: IonTabs;
    public subtitle = 'Cadastro Domiciliar e Territorial ';
    //     //public tabs: any = 1;
    public model: CadastroDomiciliar = new CadastroDomiciliar();
    public showOptions = false;
    public showCadastroDomTab: boolean = false;
    public disabledCadastroDomTab1: boolean = false;
    public disabledCadastroDomTab2: boolean = false;


    constructor(private navCtrl: NavController,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private storage: Storage) {

    }

    ionViewDidEnter() {
        // Disparado quando o roteamento de componentes terminou de ser animado.
        /* if (!this.Authorizer.HashKey) {
           this.navCtrl.navigateRoot('/login');
         } else {
            this.getTab(this.tabs);
         }*/
    }

    ionViewWillEnter() {
        this.storage.get('codigoCadastroDom').then(value => {
            (value !== '') ? this.showCadastroDomTab = true : this.showCadastroDomTab = false;
            (value !== '') ? this.showOptions = true : this.showOptions = false;
            this.model.codigo = value;
        });
    }

    ngOnInit() {

    }

    goBack() {
        const selectedTab = this.tabs.getSelected();
        if (selectedTab === 'cadastro-domiciliar-form') {
            this.router.navigate(['/cadastro-domiciliar']);
        } else if (selectedTab === 'cadastro-domiciliar-familias') {
            if (this.model.codigo !== 0) {
                this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-form', this.model.codigo]);
            } else {
                this.router.navigate(['/cadastro-domiciliar']);
            }
        } else {
            this.navCtrl.back();
        }
    }

    setCurrentTab() {
        const selectedTab = this.tabs.getSelected();
        console.log(selectedTab);
        if (selectedTab === 'cadastro-domiciliar-form') {
            if (this.model.codigo !== 0) {
                this.showOptions = true;
            }
            this.disabledCadastroDomTab1 = true;
            this.disabledCadastroDomTab2 = false;
        } else if (selectedTab === 'cadastro-domiciliar-familias') {
            if (this.model.codigo !== 0) {
                this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-familias', this.model.codigo]);
            } else {
                this.router.navigate(['/cadastro-domiciliar']);
            }
            this.showOptions = false;
            this.disabledCadastroDomTab1 = false;
            this.disabledCadastroDomTab2 = true;
        }
    }

    goGalleries() {
        this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-foto', this.model.codigo]);
    }

    goAssinatura() {
        this.router.navigate(['/cadastro-domiciliar-tabs/cadastro-domiciliar-assinatura', this.model.codigo]);
    }


}
