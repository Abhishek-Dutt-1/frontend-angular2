import {Post} from './post';
import {MOCK_POSTS} from './mock-posts';
import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
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
  
  getPost(id: number) {
    return Promise.resolve(MOCK_POSTS).then(
      posts => posts.filter(post => post.id === id)[0]
    );
  }

  /**
   * Returns posts belonging to a geoSelection
   */
  getPostsByGeoSelection(geoSelection: string) {
    let user = this._authenticationService.getLoggedInUser();
    console.log(geoSelection);
    console.log(user)
    if(!user) {
      // No user logged in
      // Display a posts from a default selection of super groups
      user = this._userService.getDefaultUser();
    }
    
    if(this._appService.getSiteParams().servicesMode === 'local') {
      if(user) {
        if(geoSelection == 'international') {
          return Promise.resolve({
            posts: MOCK_POSTS.filter(post => user.international.map(int => int.id).indexOf(post.group.super_group.id) > -1 ),
            superGroupList: user.international
          })
        }
        if(geoSelection == 'national') {
          return Promise.resolve({
            posts: MOCK_POSTS.filter(post => user.national.map(int => int.id).indexOf(post.group.super_group.id) > -1 ),
            superGroupList: user.national
          })  
        }
        if(geoSelection == 'state') {
          return Promise.resolve({
            posts: MOCK_POSTS.filter(post => user.state.map(el => el.id).indexOf(post.group.super_group.id) > -1 ),
            superGroupList: user.state
          })
        }
        if(geoSelection == 'city') {
          return Promise.resolve({
            posts: MOCK_POSTS.filter(post => user.city.map(el => el.id).indexOf(post.group.super_group.id) > -1 ),
            superGroupList: user.city
          })
        }
        if(geoSelection == 'local') {
          console.log(user)
          return Promise.resolve({
            posts: MOCK_POSTS.filter(post => user.local.map(el => el.id).indexOf(post.group.super_group.id) > -1 ),
            superGroupList: user.local
          })
        }
      }
    }     // !getSiteParams()
    if(this._appService.getSiteParams().servicesMode === 'server') {
      
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers( this._appService.getSiteParams().headersObj );
      let options = new RequestOptions({ headers: headers });
      return this._http.get(backendUrl+'/post/getPostsByGeoSelection/' + geoSelection, options)
        .map(res => {
          console.log(res);
          return res.json();
        }).catch(error => {
          return this._appService.handleServerErrors(error);
        });
    }       // !getSiteParams
    
  }         // !getPostsByGeoSelection()
  
  createNewPost(newPost: any) {
    
    
    if(this._appService.getSiteParams().servicesMode === 'local') {
      let lastPost:Post = MOCK_POSTS.reduceRight((left, right) => {
                      if(left.id > right.id) return left
                        else return right;
                    });
      let newPost_superGroup = newPost.superGroupSlashGroup.split('/')[0]
      let newPost_group = newPost.superGroupSlashGroup.split('/')[1]
      
      return this._groupService.getGroup(newPost_superGroup, newPost_group).then(
        group => {
          let newProperPost = {
            id: +lastPost.id + 1,
            upvotes: 0,
            downvotes: 0,
            title: newPost.title,
            link: newPost.link,
            text: newPost.text,
            type: newPost.type,
            comments: [],
            postedby: newPost.postedby,
            group: group
          }
          MOCK_POSTS.push(newProperPost);
          return newProperPost;
        });    
    }
    
    if(this._appService.getSiteParams().servicesMode === 'service') {
      
      let newPost_superGroup = newPost.superGroupSlashGroup.split('/')[0]
      let newPost_group = newPost.superGroupSlashGroup.split('/')[1]
      
      let newProperPost = {
            title: newPost.title,
            link: newPost.link,
            text: newPost.text,
            type: newPost.type,
            postedby: newPost.postedby,
            group: group
          }
    }
      
  }     // !createNewPost()
  
  upVotePost(id: number) {
    return true
  }
  
  downVotePost(id: number) {
    return true
  }
  
}