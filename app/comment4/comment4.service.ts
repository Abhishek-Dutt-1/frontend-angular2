import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {Comment1} from '../comment1/comment1';
import {Comment4} from './comment4';
import {Post} from '../post/post';
import {MOCK_COMMENT1S} from '../comment1/mock-comment1s';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class Comment4Service {

  constructor(
    private _appService: AppService,
    private _http: Http
  ) { }

  createNewComment4(newComment4: any) {

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment4', JSON.stringify(newComment4), options).map(
      res => {
        return res.json()
      })
      .catch(error => this._appService.handleServerErrors(error));
  }

}
