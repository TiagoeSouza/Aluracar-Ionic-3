import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Carro } from './../../modelos/carro';
import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecycles';
import { CarrosServiceProvider } from './../../providers/carros-service/carros-service';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements NavLifecycles {

  public carros: Carro[];

  constructor(public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private carrosService: CarrosServiceProvider) { }

  ionViewDidLoad() {
    let loading = this._loadingCtrl.create({ content: "Carregando carros ..." });

    loading.present();

    // this._http.get<Carro[]>("http://localhost:8080/api/carro/listatodos")
    this.carrosService.lista()
      .subscribe((carros) => {
        this.carros = carros;
        loading.dismiss();
      },
        (error: HttpErrorResponse) => {
          loading.dismiss();
          this._alertCtrl.create({
            title: "Falha na conexão",
            subTitle: "Não foi possível carregar a lista de carros, tente novamente mais tarde!",
            buttons: [
              { text: "Ok" }
            ]
          }).present();

        });
  }

  selecionaCarro(carro: Carro) {
    console.log(carro);
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro,
    });
  }


  doRefresh(refresher) {
    this.ionViewDidLoad();

    setTimeout(() => {
      refresher.complete();
    }, 1000); // API LOCAL ESTA RAPIDA, VOU SETAR UM "DELAY"
  }
}