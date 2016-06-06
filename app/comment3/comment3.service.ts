import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {Comment1} from '../comment1/comment1';
import {Comment3} from './comment3';
import {Post} from '../post/post';
import {MOCK_COMMENT1S} from '../comment1/mock-comment1s';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class Comment3Service {

  constructor(
    private _appService: AppService,
    private _http: Http
  ) { }

  createNewComment3(newComment3: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment3/createNewComment3', JSON.stringify(newComment3), options).map(
      res => {
        this._appService.spinner(false);
        return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

}
