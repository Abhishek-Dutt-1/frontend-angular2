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

  /**
   *
   */
  upVoteComment3(id: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get( backendUrl + '/comment3/upVoteComment3/' + id, options ).map(
      res => {
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  downVoteComment3(id: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get( backendUrl + '/comment3/downVoteComment3/' + id, options ).map(
      res => {
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  /**
   * Get comment3 by id
    * (This function is not named getComment3 due to confirm-comment-delete componenet)
   */
  getComment( id : any ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment3/getComment3ById/' + id, options)
      .map(res => {
        //console.log(res.json());
        this._appService.spinner(false);
        //let post = res.json().post;
        //post.comments = res.json().comments;
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }     // !getComment

  /**
   * Delete comment3 by id
    * (This function is not named deleteComment3ById due to confirm-comment-delete componenet)
   */
  deleteCommentById( commentId: any ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment3/deleteComment3ById/' + commentId, options).map(
      res => {
        //console.log(res)
        //console.log(res.json())
        this._appService.spinner(false);
        return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }   // !deletePostById()

}
