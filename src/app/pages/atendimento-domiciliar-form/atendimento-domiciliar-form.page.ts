import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-atendimento-domiciliar-form',
  templateUrl: './atendimento-domiciliar-form.page.html',
  styleUrls: ['./atendimento-domiciliar-form.page.scss'],
})
export class AtendimentoDomiciliarFormPage implements OnInit {

  
  uploadPic ;
  
  public subtitle = 'Atendimento Domiciliar';
  constructor(public navCtrl: NavController) { }
  
  ngOnInit() {
    this.uploadPic = false;
  }

  goBack(){
    this.navCtrl.back();
  }
  
  goUploadPic(){
    console.log("we are here !!");
    this.navCtrl.navigateRoot('/atendimento-domiciliar-list-foto');
  }
}

