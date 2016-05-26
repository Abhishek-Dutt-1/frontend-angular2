import {Post} from './post';
import {MOCK_POSTS} from './mock-posts';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppService} from '../app.service';
import {GroupService} from '../group/group.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {UserService} from '../user/user.service';

@Injectable()
export class PostService {

  constructor(
    private _http: Http,
    private _appService: AppService,
    private _groupService: GroupService,
    private _authenticationService: AuthenticationService,
    private _userService: UserService
  ) { }

  getPosts() {
    return Promise.resolve(MOCK_POSTS);
  }

  // See the "Take it slow" appendix
  getPostsSlowly() {
    return new Promise<Post[]>(resolve =>
      setTimeout(()=>resolve(MOCK_POSTS), 2000) // 2 seconds
    );
  }

  getPost(id: any) {

    if(this._appService.getSiteParams().servicesMode === 'server') {
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers( this._appService.getSiteParams().headersObj );
      let options = new RequestOptions({ headers: headers });
      return this._http.get(backendUrl+'/post/getPostById/' + id, options)
        .map(res => {
          console.log(res.json());
          let post = res.json().post;
          post.comments = res.json().comments;
          return post;
        }).catch(error => {
          return this._appService.handleServerErrors(error);
        });
    }

  }

  /**
   * Returns posts belonging to a geoSelection
   */
  getPostsByHyperGroup(geoSelection: any) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/post/getPostsByHyperGroup/' + geoSelection, options)
      .map(res => {
        console.log(res.json());
        return res.json();
      }).catch(error => {
        return this._appService.handleServerErrors(error);
      });
  }         // !getPostsByGeoSelection()

  createNewPost(newProperPost: any) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/post/createNewPost', JSON.stringify(newProperPost), options).map(
      res => {
        console.log(res)
        console.log(res.json())
        return res.json()
      })
      .catch(error => this._appService.handleServerErrors(error));
  }     // !createNewPost()

  deletePostById(postId: any) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/post/deletePostById/' + postId, options).map(
      res => {
        console.log(res)
        console.log(res.json())
        return res.json()
      })
      .catch(error => this._appService.handleServerErrors(error));
  }   // !deletePostById()

  upVotePost(id: any) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/post/upVotePost/'+id, options).map(
      res => {
        console.log(res);
        console.log(res.json());
        return res.json();
      })
      .catch(error => this._appService.handleServerErrors(error));
  }

  downVotePost(id: any) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/post/downVotePost/'+id, options).map(
      res => {
        console.log(res);
        console.log(res.json());
        return res.json();
      })
      .catch(error => this._appService.handleServerErrors(error));
  }

}
