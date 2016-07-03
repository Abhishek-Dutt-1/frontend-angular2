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

@Component({
  selector: 'my-super-group-post-list-loader',
  template: `
  <div *ngIf="_super_group && _groups">

    <div class="my-super-group-post-list-loader">

      <div class="row">
        <div class="col-xs-12">

          <div class="group-details">

            <div class="group-details-panel">

              <div class="row border-row">
                <div class="col-sm-10">
                  <div class="supergroup-name">
                    <h3>
                    <a [routerLink]="['SuperGroupPostList', {super_group_name: _super_group.name}]">
                      {{_super_group.name | uppercase}} / &nbsp;<small>{{_super_group.description}}</small>
                    </a>
                    </h3>
                  </div>
                </div>

                <div class="col-sm-2 hidden-xs">
                  <div class="new-post">
                    <div>
                      <div class="pull-right btn btn-sm btn-default new-post-button" (click)='gotoNewPostForm($event)'>
                        <i class="fa fa-pencil" aria-hidden="true"></i> &nbsp;New Post
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row border-row">
                <div class="col-xs-12">
                  <div class="group-list">
                    <div *ngFor="let group of _groups">
                      <div class="clearfix">
                        <h4><a class="pull-left" [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">&bull; {{group.name}}
                        &nbsp;<small>{{group.description}}</small></a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row border-row">
                <div class="col-xs-12">
                  <div class="supergroup-ops">
                    <a [routerLink]="['NewGroup', {super_group_name: _super_group.name}]">
                      Create a new group within {{_super_group.name | uppercase}}
                    </a>
                    <a (click)="gotoNewPostForm()" class="hidden">
                       &bull; Create New Post
                    </a>
                  </div>
                </div>
              </div>

            </div>    <!-- ! group-details-panel -->

          </div>    <!-- group-details -->

        </div> <!-- !col -->
      </div> <!-- !row -->

      <my-error [_errorMsg]="_errorMsg"></my-error>

      <my-post-list [posts]="_postsSticky" [postTemplateType]="_postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>
      <my-post-list [posts]="_posts" [postTemplateType]="_postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>

      <div class="fab-button visible-xs-block">
        <my-fab-button (clicked)='gotoNewPostForm($event)'></my-fab-button>
      </div>

    </div>
  </div>  <!-- end top div -->
  `,
  styles: [`
  .my-super-group-post-list-loader .supergroup-name {
    /*
    padding-top: 15px;
    padding-bottom: 15px;
    */
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
  .my-super-group-post-list-loader .group-list {
    /*
    padding-top: 15px;
    */
    padding-bottom: 15px;
    transition: 0.05s ease-in-out;
    display: block;
    vertical-align: baseline;
    letter-spacing: 1px;
    font-size: 16px;
    font-family: WorkSans,sans-serif;
    overflow-wrap: break-word;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-super-group-post-list-loader .group-list a {
    color: rgba(0, 0, 0, 0.6);
  }
  .my-super-group-post-list-loader .supergroup-ops {
    padding: 15px 0;
  }
  .my-super-group-post-list-loader .supergroup-ops a {
    color: rgba(0, 0, 0, 0.6);
  }
  .my-super-group-post-list-loader .new-post {
    padding-top: 15px;
  }
  .my-super-group-post-list-loader .new-post-button {
    padding: 3px 15px 3px 10px;
    color: #af2b2b;
  }
  `],
  directives: [PostListComponent, RouterLink, ErrorComponent, FabButtonComponent]
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
  private _errorMsg: String = null;
  private _loggedInUserSubcription = null;
  private _postTemplateType: PostTemplateType = null;
  private _currentUser: User = null;

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
          this._errorMsg = null;
          this.getSupergroupAndPosts(this._super_group_name);
        } else {
          this.getSupergroupAndPosts(this._super_group_name);
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
    this.getSupergroupAndPosts(this._super_group_name);
  }

  getSupergroupAndPosts(superGroup) {

    this._superGroupService.getSupergroupAndPosts(superGroup).subscribe(
      resp => {
        //console.log(resp);
        this._errorMsg = null;
        this._super_group = resp.superGroup;
        this._groups = resp.superGroup.groups;
        this._posts = resp.posts;
        this._postsSticky = resp.postsSticky;
        if( this._posts.length + this._postsSticky.length < 1 ) {
          this._errorMsg = "No posts here. You can create the first one!"
        }
      },
      error => {
        this._errorMsg = error;
    })
  }

  goBack() {
    window.history.back();
  }

  gotoNewPostForm() {
    this._router.navigate( [ 'NewPost', {super_group_name: this._super_group.name } ] );
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }


}
