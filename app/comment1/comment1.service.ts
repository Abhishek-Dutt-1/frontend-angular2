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

  /**
   * Get comment1 by id
    * (This function is not named getComment1 due to confirm-comment-delete componenet)
   */
  getComment( id : any ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/comment1/getComment1ById/' + id, options)
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
    //return this._http.get(backendUrl+'/comment1/deleteComment1ById/' + commentId, options).map(
    return this._http.post(backendUrl+'/comment1/deleteComment1ById/', JSON.stringify( { commentId: commentId, postId: postId } ), options).map(
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
