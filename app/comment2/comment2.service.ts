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
    console.log(newComment2)

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/comment2', JSON.stringify(newComment2), options).map(
      res => {
        console.log(res)
        console.log(res.json())
        return res.json()
      })
      .catch(error => this._appService.handleServerErrors(error));
    /*
    // Server should handle these things
    let lastComment2: Comment2 = MOCK_COMMENT2S.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });
    // Add Comment2
    let newProperComment2 = {
      id: +lastComment2.id + 1,
      text: newComment2.text,
      comments: [],
      postedby: newComment2.postedby,
    }
    MOCK_COMMENT2S.push(newProperComment2);
    // Add Comment2 to Comment1
    MOCK_COMMENT1S.find(comment1 => comment1.id == commentedOn.id).comments.push(newProperComment2);
    return Promise.resolve(newProperComment2);
    */
  }
  
}