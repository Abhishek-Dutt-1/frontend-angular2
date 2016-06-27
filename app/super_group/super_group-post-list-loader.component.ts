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
                <div class="col-xs-12">
                  <div class="supergroup-name">
                    <h3>
                    <a [routerLink]="['SuperGroupPostList', {super_group_name: _super_group.name}]">
                      {{_super_group.name | uppercase}} / &nbsp;<small>{{_super_group.description}}</small>
                    </a>
                    </h3>
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

            </div>

          </div>

        </div> <!-- !col -->
      </div> <!-- !row -->

      <my-error [_errorMsg]="_errorMsg"></my-error>

      <my-post-list [posts]="_posts" [postTemplateType]="_postTemplateType" [currentUser]="_currentUser"></my-post-list>

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
  `],
  directives: [PostListComponent, RouterLink, ErrorComponent]
})
/**
 * This compnenet was supposed to show a list of posts (hence the name)
 * But that idea was abandaoned later as it would make it similar to hyper groups
 */
export class SuperGroupPostListLoaderComponent implements OnInit, OnDestroy {

  private _posts: Post[];
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

/////
/*
    this._superGroupService.getSuperGroupByName(this._super_group_name)
      .subscribe(
        superGroup => {
          this._super_group = superGroup;
          this._groups = superGroup.groups;
        },
        error => {
          //console.log(error);
          this._errorMsg = error;
        });
        */
  }

  getSupergroupAndPosts(superGroup) {

    this._superGroupService.getSupergroupAndPosts(superGroup).subscribe(
      resp => {
        console.log(resp);
        this._errorMsg = null;
        this._super_group = resp.superGroup;
        this._groups = resp.superGroup.groups;
        this._posts = resp.posts;
        if(this._posts.length < 1) {
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
    //this._router.navigate(['NewPost', {gog_name: this.group.parent_group.name, group_name: this.group.name}]);
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }


}
