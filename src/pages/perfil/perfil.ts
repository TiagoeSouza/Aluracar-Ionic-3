import { Usuario } from './../../modelos/usuario';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider) {
  }

  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

}
