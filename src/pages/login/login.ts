import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "tiago_e_souza@hotmail.com";
  senha: string = "alura123";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioService: UsuariosServiceProvider,
    private _alertCtrl: AlertController) {
  }

  efetuaLogin() {
    console.log("Email: ", this.email);
    console.log("Senha: ", this.senha);

    this._usuarioService.efetuaLogin(this.email, this.senha)
      .subscribe((usuario: Usuario) => {
        console.log(usuario);
        this.navCtrl.setRoot(HomePage)
      },
        (error) => {
          this._alertCtrl.create({
            title: "Falha no login",
            subTitle: "Email ou senha incorreto!<br/>Verifique!",
            buttons: [
              {
                text: "Ok"
              }
            ]
          }).present();
        });

  }
}
