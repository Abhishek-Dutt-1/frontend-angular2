import {Meme} from './meme';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';

@Injectable()
export class MemeService {

  constructor(
    private _http: Http,
    private _appService: AppService
  ) { }

  getMemeList() {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/meme/getMemeList/', options).map(
      res => {
        //console.log(res.json());
        let meme = res.json();
        // meme = { memeList: Array[4], memecategories: Array[2] }
        this._appService.spinner(false);
        return meme;
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

}
