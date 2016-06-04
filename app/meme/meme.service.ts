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
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/meme/getMemeList/', options).map(
      res => {
        console.log(res.json());
        let meme = res.json();
        // meme = { memeList: Array[4], memecategories: Array[2] }
        return meme;
      }).catch(error => {
        return this._appService.handleServerErrors(error);
      });
  }

}
