import { Component, OnInit,ViewChild  } from '@angular/core';

import { NavController,Platform } from '@ionic/angular';
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  public AppName: string = environment.AppName;
  public subtitle = 'Grupos';

  constructor( private navCtrl: NavController,
    public platform :Platform,
    ) { }
  
    ngOnInit() {
      this.platform.backButton.subscribe(()=>{
        this.navCtrl.navigateRoot('/menu/options/tabs/main');
      })
      
    }
  
    goBack() {
      this.navCtrl.back();
    }
  

}
