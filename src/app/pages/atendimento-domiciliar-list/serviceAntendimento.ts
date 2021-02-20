import {NavController} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';

export class ServiceAntendimento {
    static formatarData(strData: string) {
        const datahora = strData.split("T");
        if (datahora.length === 2) {
            const data = datahora[0];
            const hora = datahora[1];
            const min = hora.split(".");
            const diaMesAno = data.split("-");
            console.log(datahora);
            return (
                diaMesAno[1] + "/" + diaMesAno[2] + "/" + diaMesAno[0] + " " + min[0]
            );
        } else {
            return strData;
        }
    }

    static userId : any ;
    static id: any;

    //methode to back to layout
    static goBack(navCtrl) {
        navCtrl.back();
    }
}
