import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../modelos/carro';
import { ApiServiceProvider } from '../api-service/api-service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CarrosServiceProvider {
  private _url: string;

  constructor(private _http: HttpClient,
    private _api: ApiServiceProvider) {
    this._url = this._api.url;
  }

  lista(): Observable<Carro[]> {
    return this._http.get<Carro[]>(this._url + "/carro/listatodos");
  }

}
