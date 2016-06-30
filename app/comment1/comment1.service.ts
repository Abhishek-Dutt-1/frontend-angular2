import {Http, Headers, RequestOptions} from '@angular/http';
import {Comment1} from './comment1';
import {Post} from '../post/post';
import {MOCK_COMMENT1S} from './mock-comment1s';
import {MOCK_POSTS} from '../post/mock-posts';
import {AppService} from '../app.service';
import {Injectable} from '@angular/core';
import {GroupService} from '../group/group.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class Comment1Service {

  constructor(
    private _appService: AppService,
    private _http: Http,
    private _authenticationService: AuthenticationService
  ) { }

  createNewComment1(newComment1: any) {

    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment1/createNewComment1', JSON.stringify(newComment1), options).map(
      res => {
        this._appService.spinner(false);
        return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }       // ! createNewComment1

  /**
   *
   */
  upVoteComment1(id: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment1/upVoteComment1/' + id, options).map(
      res => {
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  downVoteComment1(id: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment1/downVoteComment1/' + id, options).map(
      res => {
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

}
