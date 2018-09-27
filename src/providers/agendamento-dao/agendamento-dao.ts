import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../modelos/agendamento';

import 'rxjs/add/observable/frompromise';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {

  }

  private _geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);

  }

  salva(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);
    let promise = this._storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento) {
    let chave = this._geraChave(agendamento);
    let promise = this._storage.get(chave).then(data => data ? true : false);

    return Observable.fromPromise(promise);
  }


  listaTodos() {
    let agendamentos: Agendamento[] = [];

    let promise = this._storage.forEach((agendamento: Agendamento) => {
      agendamentos.push(agendamento);
    }).then(() => agendamentos);

    return Observable.fromPromise(promise);
  }
}
