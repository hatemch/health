
import { Component, OnInit } from '@angular/core';
import { NavController , Platform } from '@ionic/angular';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.page.html',
  styleUrls: ['./exames.page.scss'],
})
export class ExamesPage implements OnInit {


  constructor(
    private navCtrl: NavController,
    private platform: Platform,
   
    ) { }

  

  goBack() {
    this.navCtrl.back();
  }



  ngOnInit() {
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
    
  }

  goToFisico(){
    this.navCtrl.navigateRoot('/consultfisico');
    }

  goToSangue(){
    this.navCtrl.navigateRoot('/consultsangue');
  }
}
