import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Agendamento } from '../../modelos/agendamento';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];
  _alerta: Alert;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider) {
  }

  ionViewDidLoad() {
    this._agendamentoDao.listaTodos()
      .subscribe(
        (agendamentos: Agendamento[]) => {
          this.agendamentos = agendamentos
        });
  }

  reenvia(agendamento: Agendamento) {
    this._alerta = this._alertCtrl.create({
      title: "Aviso",
      buttons: [{ text: "Ok" }]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento)
      .mergeMap((valor) => {
        let observable = this._agendamentoDao.salva(agendamento);

        if (valor instanceof Error) {
          throw valor;
        }

        return observable;
      })
      .finally(() => this._alerta.setSubTitle(mensagem).present())
      .subscribe(
        () => mensagem = 'Agendamento reenviado !',
        (error: Error) => mensagem = error.message
      );
  }
}