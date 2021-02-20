import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from "../../../environments/environment.prod"

@Component({
  selector: 'app-conf',
  templateUrl: './conf.page.html',
  styleUrls: ['./conf.page.scss'],
})
export class confPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
