import {Http, Headers, RequestOptions} from 'angular2/http';
import {AppService} from '../app.service';
import {Comment1} from '../comment1/comment1';
import {Comment2} from './comment2';
import {Post} from '../post/post';
import {MOCK_COMMENT1S} from '../comment1/mock-comment1s';
import {MOCK_COMMENT2S} from './mock-comment2s';
import {Injectable} from 'angular2/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class Comment2Service {
  
  constructor(
    private _appService: AppService,
    private _http: Http
  ) { }

  createNewComment2(newComment2: any) {

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment2', JSON.stringify(newComment2), options).map(
      res => {
        return res.json()
      })
      .catch(error => this._appService.handleServerErrors(error));
  }
  
}