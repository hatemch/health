import {Injectable} from '@angular/core';
import {Platform, NavController} from '@ionic/angular'
//import { Network }      from '@ionic-native/network';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {AlertService} from 'src/app/services/alert.service';
import {EnvService} from './env.service';
//import { tap }          from 'rxjs/operators';
//import { User }         from '../models/user';
import {NgForm} from '@angular/forms';
import {environment} from 'src/environments/environment.prod';
//import { Base64 } from '@ionic-native/base64/ngx';
//import { Observable, throwError } from 'rxjs';
import {Storage} from '@ionic/storage'

@Injectable({
    providedIn: 'root'
})


export class AuthService {
    private headers = new Headers();
    isLoggedIn = false;
    private coletionsData: any;

    public CodigoUsuarioSuporte: string;
    public CodigoUsuarioSistema: string = sessionStorage.getItem('codigoUsuario') ? sessionStorage.getItem('codigoUsuario') : "";
    public NomeUsuarioSistema: string;
    public CodigoMenuSistemaPai: number = 22;
    
    public HashKey: string = sessionStorage.getItem('SessionHashkey') ? sessionStorage.getItem('SessionHashkey') : "";

    public Filter: string;

    public API_HOST: string = this.env.API_HOST;
    public API_URL: string = this.env.API_URL;

    // 13/12/2019, Lina
    // Permissoes do usuário
    public permissoesUsuario: any = [];

    constructor(
        private http: HttpClient,
        private platform: Platform,
        private env: EnvService,
        private alertService: AlertService,
        private db: Storage
    ) {
        this.headers.append('Content-Type', 'application/json; charset=utf-8');
        if (this.env.DEFINE_ENV === 'Debug') {
            this.API_HOST = env.API_HOST_DEBUG;
            this.API_URL = env.API_URL_DEBUG;
        }
    }

    /**
     * Encodes multi-byte Unicode string into utf-8 multiple single-byte characters
     * (BMP / basic multilingual plane only).
     *
     * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars.
     *
     * Can be achieved in JavaScript by unescape(encodeURIComponent(str)),
     * but this approach may be useful in other languages.
     *
     * @param   {string} unicodeString - Unicode string to be encoded as UTF-8.
     * @returns {string} UTF8-encoded string.
     */
    public utf8Encode(unicodeString) {
        if (typeof unicodeString != 'string') throw new TypeError('parameter ‘unicodeString’ is not a string');
        const utf8String = unicodeString.replace(
            /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
            function (c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
            }
        ).replace(
            /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
            function (c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f);
            }
        );
        return utf8String;
    }

    /**
     *  Decodes utf-8 encoded string back into multi-byte Unicode characters.
     *
     * Can be achieved JavaScript by decodeURIComponent(escape(str)),
     * but this approach may be useful in other languages.
     *
     * @param {string} utf8String - UTF-8 string to be decoded back to Unicode.
     * @returns {string} Decoded Unicode string.
     */
    public utf8Decode(utf8String) {
        if (typeof utf8String != 'string') throw new TypeError('parameter ‘utf8String’ is not a string');
        // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
        const unicodeString = utf8String.replace(
            /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
            function (c) {  // (note parentheses for precedence)
                var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f);
                return String.fromCharCode(cc);
            }
        ).replace(
            /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
            function (c) {  // (note parentheses for precedence)
                var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
                return String.fromCharCode(cc);
            }
        );
        return unicodeString;
    }

    // função para verificar conexão de Host Engine API
    EngineStatusConection = function (host: string) {
        var started = new Date().getTime();
        var url = host
        fetch(url).then(response => {
                if (response.status === 200) {
                    return response.statusText;
                } else {
                    throw new Error('Algo deu errado no servidor da EngineAPI!');
                }
            }
        ).then(response => {
                console.debug(response);
                sessionStorage.setItem('EngineStatusConection', "ON");
                return true;
            }
        ).catch(error => {
                //console.error(error);
                sessionStorage.setItem('EngineStatusConection', 'OFF');
                return false;
            }
        );
    };

    Login = async function (form: NgForm) {
        // --------------------------------------------------------------------------------------------
        // Função Login
        // Criação / Atualização: 24/07/2019 as 15:35
        // Por Gilson DeLima
        // --------------------------------------------------------------------------------------------
        // this.alertService.showLoader("Processando... Aguarde por favor!!!");

        let ParamDataJson = btoa(JSON.stringify(form.value)); // encode string
        let strDataJson = atob(ParamDataJson);                // decode string
        let StoreProcName = 'spUsuarioAuthentication';
        // console.log(strDataJson);
        let ParamHashkey = sessionStorage.SessionHashkey;

        const paramUrlAPI = this.API_HOST + this.API_URL + '/authentication?';
        const paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson; // + "&Hashkey="+ParamHashkey;

        const EngineAPI = paramUrlAPI + paramsAPI;
        return new Promise((resolve, reject) => {
            this.coletionsData = this.http.get(EngineAPI);
            this.coletionsData.subscribe(
                data => {
                    if (data[0].success) {
                        this.HashKey = data[0].hashkey;
                        let resultado: any = atob(data[0].results);
                        this.CodigoUsuarioSistema = JSON.parse(resultado)[0].CodigoUsuario;
                        this.NomeUsuarioSistema = JSON.parse(resultado)[0].Nome;
                        this.permissoesUsuario = this.consultarPermisoes();
                        // sessionStorage.setItem('SessionUser', JSON.stringify(data[0].results));
                        sessionStorage.setItem('SessionUser', atob(data[0].results));
                        sessionStorage.setItem('SessionHashkey', data[0].hashkey);
                        sessionStorage.setItem('codigoUsuario', JSON.parse(resultado)[0].CodigoUsuario);
                        sessionStorage.setItem('SessionConection', '1');
                    } else {
                        sessionStorage.setItem('SessionConection', '0');
                        this.alertService.presentAlert({
                            pTitle: 'ATENÇÃO',
                            pSubtitle: 'Autendicação no Sistema',
                            pMessage: data[0].message
                        });
                    }
                    let ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
                    data[0].results = btoa(ResultsDecode);
                    resolve(data);
                },
                (error: any) => {
                    // tslint:disable-next-line:max-line-length
                    this.alertService.presentAlert({
                        pTitle: 'Atenção',
                        pSubtitle: 'Servidor Indisponível. Tente mais tarde!!!',
                        pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                    });
                }
            );
        });
    };

    QueryStoreProc = async function (MetodoNameAPI: string, StoreProcName: string, ParamsJson: any) {
        // --------------------------------------------------------------------------------------------
        // Função Gerenerica de consulta no Service API
        // Criação / Atualização: 29/07/2019 as 10:42
        // Por Gilson DeLima
        // --------------------------------------------------------------------------------------------
        // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
        // --------------------------------------------------------------------------------------------
        // this.alertService.showLoader("Processando... Aguarde por favor!!!");

        ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
        ParamsJson = ParamsJson.replace(/\\/g, '');
        console.log('json:', ParamsJson);
        const ParamDataJson = btoa(ParamsJson);


        //let strDataJson = atob(ParamDataJson);                // decode string
        //console.log(strDataJson);
        //ConsultaMenu
        const paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI;
        console.log("api:", paramUrlAPI);

        let data2 = {
            'StoreProcName': StoreProcName,
            'DataJson': ParamDataJson
        };
        console.log("data2:", data2);

        /*const EngineAPI = paramUrlAPI + paramsAPI
        console.log(EngineAPI)*/
        return new Promise(resolve => {
            this.coletionsData = this.http.post(paramUrlAPI, data2);
            this.coletionsData.subscribe(
                data => {
                    let ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
                    data[0].results = btoa(ResultsDecode);
                    resolve(data);
                },
                (error: any) => {
                    this.alertService.presentAlert({
                        pTitle: 'Atenção',
                        pSubtitle: 'Servidor ou Método Indisponível (' + StoreProcName + '). Tente mais tarde!!!',
                        pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                    });
                    resolve(error);
                }
            );
        });
    };

    QueryStoreProc1 = async function (opcao: string, variable: string, consultaJson: string) {
        // --------------------------------------------------------------------------------------------
        // Função Gerenerica de consulta no Service API
        // Criação / Atualização: 29/07/2019 as 10:42
        // Por Gilson DeLima
        // --------------------------------------------------------------------------------------------
        // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
        // --------------------------------------------------------------------------------------------
        // this.alertService.showLoader("Processando... Aguarde por favor!!!");

        let ParamDataJson = btoa(JSON.stringify(consultaJson)); // encode string
        let strDataJson = atob(ParamDataJson);                // decode string
        console.log(strDataJson);

        var a = strDataJson.substring(strDataJson.indexOf(':') + 2, strDataJson.indexOf('}') - 1)
        console.log(a)
        //ConsultaMenu
        console.log(ParamDataJson)
        const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + opcao + '?';
        let go = consultaJson;
        console.log('consultaJson', consultaJson)
        const paramsAPI = go;
        console.log(paramsAPI);

        const EngineAPI = paramUrlAPI + variable + '=' + paramsAPI
        console.log(EngineAPI)
        return new Promise(resolve => {
            this.coletionsData = this.http.get(EngineAPI);
            this.coletionsData.subscribe(data => {
                    resolve(data);
                    console.log(data);
                },
                (error: any) => {
                    this.alertService.presentAlert({
                        pTitle: 'Atenção',
                        pSubtitle: 'Servidor Indisponível. Tente mais tarde!!!',
                        pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                    });
                    // console.log("Error: ", error);
                }
            );
        });
    };
    QueryStoreProcPost = async function (MetodoNameAPI: string, StoreProcName: string, ParamsJson: any) {
        // --------------------------------------------------------------------------------------------    
        // Função Gerenerica de consulta no Service API
        // Criação / Atualização: 29/07/2019 as 10:42
        // Por Gilson DeLima
        // --------------------------------------------------------------------------------------------
        // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
        // --------------------------------------------------------------------------------------------
        // this.alertService.showLoader("Processando... Aguarde por favor!!!");
    
        let json: string = JSON.stringify(ParamsJson);
        json = this.encripta(json);
        // let ParamDataJson = btoa(JSON.stringify(ParamsJson)); // encode string 
        let ParamDataJson = btoa(json); // encode string 
    
        // ParamsJson =  this.utf8Encode(JSON.stringify(ParamsJson));
        // ParamsJson = ParamsJson.replace(/\\/g, '');
        // console.log('json:', ParamsJson);
        // const ParamDataJson = btoa(ParamsJson); // encode string
    
    
        // let strDataJson = atob(ParamDataJson);                // decode string
        // console.log((strDataJson);
        // ConsultaMenu
        /*
        let headers = new Headers(
        {
          'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        let data = JSON.stringify({
          StoreProcName:StoreProcName,
          DataJson: ParamDataJson
        });
        */
    
        const paramUrlAPI = this.API_HOST + this.API_URL + '/' + MetodoNameAPI;
        console.log("api:", paramUrlAPI)
        //const paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;
    
        //const EngineAPI = paramUrlAPI + paramsAPI;
    
        // let data2 = {
        //   'StoreProcName': StoreProcName,
        //   'DataJson': ParamDataJson
        // };
    
        const data2 = new FormData();
        data2.append('StoreProcName', StoreProcName);
        data2.append('DataJson', ParamDataJson);
    
        console.log("data2:", data2);
    
        //const EngineAPIDebug = this.env.API_HOST_DEBUG + this.env.API_URL_DEBUG + '/' + MetodoNameAPI + '?' + paramsAPI;
        // console.log(ParamDataJson)
        // console.log(EngineAPI);
    
        /*
        const EngineAPIDebug = this.env.API_HOST_DEBUG + this.env.API_URL_DEBUG + '/' + MetodoNameAPI + '?'+paramsAPI;        
        console.log(EngineAPIDebug)
        */
    
        // this.alertService.presentToast("Processando...");
    
    
        return new Promise(resolve => {
          this.coletionsData = this.http.post(paramUrlAPI, data2);
          this.coletionsData.subscribe(
            data => {
              let ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
              data[0].results = btoa(ResultsDecode);
              resolve(data);
            },
            (error: any) => {
              this.alertService.presentAlert({
                pTitle: 'Atenção',
                pSubtitle: 'Servidor ou Método Indisponível (' + StoreProcName + '). Tente mais tarde!!!',
                pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
              });
              resolve(error);
            }
          );
        });
      }
    Register = async function (form: NgForm) {
        // --------------------------------------------------------------------------------------------
        // Função Login
        // Criação / Atualização: 29/07/2019 as 10:42
        // Por Gilson DeLima
        // --------------------------------------------------------------------------------------------
        // this.alertService.showLoader("Processando... Aguarde por favor!!!");
        let json: string = JSON.stringify(form.value);
        json = this.encripta(json);

        let StoreProcName = "spRegister";
        let ParamDataJson = btoa(json); // encode string
        // let strDataJson = atob(ParamDataJson);                // decode string
        // console.log(strDataJson);

        const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/register?';
        const paramsAPI = "StoreProcName=" + StoreProcName + "&DataJson=" + ParamDataJson;

        const EngineAPI = paramUrlAPI + paramsAPI
        return new Promise(resolve => {
            this.coletionsData = this.http.get(EngineAPI);
            this.coletionsData.subscribe(data => {
                    resolve(data);
                    // console.log(data);
                },
                (error: any) => {
                    this.alertService.presentAlert({
                        pTitle: 'Atenção',
                        pSubtitle: 'Servidor Indisponível. Tente mais tarde!!!',
                        pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                    });
                    console.log('Error: ', error);
                }
            );
        });
    };

    /* Image Query */
    QueryStoreImagem = async function (
        MetodoNameAPI: String,
        nomeImagem: string,
        rutaSalvar: string,
        formImagem: FormData
    ) {
        //--------------------------------------------------------------------------------------------
        // Função para salvar IMAGE
        // Author: a clever, kind Peruvian guy.
        //--------------------------------------------------------------------------------------------

        const paramUrlAPI = this.env.API_HOST + this.env.API_URL + "/" + MetodoNameAPI;


        return new Promise((resolve) => {
            this.coletionsData = this.http.post(paramUrlAPI, formImagem);

            this.coletionsData.subscribe(
                (data) => {
                    resolve(data);
                },
                (error: any) => {
                    this.alertService.presentAlert({
                        pTitle: "Atenção",
                        pSubtitle: "Servidor ou Método Indisponível. Tente mais tarde!!!",
                        pMessage: "Status Error:" + error.status + " | " + error.statusText,
                    });
                    console.log("Error: ", error);
                }
            );
        });
    };
    QueryStoreImagemWebVersion = async function (MetodoNameAPI: String, nomeImagem: string, rutaSalvar: string, imagem: any) {
        //--------------------------------------------------------------------------------------------    
        // Função para salvar IMAGE          
        // Author: a clever, kind Peruvian guy.  
        //--------------------------------------------------------------------------------------------
    
        const paramUrlAPI = this.env.API_HOST + this.env.API_URL + '/' + MetodoNameAPI;
    
        const formImagem = new FormData();
        formImagem.append('nome', nomeImagem);
        formImagem.append('ruta', rutaSalvar);
        formImagem.append('imagem', imagem, imagem.name);
    
        return new Promise(resolve => {
          this.coletionsData = this.http.post(paramUrlAPI, formImagem);
    
          this.coletionsData.subscribe(
            data => {
              resolve(data);
            },
            (error: any) => {
              this.alertService.presentAlert({ pTitle: "Atenção", pSubtitle: "Servidor ou Método Indisponível. Tente mais tarde!!!", pMessage: "Status Error:" + error.status + " | " + error.statusText });
              console.log("Error: ", error);
            }
          );
        });
      }
    _failure_post2 = async function (method, ret, data) {
        return new Promise((resolve) => {
            this.http
                .post(`${this.env.API_HOST}${this.env.API_URL}/${method}`, data, JSON.stringify(ret))
                .subscribe(
                    (res) => {
                        resolve(res);
                        console.log(res)
                    },
                    (err) => resolve(err)
                );
        });
    };

    /* encripta function*/
    private encripta(valor: string): string {
        let retorno: string;
        let stexto: string;
        retorno = "";
        try {
            stexto = valor.trim();
        } catch (err) {
            stexto = valor;
        }
        if (stexto == null)
            stexto = "";
        if (stexto == "")
            return stexto;
        while (true) {
            let letra: string;
            let nnumero: number;
            let snumero: string;
            if (stexto.length > 1)
                letra = stexto.substring(0, 1);
            else
                letra = stexto;

            nnumero = letra.toString().charCodeAt(0);
            nnumero += 166;
            snumero = nnumero.toString();
            if (snumero.length < 3)
                snumero = "0" + snumero;
            if (snumero.length < 3)
                snumero = "0" + snumero;

            retorno += snumero;
            if (stexto.length > 1)
                stexto = stexto.substring(1);
            else
                stexto = "";
            if (stexto == "")
                break;
        }
        return retorno;
    }

    /////////////////////////////////////////////////////////////////////////

    QueryStoreProc2 = async function (MetodoNameAPI: string, StoreProcName: string, ParamsJson: any) {
        // --------------------------------------------------------------------------------------------
        // Função Gerenerica de consulta no Service API
        // Criação / Atualização: 29/07/2019 as 10:42
        // Por Gilson DeLima
        // --------------------------------------------------------------------------------------------
        // Params: opcao = ex: ConsultaGrupos, consultaJson = ex: paramsGrupo
        // --------------------------------------------------------------------------------------------
        // this.alertService.showLoader("Processando... Aguarde por favor!!!");

        ParamsJson = this.utf8Encode(JSON.stringify(ParamsJson));
        ParamsJson = ParamsJson.replace(/\\/g, '');
        console.log('json:', ParamsJson);
        const ParamDataJson = btoa(ParamsJson); // encode string

        const paramUrlAPI = this.API_HOST2 + this.API_URL2 + '/' + MetodoNameAPI;
        console.log("api:", paramUrlAPI);
        // const paramsAPI = 'StoreProcName=' + StoreProcName + '&DataJson=' + ParamDataJson;

        // const EngineAPI = paramUrlAPI + paramsAPI;

        let data2 = {
            'StoreProcName': StoreProcName,
            'DataJson': ParamDataJson
        };
        console.log("data2:", data2);

        return new Promise(resolve => {
            this.coletionsData = this.http.post(paramUrlAPI, data2);
            this.coletionsData.subscribe(
                data => {
                    console.log('retorno:', data);
                    let ResultsDecode = JSON.parse(this.utf8Decode(JSON.stringify(atob(data[0].results))));
                    data[0].results = btoa(ResultsDecode);
                    resolve(data);
                },
                (error: any) => {
                    this.alertService.presentAlert({
                        pTitle: 'Atenção',
                        pSubtitle: 'Servidor ou Método Indisponível (' + StoreProcName + '). Tente mais tarde!!!',
                        pMessage: 'Status Error:' + error.status + ' | ' + error.statusText
                    });
                    resolve(error);
                }
            );
        });
    };

    private consultarPermisoes() {
        const params = {
            CodigoUsuarioSistema: this.CodigoUsuarioSistema,
            CodigoMenuSistemaPai: this.CodigoMenuSistemaPai,
            Hashkey: this.HashKey
        };
        this.QueryStoreProc('ExecutarPost', 'spPermissoesPorUsuario', params).then(res => {
            const resultado: any = res[0];
            try {
                if (resultado.success) {
                    this.permissoesUsuario = JSON.parse(atob(resultado.results));
                } else {
                    console.log('Sem permissões');
                }
            } catch (err) {
                console.log('Sem permissões');
            }
        });
    }

    public setFilter(filtro: string) {
        this.Filter = filtro;
    }
}
