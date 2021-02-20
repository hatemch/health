import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  AppName = 'SAUDE';
  AppNameSigla = 'SAUDE';
  API_HOST = 'http://191.252.153.115'; //'http://localhost';
  API_URL = '/ServiceSaude/api';
  API_HOST_DEBUG = 'http://localhost:60313';
  API_URL_DEBUG = '/api';
  PIC_URL = '/ServiceSaude/';
  DEFINE_ENV = 'Dev';
  IMAGE_PRODUCT = 'uploads/imagems/fotos/';

  API_NAME = this.API_HOST + this.PIC_URL;

  constructor() { }

  /**
   * Funcao para encontrar objetos em uma coleccao de objetos
   * Autor: Lina Jimenez
   * Data: 03/12/2019
   * Exemplo: collection = _findWhere(collection, { key1: val1, keyN: valN })
   * @param collection Array no qual vai ser procurado algum item
   * @param arg objeto com os valores de pesquisa
   */
  _findWhere(collection: any[], arg: object | null) {

    function callback(currentValue, index, array) {
      let flag: boolean = true

      for (const key in arg) {
        if (flag) {
          if (currentValue.hasOwnProperty(key)) {
            if (currentValue[key] === null) {
              currentValue[key] = '';
            }

            if (Number(currentValue[key])) {
              currentValue[key] = currentValue[key].toString();
            }
            if (Number(arg[key])) {
              arg[key] = arg[key].toString();
            }
            flag = (currentValue[key].toLowerCase().indexOf(arg[key].toLowerCase()) > -1) ? true : false;

          }
        }
      }

      if (flag) {
        return currentValue;
      }
    }

    return collection.filter(callback, arg);

  }
}
