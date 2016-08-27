import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouteParams} from '@angular/router-deprecated';
import {Post} from '../post/post';
import {User} from '../user/user';
import {Group} from '../group/group';
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
          <my-error [_error]="_error"></my-error>
          <my-post-list [posts]="postsSticky" [postTemplateType]="postTemplateType" [currentUser]="_currentUser" [view]="_view" [contextGroups]="_contextGroups"></my-post-list>
          <my-post-list [posts]="posts" [postTemplateType]="postTemplateType" [currentUser]="_currentUser" [view]="_view" [contextGroups]="_contextGroups"
            [loadButtonState]="_loadButtonState" (loadMoreClicked)="loadMoreClicked($event)"></my-post-list>
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

  private posts: Post[] = [];
  private postsSticky: Post[] = [];
  private _view = "hypergroup";
  private _sidebarHierarchy = null;
  private postTemplateType: PostTemplateType;
  //private parent_gorup: Group_Of_Groups;
  private _geoSelection: string = null;
  private _superGroupList: SuperGroup[] = [];
  private _error = { msg : null, type : null };
  private _showUserControls: boolean = false;
  private _currentUser: User = null;
  private _loggedInUserSubcription = null;
  private _loadButtonState = { show: true, buzyLoadingPosts: false, reachedLastPost: false, postListHasNoPosts: false }
  private _contextGroups: Group[] = []

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

    this._geoSelection = this._routeParams.get('geo') || this._appService.getGeoSelection() || 'city';
    this._appService.setGeoSelection(this._geoSelection);

    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        console.log(this._currentUser, currentUser)
        if(currentUser) {
          this._currentUser = currentUser;
          this._error.msg = null;
          // This is also called when sidebar selection changes, so startOver = true and reset everything
          this._loadButtonState = { show: true, buzyLoadingPosts: false, reachedLastPost: false, postListHasNoPosts: false }
          this.getPostsByHypergroup(this._geoSelection, true);
          this.getHyperGroupHierarchy(this._currentUser, this._geoSelection);
        } else {
          this._currentUser = currentUser;
          this._loadButtonState = { show: true, buzyLoadingPosts: false, reachedLastPost: false, postListHasNoPosts: false }
          this.getPostsByHypergroup(this._geoSelection, true);
          this.getHyperGroupHierarchy(this._currentUser, this._geoSelection);
        }
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this._error.msg = null;
    } else { }
    // Logged in or not fetch posts immidiately
    this._loadButtonState = { show: true, buzyLoadingPosts: false, reachedLastPost: false, postListHasNoPosts: false }
    this.getPostsByHypergroup(this._geoSelection, true);
    this.getHyperGroupHierarchy(this._currentUser, this._geoSelection);

  }   // !ngOnInit()

  /**
   * Fetches posts by hypergroup
   */
  getPostsByHypergroup(geoSelection: any, startOver?: boolean) {
    //console.log("Loadin sizz")
    let lastPostId = -1 // -1 == get the newest post
    if ( this.posts && this.posts.length > 0 && !startOver ) {
      lastPostId = Math.min.apply(Math, this.posts.map( post => post.id ) );
    }

    this._loadButtonState.buzyLoadingPosts = true;
    this._postService.getPostsByHyperGroup( geoSelection, lastPostId ).subscribe(
      resp => {
        // console.log(resp)
        this._error.msg = null;

        this._contextGroups = resp.groupList;
        //console.log(this._contextGroups)

        // Update user's score
        if ( this._currentUser && this._currentUser.id ) {
          console.log(this._currentUser)
          let temp = {};
          temp[this._currentUser.id] = resp.currentUserScore;
          this._authenticationService.updateCurrentUsersScore( temp );
        }

        if ( startOver ) {
          this.posts = resp.posts;
        } else {
          this.posts = this.posts.concat( resp.posts );
        }

        this._loadButtonState.reachedLastPost = resp.posts.length == 0
        this.postsSticky = resp.postsSticky;

        if( this.posts.length + this.postsSticky.length < 1 ) {
          this._error = { type: 'danger', msg: "Your '" + this._geoSelection.toUpperCase() + "' groups do not have any posts yet. " +
                           "Please subscribe to some more active groups, or create a new post yourself." }
          this._loadButtonState.postListHasNoPosts = true;
        }

        this._superGroupList = resp.superGroupList;
        if(this._superGroupList.length < 1) {
          this._error = { type: 'danger', msg: "You have not subscibed to any groups in '" + this._geoSelection.toUpperCase() + "'. " +
                           "Please subscribe to more groups to view posts." }
        }

        this._loadButtonState.buzyLoadingPosts = false;
      },
      error => {
        //console.log(error);
        this._error = { type: 'danger', msg: error };
        this._loadButtonState.show = false;
        this._loadButtonState.buzyLoadingPosts = false;
        this._loadButtonState.reachedLastPost = false;
      });
  }


  /**
   * Returns a Super groups and groups in a Hyper group for a user
   * To be displayed in the sidebar
   */
  getHyperGroupHierarchy(currentUser, hyperGroup) {
    this._userService.getHyperGroupHierarchy(currentUser, hyperGroup).subscribe(
      resp => {
        // Remove user's national form international suggestions
        if ( hyperGroup === 'international' && currentUser && currentUser.national.length > 0 ) {
          resp.suggestedSgs = resp.suggestedSgs.filter( sg => sg.id != currentUser.national[0].id )
          resp.otherSg = resp.otherSg.filter( sg => sg.id != currentUser.national[0].id )
        }
        this._sidebarHierarchy = resp;
        if ( this._sidebarHierarchy.suggestedSgs && this._sidebarHierarchy.suggestedSgs.length > 10 ) {
          this._sidebarHierarchy.suggestedSgs = this._sidebarHierarchy.suggestedSgs.slice(0, 10)
        }
        if ( this._sidebarHierarchy.otherSg && this._sidebarHierarchy.otherSg.length > 10 ) {
          this._sidebarHierarchy.otherSg = this._sidebarHierarchy.otherSg.slice(0, 10)
        }

      },
      error => {
        //this._error.msg = error;
        this._error = { type: 'danger', msg: error };
    })
  }

  loadMoreClicked( noop ) {
    if ( this._loadButtonState.buzyLoadingPosts || this._loadButtonState.reachedLastPost ) return;
    this.getPostsByHypergroup( this._geoSelection, false )
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

  gotoNewPostForm() {
    this._router.navigate(['NewPost']);
  }
}
