import { ApiServiceProvider } from './../api-service/api-service';
import { Usuario } from './../../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';

const CHAVE = 'avatar-usuario';

@Injectable()
export class UsuariosServiceProvider {
  private _usuarioLogado: Usuario;
  private _url: string;

  constructor(private _http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }

  efetuaLogin(email, senha) {
    return this._http.post<Usuario>(this._url + "/login", { email, senha })
      .do((usuario: Usuario) => this._usuarioLogado = usuario);
  }

  obtemUsuarioLogado() {
    return this._usuarioLogado;
  }

  salvaAvatar(avatar) {
    localStorage.setItem(CHAVE, avatar);
  }

  obtemAvatar() {
    return localStorage.getItem(CHAVE) ? localStorage.getItem(CHAVE) : "assets/img/avatar-padrao.jpg";
  }

}
