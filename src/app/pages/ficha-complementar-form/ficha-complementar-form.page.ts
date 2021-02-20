import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-complementar-form',
  templateUrl: './ficha-complementar-form.page.html',
  styleUrls: ['./ficha-complementar-form.page.scss'],
})
export class FichaComplementarFormPage implements OnInit {
  step: number;
  resultado: any;
  resultado_list = [];

  constructor() { }

  ngOnInit() {
    this.step = 0 ;

  }

  setStep(number: number) {
    this.step = number;
  }

  changeSelect(list_option: string, $event: CustomEvent) {

  }
}
