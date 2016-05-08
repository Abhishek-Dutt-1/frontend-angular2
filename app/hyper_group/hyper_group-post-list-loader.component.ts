import {Component, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Post} from '../post/post';
import {User} from '../user/user';
import {AppService} from '../app.service';
import {PostService} from '../post/post.service';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {SuperGroup} from '../super_group/super_group';
import {GeoFilterComponent} from '../post/geo-filter.component';
import {AuthenticationService} from '../authentication/authentication.service';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-hyper_group-post-list-loader',
  template: `
    <div class="my-hyper_group-post-list-loader">
        <my-geo-filter [geoSelection]="_geoSelection" [superGroupList]="_superGroupList"></my-geo-filter>
        <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          {{_errorMsg}}
        </div>
        <my-error [_errorMsg]="_errorMsg"></my-error>
        <my-post-list [posts]="posts" [postTemplateType]="postTemplateType" [currentUser]="_currentUser"></my-post-list>
      <!-- Colored FAB button with ripple -->
      <div class="fab-button">
        <button (click)="gotoNewPostForm()" class="">
          New Post
        </button>
      </div>
    </div>
  `,
  styles: [`
    .my-hyper_group-post-list-loader .fab-button {
      position: fixed;
      right: 20px;
      bottom: 20px;
    }
    .pre-post-list-outer-div {
      clear: both;
    }
  `],
  directives: [PostListComponent, GeoFilterComponent, ErrorComponent]
})
export class HyperGroupPostListLoaderComponent implements OnInit {

  private posts: Post[];
  private postTemplateType: PostTemplateType;
  //private parent_gorup: Group_Of_Groups;
  private _geoSelection: string = 'national';
  private _superGroupList: SuperGroup[];
  private _errorMsg = null;
  private _showUserControls: boolean = false;
  private _currentUser: User = null;
  
  constructor(
    private _appService: AppService,
    private _authenticationService: AuthenticationService,
    private _postService: PostService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    
    this.postTemplateType = PostTemplateType.List;
    
    this._geoSelection = this._routeParams.get('geo') || this._appService.getGeoSelection() || this._geoSelection;
    this._appService.setGeoSelection(this._geoSelection);
    
    this._postService.getPostsByHyperGroup(this._geoSelection).subscribe(
      resp => {
        this.posts = resp.posts;
        this._superGroupList = resp.superGroupList;
      },
      error => {
        console.log(error);
        this._errorMsg = error;
      }
    );
    
    // Only logged in uses view posts
    this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        this._currentUser = currentUser;
        this._errorMsg = null;
      } else { }
    });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this._errorMsg = null;
    } else { }

    
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }
}