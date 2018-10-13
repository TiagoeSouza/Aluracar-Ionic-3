import { Injectable } from '@angular/core';

@Injectable()
export class ApiServiceProvider {

  private _url: string = "http://192.168.1.17:8080/api"

  get url() {
    return this._url;
  }
}
