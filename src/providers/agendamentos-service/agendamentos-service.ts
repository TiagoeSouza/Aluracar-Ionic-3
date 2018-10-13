import { ApiServiceProvider } from './../api-service/api-service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class AgendamentosServiceProvider {
  // private _url = "http://192.168.1.17:8080/api";
  private _url: string;

  constructor(private _http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }

  agenda(agendamento: Agendamento) {
    return this._http.post(this._url + "/agendamento/agenda", agendamento)
      .do(() => agendamento.enviado = true)
      .catch((error) => Observable.of(new Error('Falha no agendamento, tente novamente mais tarde!')));
  }
}
