import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {SuperGroup} from './super_group';
import {SuperGroupService} from './super_group.service';
import {GroupService} from '../group/group.service';
import {User} from '../user/user';
import {Post} from '../post/post';
import {Group} from '../group/group';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {ErrorComponent} from '../misc/error.component';
import {AppService} from '../app.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {FabButtonComponent} from '../misc/fab-button.component';
import {SuperGroupSidebarComponent} from './super_group-sidebar.component';

@Component({
  selector: 'my-super-group-post-list-loader',
  template: `
  <div *ngIf="_super_group && _groups">

    <div class="my-super-group-post-list-loader">

      <div class="row">
        <div class="col-xs-12">

          <div *ngIf="_sticky" class="dummy-div"></div>
          <div class="group-details" [ngClass]="{sticky: _sticky}">

            <div class="group-details-panel">

              <div class="row border-row">
                <div class="col-xs-12 group-name-row ">
                  <div class="supergroup-name pull-left">
                    <div>
                      <a class="menu-link" [routerLink]="[ '/HyperGroupPostList', { geo: _hyper_group } ]">
                        <i class="fa" [ngClass]="{'fa-plane': _hyper_group == 'international', 'fa-train': _hyper_group == 'national', 'fa-bus': _hyper_group === 'state', 'fa-car': _hyper_group === 'city', 'fa-bicycle': _hyper_group === 'local' }"></i> /
                      </a>
                      <a [routerLink]="['SuperGroupPostList', {super_group_name: _super_group.name}]">
                        {{_super_group.name}} / &nbsp;<small class="hidden1"><i>{{_super_group.description}}</i></small>
                      </a>
                    </div>
                  </div>

                  <div class="pull-right">
                    <div class="new-post pull-right hidden-xs">
                      <div>
                        <a class="btn btn-sm btn-default new-post-button" [routerLink]="[ 'NewPost', {super_group_name: _super_group.name } ]">
                          <i class="fa fa-pencil" aria-hidden="true"></i> &nbsp;New Post
                        </a>
                      </div>
                    </div>
                    <div class="pull-right">
                      <div class="add-supergroups-button hidden-xs">
                        <a class="1pull-right btn btn-sm btn-default new-post-button" [routerLink]="[ 'ViewGroupList', { supergroup: _super_group.name } ]">
                          <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Groups</a>
                      </div>
                      <div class="add-supergroups-plus visible-xs-block">
                        <a class="" [routerLink]="[ 'ViewGroupList', { supergroup: _super_group.name } ]">
                          <i class="fa fa-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>    <!-- ! group-details-panel -->

          </div>    <!-- group-details -->

        </div> <!-- !col -->
      </div> <!-- !row -->

      <div class="row">
        <div class="col-md-10 post-list-area">
          <my-error [_error]="_error"></my-error>
          <my-post-list [posts]="_postsSticky" [postTemplateType]="_postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>
          <my-post-list [posts]="_posts" [postTemplateType]="_postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>
        </div>
        <div class="col-md-2 hidden-xs hidden-sm">
          <my-super_group-sidebar [_super_group]="_super_group" [_groups]="_groups" [_currentUser]="_currentUser"></my-super_group-sidebar>
        </div>
      </div>

      <div class="fab-button visible-xs-block">
        <my-fab-button (clicked)='gotoNewPostForm($event)'></my-fab-button>
      </div>

    </div>
  </div>  <!-- end top div -->
  `,
  styles: [`
  .my-super-group-post-list-loader .dummy-div {
    /** dummy div should be the exact height of the sticky div
     * this is to prevent jumping of the page
     */
    height: 55px;
  }
  .my-super-group-post-list-loader .sticky {
    position: fixed;
    top: 0;
    background-color: rgba(255, 255, 255, 0.98);
    z-index: 10;
    margin-left: -15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%; /*
    border-bottom: 1px solid rgba(0, 0, 0, 0.05); */
  }
  .my-super-group-post-list-loader .group-name-row {
    margin: 15px 0;
  }
  .my-super-group-post-list-loader .supergroup-name {
    transition: 0.05s ease-in-out;
    display: block;
    vertical-align: baseline;
    letter-spacing: 1px;
    font-size: 18px;
    font-family: WorkSans,sans-serif;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-super-group-post-list-loader .supergroup-name a {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-super-group-post-list-loader .border-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-super-group-post-list-loader .post-list-area {
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-super-group-post-list-loader .new-post {
    /* padding-top: 15px; */
  }
  .my-super-group-post-list-loader .new-post-button {
    padding: 3px 15px 3px 10px;
    color: #af2b2b;
  }
  .my-super-group-post-list-loader .add-supergroups-button {
    padding-right: 10px;
  }
  .my-super-group-post-list-loader .add-supergroups-plus {
    font-size: 18px;
    font-family: WorkSans,sans-serif;
    text-transform: capitalize;
  }
  .my-super-group-post-list-loader .add-supergroups-plus a {
    color: rgba(0, 0, 0, 0.3);
  }
  `],
  directives: [PostListComponent, RouterLink, ErrorComponent, FabButtonComponent, SuperGroupSidebarComponent]
})
/**
 * This compnenet was supposed to show a list of posts (hence the name)
 * But that idea was abandaoned later as it would make it similar to hyper groups
 */
export class SuperGroupPostListLoaderComponent implements OnInit, OnDestroy {

  private _posts: Post[];
  private _postsSticky: Post[];
  private _view = "supergroup";
  private _groups: Group[];
  private _super_group_name: string;
  private _super_group: SuperGroup;
  private _hyper_group = null;
  private _error = { msg: null, type: null };
  private _loggedInUserSubcription = null;
  private _postTemplateType: PostTemplateType = null;
  private _currentUser: User = null;
  private _sticky:boolean = false;

  constructor(
    private _appService: AppService,
    private _groupService: GroupService,
    private _superGroupService: SuperGroupService,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _routeParams: RouteParams) {}

  ngOnInit() {

    this._postTemplateType = PostTemplateType.List;

    this._super_group_name = this._routeParams.get('super_group_name');

    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        if(currentUser) {
          this._currentUser = currentUser;
          this._error.msg = null;
          this.getSupergroupAndPosts(this._super_group_name);
        } else {
          this.getSupergroupAndPosts(this._super_group_name);
        }
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if( currentUser ) {
      this._currentUser = currentUser;
      this._error.msg = null;
    } else { }
    // Logged in or not fetch posts immidiately
    this.getSupergroupAndPosts(this._super_group_name);

    // Sticky header. Ref: Geo-filter component for details
    window.addEventListener("scroll", this.myEfficientFn);
  }

  myEfficientFn = this.debounce( () => {
	  // All the taxing stuff you do
    this._sticky = window.scrollY > 60;
    //console.log(this._sticky)
  }, 100, false);
  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }


  getSupergroupAndPosts(superGroup) {

    this._superGroupService.getSupergroupAndPosts(superGroup).subscribe(
      resp => {
        //console.log(resp);
        this._error.msg = null;
        resp.superGroup.groups = resp.groupList;
        this._super_group = resp.superGroup;
        this._groups = resp.superGroup.groups;
        this._hyper_group = this._super_group.type;
        if ( this._super_group.type == 'international' ) {
          //console.log(this._currentUser)
          if ( this._currentUser && this._currentUser.national.find( group => group.id === this._super_group.id ) ) {
            this._hyper_group = 'national'
          }
        }
        this._posts = resp.posts;
        this._postsSticky = resp.postsSticky;
        if( this._posts.length + this._postsSticky.length < 1 ) {
          this._error.msg = "No posts here yet. You can create the first one!"
        }
      },
      error => {
        this._error.msg = error;
    })
  }

  goBack() {
    window.history.back();
  }

  gotoNewPostForm() {
    this._router.navigate( [ 'NewPost', { super_group_name: this._super_group.name } ] );
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
    window.removeEventListener( "scroll", this.myEfficientFn );
  }


}
