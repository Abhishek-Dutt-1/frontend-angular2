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

  /*
  getPosts() {
    return Promise.resolve(MOCK_POSTS);
  }
  */

  // See the "Take it slow" appendix
  getPostsSlowly() {
    return new Promise<Post[]>(resolve =>
      setTimeout(()=>resolve(MOCK_POSTS), 2000) // 2 seconds
    );
  }

  getPost(id: any) {

    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/post/getPostById/' + id, options)
      .map(res => {
        //console.log(res.json());
        this._appService.spinner(false);
        //let post = res.json().post;
        //post.comments = res.json().comments;
        //return post;
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  /**
   * Returns posts belonging to a geoSelection
   */
  getPostsByHyperGroup( geoSelection: any, lastPostId?: any ) {
    lastPostId = lastPostId || -1;
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post( backendUrl+'/post/getPostsByHyperGroup/',
      JSON.stringify({ hyperGroup: geoSelection, lastPostId: lastPostId }), options )
      .map(res => {
        //console.log(res.json());
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }         // !getPostsByGeoSelection()

  createNewPost(newProperPost: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/post/createNewPost', JSON.stringify(newProperPost), options).map(
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
  }     // !createNewPost()

  editPost(properPost: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/post/editPost', JSON.stringify( properPost ), options).map(
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
  }     // !createNewPost()

  deletePostById(postId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/post/deletePostById/' + postId, options).map(
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

  upVotePost(id: any, contextGroups: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    //return this._http.get(backendUrl+'/post/upVotePost/'+id, options).map(
    return this._http.post(backendUrl+'/post/upVotePost/', JSON.stringify( { postId : id, contextGroups : contextGroups } ), options).map(
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

  downVotePost(id: any, contextGroups: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    //return this._http.get(backendUrl+'/post/downVotePost/'+id, options).map(
    return this._http.post(backendUrl+'/post/downVotePost/', JSON.stringify( { postId : id, contextGroups : contextGroups } ), options).map(
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
   * Fetches a list of images (with relevency score) from a url
   * for link type post
   */
  fetchPostImagesFromUrl( url : string ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/post/fetchPostImagesFromUrl/', JSON.stringify( { url: url } ), options).map(
      res => {
        //console.log(res.json())
        this._appService.spinner(false);
        return res.json();
      })
      .catch(error => {
        //console.log(error)
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

}
