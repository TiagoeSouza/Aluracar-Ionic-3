import { Agendamento } from './../../modelos/agendamento';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
    selector: 'page-cadastro',
    templateUrl: 'cadastro.html',
})
export class CadastroPage {

    public carro: Carro;
    public precoTotal: number;

    public nome: string = "";
    public endereco: string = "";
    public email: string = "";
    public data: string = new Date().toISOString();

    private _alerta: Alert;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private _alertCtrl: AlertController,
        private _agendamentosService: AgendamentosServiceProvider,
        private _agendamentoDao: AgendamentoDaoProvider,
        private _vibration: Vibration,
        private _datepicker: DatePicker) {
        this.carro = this.navParams.get("carroSelecionado");
        this.precoTotal = this.navParams.get("precoTotal");
    }

    selecionaData() {
        this._datepicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: 5
        }).then((data) => {
            this.data = data.toISOString();
        }).catch((error) => {
            // Quando clicado no botão cancelar do calendario, estava ocorrendo error in promise
            // Sendo assim a unica forma até o momento que encontrei foi informar no catch um return;
            return;
        });
    }

    agenda() {
        // console.log(this.nome);
        // console.log(this.endereco);
        // console.log(this.email);
        // console.log(this.data);

        if (!this.nome || !this.endereco || !this.email) {
            let pattern = [500, 200, 1000];
            this._vibration.vibrate(pattern);

            this._alertCtrl.create({
                title: "Preenchimento obrigatório",
                subTitle: "Preencha todos os campos!",
                buttons: [
                    { text: "Ok" }
                ]
            }).present();
            
            return;
        }

        let agendamento: Agendamento = {
            nomeCliente: this.nome,
            enderecoCliente: this.endereco,
            emailCliente: this.email,
            modeloCarro: this.carro.nome,
            precoTotal: this.precoTotal,
            confirmado: false,
            enviado: false,
            data: this.data,
            visualizado: false
        };

        this._alerta = this._alertCtrl.create({
            title: "Aviso",
            buttons: [
                {
                    text: "Ok",
                    handler: () => {
                        this.navCtrl.setRoot(HomePage);
                    }
                }
            ]
        });

        let mensagem = '';

        // this._agendamentosService.agenda(agendamento)

        this._agendamentoDao.ehDuplicado(agendamento)
            .mergeMap(ehDuplicado => {
                if (ehDuplicado) {
                    throw new Error('Agendamento existente!');
                }

                return this._agendamentosService.agenda(agendamento);
            })
            .mergeMap((valor) => {
                let observable = this._agendamentoDao.salva(agendamento);

                if (valor instanceof Error) {
                    throw valor;
                }

                return observable;
            })
            .finally(() => this._alerta.setSubTitle(mensagem).present())
            .subscribe(
                () => mensagem = 'Agendamento realizado !',
                (error: Error) => mensagem = error.message
            );
    }
}
