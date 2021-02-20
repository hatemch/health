import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
var ConectionsService = /** @class */ (function () {
    function ConectionsService(http) {
        this.http = http;
        // private baseUrl = 'https://order-app-76ad0.firebaseio.com';  
        this.Localhost = 'http://undercode.tecnologia.ws/ServiceMenu/api/Geral/';
        this.Localhostpermanant = 'http://localhost:60313/api/Geral/';
        this.EngineHostApi = 'localhost:8081';
        //private id : any;
        this.headers = new Headers();
        /*
         EngineQueryStoreProc(params){
           return new Promise(resolve => {
            this.http.get(`${this.EngineHostApi}StoreProc?params=`+params)
            .subscribe(
             res => resolve(res.json()),
             err => resolve(err.json())
             );
          });
         }
        */
        // metodo for response message retur EngineAPI
        this.MessageFetchEngineAPI = function (JsonDataProcessResults, DialogMsgRetEnabled) {
            var RetMsg = JsonDataProcessResults.metadata.message;
            if (JsonDataProcessResults.metadata.success) {
                // script returned error	
                if (DialogMsgRetEnabled) {
                    this.loading = this.loadingCtrl.create({
                        content: RetMsg
                    });
                    this.loading.present();
                }
                else { //log(RetMsg);
                }
                return true;
            }
            else if (JsonDataProcessResults.metadata.session == false) {
                if (DialogMsgRetEnabled) {
                    this.loading = this.loadingCtrl.create({
                        content: RetMsg
                    });
                    this.loading.present();
                }
                else { //log(RetMsg);
                }
                return false;
            }
            else {
                if (DialogMsgRetEnabled) {
                    this.loading = this.loadingCtrl.create({
                        content: RetMsg
                    });
                    this.loading.present();
                }
                else { //log(RetMsg);
                }
                return false;
            }
        };
        this.EngineQueryStoreProc = function (pParamEntidadeDB, pStoreProcParamsJSON, pSessionStorage, callback) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var ConstSessionStorage, ParamSQLType, ParamEntidadeDB, ParamWhereDB, ParamDataJson, ParamHashkey, paramUrlAPI, paramsAPI, EngineAPI;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    ConstSessionStorage = pSessionStorage;
                    ParamSQLType = "StoreProc";
                    ParamEntidadeDB = pParamEntidadeDB;
                    ParamWhereDB = "";
                    ParamDataJson = JSON.stringify(pStoreProcParamsJSON);
                    ParamHashkey = sessionStorage.SessionHashkey;
                    paramUrlAPI = sessionStorage.getItem('SessionHost') + '/DataProcess?';
                    paramsAPI = "EntidadeDB=" + ParamEntidadeDB + "&DataJson=" + ParamDataJson + "&WhereDB=" + ParamWhereDB + "&SQLType=" + ParamSQLType + "&Hashkey=" + ParamHashkey;
                    EngineAPI = paramUrlAPI + paramsAPI;
                    //var DataProcessResults = "";
                    fetch(EngineAPI).then(function (response) {
                        if (response.status === 200) {
                            return response.json();
                        }
                        else {
                            throw new Error('Algo deu errado no servidor da EngineAPI!');
                        }
                    }).then(function (response) {
                        if (_this.MessageFetchEngineAPI(response, true)) {
                            //console.debug(response);
                            sessionStorage.setItem(ConstSessionStorage, JSON.stringify(response.metadata.StringJSONDataSet));
                            sessionStorage.setItem(ConstSessionStorage + 'Grid', JSON.stringify(response.metadata.StringJSONDataGrid));
                            if (typeof callback === "function") {
                                callback();
                            }
                            return true;
                        }
                        else {
                            sessionStorage.setItem(ConstSessionStorage, '');
                            sessionStorage.setItem(ConstSessionStorage + 'Grid', '');
                            return false;
                        }
                        //String.fromCharCode(39)
                    }).catch(function (error) {
                        console.error(error);
                        return false;
                    });
                    return [2 /*return*/];
                });
            });
        };
        this.headers.append('Content-Type', 'application/json');
    }
    ConectionsService.prototype.encripta = function (valor) {
        var retorno;
        var stexto;
        retorno = "";
        try {
            stexto = valor.toString().trim();
        }
        catch (err) {
            stexto = valor;
        }
        if (stexto == null)
            stexto = "";
        if (stexto == "")
            return stexto;
        while (true) {
            var letra = void 0;
            var nnumero = void 0;
            var snumero = void 0;
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
    };
    ConectionsService.prototype.getMunicipios = function (uf) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaMunicipios?uf=" + _this.encripta(uf))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.salvarCadastro = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "SalvarCadastro", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.alterCadastro = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "AlterarCadastro", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.alterSenha = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "AlterarSenha", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.recuperarSenha = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "RecuperarSenha", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.consultaUsuario = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "ConsultaUsuario", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.getLocais = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "ConsultaLocais", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.getEventos = function (ret, data) {
        var _this = this;
        console.log(this.Localhost, data);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "ConsultaEventos", data, JSON.stringify(ret))
                .subscribe(function (res) { return resolve(res.json()); }, function (err) { return resolve(err.json()); });
        });
    };
    ConectionsService.prototype.getCategories = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaCategories?id_rest=" + user)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getCategories2 = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaCategories?id_rest=" + user.id_restaurant)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.sendCategoria = function (data, user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setcategoria?namecategoria=" + data.categoria + "&id_rest=" + user, JSON.stringify(data)) //{headers: this.headers}
                .subscribe(function (res) { return resolve(res.json()); }); //ok;1;
        });
    };
    ConectionsService.prototype.deleteCategoria = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.Localhost + "deleteCategoria?id=" + data.id_category)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getMenu = function (category) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaMenu?category=" + category)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    // &id_restaurant=1
    ConectionsService.prototype.sendMenuType = function (data, item, user) {
        var _this = this;
        console.log(item);
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setMenyType?name=" + data.name + "\n     &description=" + data.description + "\n     &price=" + data.price + "\n     &id_category=" + item.id_category + "\n     &id_restaurant=" + user, JSON.stringify(data)) //{headers: this.headers}
                .subscribe(function (res) { return resolve(res.json()); }); //ok;1;
        });
    };
    ConectionsService.prototype.deleteMenuType = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.Localhost + "deleteMenyType?id=" + data.id_menu)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    //id_restaurant id_cliente
    ConectionsService.prototype.sendorders = function (order, user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setOrder?id_user=" + order.id_remote + "&id_restaurant=\n         " + order.id_restaurant + "&id_menu=" + order.id_menu + "&description=" + order.description + "\n         &price=" + order.price + "&quantity=" + order.quantity + "&id_table=" + order.id_table + "\n         &id_garcao=" + order.id_garcao + "&id_client=" + user.id, JSON.stringify(order)) //{headers: this.headers}
                .subscribe(function (res) { return resolve(res.json()); }); //ok;1;
        });
    };
    //id_user
    ConectionsService.prototype.receiveorders = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaOrders?id_user=1")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.deleteorder = function (order) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.Localhost + "deleteOrder?id=" + order.id)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    //id_servidor
    ConectionsService.prototype.getTables = function (id_user, id_restaurant, usertype) {
        var _this = this;
        console.log("Id RESTAURANTE", id_restaurant);
        console.log("Id USER", id_user);
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaTables?id_servidor=" + id_user + "&id_restaurant=" + id_restaurant + "&usertype=" + usertype)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.setTable = function (id_garcao, id_restaurant, numTable, capacity) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "settable?id_garcao=" + id_garcao + "\n    &id_restaurant=" + id_restaurant + "\n    &numTable=" + numTable + "\n    &capacity=" + capacity, JSON.stringify(numTable, capacity))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.deleteTable = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.Localhost + "deleteTable?id=" + data)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getTableOrders = function (id_table) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaTableOrders?id_table=" + id_table)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getQRcode = function (code) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaQrCode?QrcodeString=" + code)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    //Id_restaurante
    ConectionsService.prototype.setQrCode = function (id_gerente, newQRcode, latitude, longitude) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setQrCode?id_gerente=" + id_gerente + "\n     &QrcodeString=" + newQRcode + "&latitude=" + latitude + "&longitude=" + longitude, JSON.stringify(newQRcode))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.setGarcaoesAcesso = function (id_restaurant, id, status) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setGarcaoesAcesso?id_restaurant=" + id_restaurant + "&id=" + id + "&rest_block=" + status, JSON.stringify(status))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getGarcaoes = function (gerente, id_restaurant) {
        var _this = this;
        console.log("Id_User", id_restaurant);
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "getgarcaoes?gerente=" + gerente + "&id_restaurant=" + id_restaurant)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    // string listtype, int id_restaurant, int id_garcao
    ConectionsService.prototype.getMesasGarcao = function (listtype, id_restaurant, id_garcao) {
        var _this = this;
        console.log("Id_User", id_restaurant);
        console.log("Id_Garcon", id_garcao);
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "getMesasGarcao?listtype=" + listtype + "&id_restaurant=" + id_restaurant + "&id_garcao=" + id_garcao)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    // id_table
    ConectionsService.prototype.getoredersmesa = function (usertype, id_table, id_client) {
        var _this = this;
        console.log("UserType");
        console.log(usertype);
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "getoredersmesa?id_table=" + id_table + "&usertype=" + usertype + "&id_cliente=" + id_client)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    // getoredersmesa1(usertype,id_table,id_cliente){
    //   return new Promise(resolve => {
    //     this.http.get(`${this.Localhost}getoredersmesaviaCliente?id_table=${id_table}&id_cliente=${id_cliente}&usertype=${usertype}`)
    //     .subscribe(res => resolve(res.json())) ;
    //    });
    // }
    ConectionsService.prototype.checklogin = function (login) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "checklogin?login=" + login)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.addGarcao = function (id_restaurant, name, login, password) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setnovoGarcao?id_restaurant=" + id_restaurant + "\n   &name=" + name + "\n   &login=" + login + "\n   &password=" + password, JSON.stringify(login))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.setPedidas = function (order, data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setPedidas?id_client=" + order.id_client + "&id_restaurant=" + order.id_restaurant + "&id_table=" + order.id_table + "&id_garcao=" + order.id_garcao + "&subtotal=" + data.subtotal + "&servico=" + data.servico + "&total=" + data.total, JSON.stringify(data))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.setPedidasMenu = function (order, data, id_pedida) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setPedidasMenu?id_menu=" + order.id_menu + "&quantity=" + order.quantity + "&description=" + order.description_client + "&id_pedida=" + id_pedida + "&id_order=" + order.id, JSON.stringify(data))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getpedidas = function (id_client) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "getpedidas?id_client=" + id_client)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.updateProfil = function (user, novouser) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "updateProfil?id=" + user.id + "&email=" + novouser.email + "&nome=" + novouser.name + "&endereco=" + novouser.endereco + "&cidade=" + novouser.cidade + "&cellular=" + novouser.cellular, JSON.stringify(novouser))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getcowzinhar = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaCozinhar")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getbarorder = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaBar")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.allocateTable = function (id_restaurant, id_user, id_table) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "SetTable?id_restaurant=" + id_restaurant + "&id_client=" + id_user + "&id_table=" + id_table, JSON.stringify(3))
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getMelhorComida = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaMelhorComida")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getMelhorBebidas = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaMelhorBebidas")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getMelhorMesa = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaMelhorMesa")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getMelhorGarcao = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaMelhorGarcao")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getRestaurante = function () {
        var _this = this;
        console.log();
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "getRestaurante?id_gerente=3")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.getRating = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "GetRating")
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.SearchRestaurant = function (search) {
        var _this = this;
        console.log();
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaSearchRestaurant?rest_name=" + search)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.sendEvents = function (data, user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setEvents?id_rest=" + user + "&nome_event=" + data.event + "&date=" + data.date + "\n   &desc=" + data.desc + "&stime=" + data.início + "&etime=" + data.Fim, JSON.stringify(data)) //{headers: this.headers}
                .subscribe(function (res) { return resolve(res.json()); }); //ok;1;
        });
    };
    ConectionsService.prototype.getEvents = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.Localhost + "ConsultaEvents?id_rest=" + user)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.deleteEvents = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.Localhost + "deleteEvents?id=" + data.id)
                .subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ConectionsService.prototype.sendReview = function (data, rest, value, value1, value2, value3) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setRating?id_rest=" + rest + "&id_cliente=" + 1 + "&rating_service=" + value + "\n   &rating_price=" + value1 + "&rating_access=" + value2 + "&rating_promotion=" + value3, JSON.stringify(data)) //{headers: this.headers}
                .subscribe(function (res) { return resolve(res.json()); }); //ok;1;
        });
    };
    ConectionsService.prototype.sendReservation = function (id, user) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.Localhost + "setReservation?id_rest=" + id + "&id_cliente=" + '2' + "&nome=" + 'Ahmed Bali', JSON.stringify(user)) //{headers: this.headers}
                .subscribe(function (res) { return resolve(res.json()); }); //ok;1;
        });
    };
    ConectionsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Http])
    ], ConectionsService);
    return ConectionsService;
}());
export { ConectionsService };
//# sourceMappingURL=conections.service.js.map