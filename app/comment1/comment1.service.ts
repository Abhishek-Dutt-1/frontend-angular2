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
    /*
    // Server should handle these things
    let lastComment1: Comment1 = MOCK_COMMENT1S.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });
    // Add Comment1
    let newProperComment1 = {
      id: +lastComment1.id + 1,
      text: newComment1.text,
      comments: [],
      postedby: newComment1.postedby,
    }
    MOCK_COMMENT1S.push(newProperComment1);

    // Add Comment1 to Post
    MOCK_POSTS.find(post => post.id == commentedOn.id).comments.push(newProperComment1);

    return Promise.resolve(newProperComment1);
    */

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment1', JSON.stringify(newComment1), options).map(
      res => {
        return res.json()
      })
      .catch(error => this._appService.handleServerErrors(error));

  }
}
