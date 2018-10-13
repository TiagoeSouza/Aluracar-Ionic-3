import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _usuariosService: UsuariosServiceProvider,
    private _camera: Camera) {
  }

  tiraFoto() {
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((fotoUri) => {
      fotoUri = normalizeURL(fotoUri);
      this._usuariosService.salvaAvatar(fotoUri);
    }).catch((error) => {
      console.log(error);
    });
  }

  get avatar() {
    return this._usuariosService.obtemAvatar();
  }
  get usuarioLogado() {
    return this._usuariosService.obtemUsuarioLogado();
  }

}
