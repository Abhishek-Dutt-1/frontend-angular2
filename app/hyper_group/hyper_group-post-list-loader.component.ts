import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';
import {Post} from '../post/post';
import {User} from '../user/user';
import {AppService} from '../app.service';
import {PostService} from '../post/post.service';
import {UserService} from '../user/user.service';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {SuperGroup} from '../super_group/super_group';
import {GeoFilterComponent} from '../post/geo-filter.component';
import {AuthenticationService} from '../authentication/authentication.service';
import {ErrorComponent} from '../misc/error.component';
import {FabButtonComponent} from '../misc/fab-button.component';
import {HyperGroupSidebarComponent} from './hyper_group-sidebar.component';

@Component({
  selector: 'my-hyper_group-post-list-loader',
  template: `
    <div class="my-hyper_group-post-list-loader">

      <my-geo-filter [geoSelection]="_geoSelection" [superGroupList]="_superGroupList"></my-geo-filter>

      <div class="row">
        <div class="col-md-10 post-list-area">
          <my-error [_errorMsg]="_errorMsg"></my-error>
          <my-post-list [posts]="postsSticky" [postTemplateType]="postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>
          <my-post-list [posts]="posts" [postTemplateType]="postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>
        </div>
        <div class="col-md-2 hidden-xs hidden-sm">
          <my-hyper_group-sidebar [hierarchy]="_sidebarHierarchy" [hyperGroup]="_geoSelection"></my-hyper_group-sidebar>
        </div>
      </div>

      <div class="fab-button visible-xs-block">
        <my-fab-button (clicked)='gotoNewPostForm($event)'></my-fab-button>
      </div>

    </div>
  `,
  styles: [`
    .my-hyper_group-post-list-loader {
    }
    .pre-post-list-outer-div {
      clear: both;
    }
    .my-hyper_group-post-list-loader .post-list-area {
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
  `],
  directives: [PostListComponent, GeoFilterComponent, ErrorComponent, HyperGroupSidebarComponent, FabButtonComponent]
})
export class HyperGroupPostListLoaderComponent implements OnInit, OnDestroy {

  private posts: Post[];
  private postsSticky: Post[];
  private _view = "hypergroup";
  private _sidebarHierarchy: any[] = null;
  private postTemplateType: PostTemplateType;
  //private parent_gorup: Group_Of_Groups;
  private _geoSelection: string = null;
  private _superGroupList: SuperGroup[];
  private _errorMsg = null;
  private _showUserControls: boolean = false;
  private _currentUser: User = null;
  private _loggedInUserSubcription = null;


  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _authenticationService: AuthenticationService,
    private _postService: PostService,
    private _router: Router,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {

    this.postTemplateType = PostTemplateType.List;

    this._geoSelection = this._routeParams.get('geo') || this._appService.getGeoSelection() || 'national';
    this._appService.setGeoSelection(this._geoSelection);

    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        if(currentUser) {
          this._currentUser = currentUser;
          this._errorMsg = null;
          this.getPostsByHypergroup(this._geoSelection);
          this.getHyperGroupHierarchy(this._currentUser, this._geoSelection);
        } else {
          this.getPostsByHypergroup(this._geoSelection);
          this.getHyperGroupHierarchy(this._currentUser, this._geoSelection);
        }
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this._errorMsg = null;
    } else { }
    // Logged in or not fetch posts immidiately
    this.getPostsByHypergroup(this._geoSelection);
    this.getHyperGroupHierarchy(this._currentUser, this._geoSelection);

  }   // !ngOnInit()

  /**
   * Fetches posts by hypergroup
   */
  getPostsByHypergroup(geoSelection: any) {
    this._postService.getPostsByHyperGroup(geoSelection).subscribe(
      resp => {
        //console.log(resp)
        this._errorMsg = null;
        this.posts = resp.posts;
        this.postsSticky = resp.postsSticky;
        if( this.posts.length + this.postsSticky.length < 1 ) {
          this._errorMsg = "Your '" + this._geoSelection.toUpperCase() + "' groups do not have any posts yet. " +
                           "Please subscribe to some more active groups, or create a new post yourself."
        }

        this._superGroupList = resp.superGroupList;
        if(this._superGroupList.length < 1) {
          this._errorMsg = "You have not subscibed to any groups in '" + this._geoSelection.toUpperCase() + "'. " +
                           "Please subscribe to more groups to view posts."
        }
      },
      error => {
        //console.log(error);
        this._errorMsg = error;
      });
  }


  /**
   * Returns a Super groups and groups in a Hyper group for a user
   * To be displayed in the sidebar
   */
  getHyperGroupHierarchy(currentUser, hyperGroup) {
    this._userService.getHyperGroupHierarchy(currentUser, hyperGroup).subscribe(
      resp => {
        this._sidebarHierarchy = resp;
      },
      error => {
        this._errorMsg = error;
    })
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }
}
