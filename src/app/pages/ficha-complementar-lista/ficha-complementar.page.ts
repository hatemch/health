import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-ficha-complementar',
  templateUrl: './ficha-complementar.page.html',
  styleUrls: ['./ficha-complementar.page.scss'],
})
export class FichaComplementarPage implements OnInit {
  collectionDomiciliar: any;
  subtitle: any;
  CodigoUsuario: any;

  constructor(
      private navCtrl: NavController,
      private Authorizer: AuthService,) { }

  ngOnInit() {
    this.CodigoUsuario = this.Authorizer.CodigoUsuarioSistema;
    this.subtitle = "Ficha Complementar";
    this.collectionDomiciliar = [];
  }

  goBack() {

  }

  newFichaComplementar(update: string, item: any) {
    this.navCtrl.navigateRoot('/ficha-complementar-form');
  }

  delete(item: any) {

  }

  doRefresh($event: MouseEvent) {

  }
}
