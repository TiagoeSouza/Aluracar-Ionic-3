import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentosServiceProvider {
  private _url = "http://localhost:8080/api";

  constructor(private _http: HttpClient) { }

  agenda(agendamento: Agendamento) {
    return this._http.post(this._url + "/agendamento/agenda", agendamento)
      .do(() => agendamento.enviado = true)
      .catch((error) => Observable.of(new Error('Falha no agendamento, tente novamente mais tarde!')));
  }
}
