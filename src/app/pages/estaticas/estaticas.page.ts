import { Component, OnInit,ViewChild  } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController, Platform , Events, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-estaticas',
  templateUrl: './estaticas.page.html',
  styleUrls: ['./estaticas.page.scss'],
})
export class EstaticasPage implements OnInit {
  @ViewChild('barChart') barChart;
  constructor(

    private navCtrl: NavController,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.createBarChart();
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateRoot('/menu/options/tabs/main');
    })
  }
  

  goBack() {
    this.navCtrl.back();
  }


  bars: any;
  colorArray: any;

public hrzBarChart2 : Chart;
public hrzBars : Chart;


createBarChart() {
  this.bars = new Chart(this.barChart.nativeElement, {
    type: 'bar',
    data: {
      labels: ['Doutor1', 'Doutor2', 'Doutor3', 'Doutor4', 'Doutor5'],
      datasets: [{
        label: 'Paciente',
        data: [3, 4, 2, 7, 1],
        backgroundColor: '#589191', // array should have same number of elements as number of dataset
        borderColor: '#589191',// array should have same number of elements as number of dataset
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

}
