import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {Comment1} from '../comment1/comment1';
import {Comment2} from './comment2';
import {Post} from '../post/post';
import {MOCK_COMMENT1S} from '../comment1/mock-comment1s';
import {MOCK_COMMENT2S} from './mock-comment2s';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class Comment2Service {

  constructor(
    private _appService: AppService,
    private _http: Http
  ) { }

  createNewComment2(newComment2: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment2/createNewComment2', JSON.stringify(newComment2), options).map(
      res => {
        this._appService.spinner(false);
        return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  /**
   *
   */
  upVoteComment2(id: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment2/upVoteComment2/' + id, options).map(
      res => {
        //console.log(res);
        //console.log(res.json());
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  downVoteComment2(id: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment2/downVoteComment2/' + id, options).map(
      res => {
        //console.log(res);
        //console.log(res.json());
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  /**
   * Get comment2 by id
    * (This function is not named getComment2 due to confirm-comment-delete componenet)
   */
  getComment( id : any ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment2/' + id, options)
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
   * Delete comment1 by id
    * (This function is not named deleteComment1ById due to confirm-comment-delete componenet)
   */
  deleteCommentById( commentId: any, postId: any ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    //return this._http.get(backendUrl+'/comment2/deleteComment2ById/' + commentId, options).map(
    return this._http.post(backendUrl+'/comment2/deleteComment2ById/', JSON.stringify( { commentId: commentId, postId: postId } ), options).map(
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
