import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {AppService} from '../app.service';
import {Group} from './group';
import {User} from '../user/user';
import {GroupService} from './group.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {AuthenticationService} from '../authentication/authentication.service';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-view-group',
  //templateUrl: 'app/group/view-group.component.html',
  template: `
  <div *ngIf="group">
  
    <div class="my-view-group">
      
      <div class="row">
        <div class="col-xs-12">
          
          <div class="group-details">  
            <div class="panel panel-default group-details-panel">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a [routerLink]="['SuperGroupPostList', {super_group_name: group.supergroup.name}]">{{group.supergroup.name | uppercase}}</a> / {{group.name}}
                  <button class="btn btn-default btn-xs" *ngIf="!group.isCurrentUserSubscribed" (click)="subscribeToThisGroup()">Subscribe</button>
                  <button class="btn btn-default btn-xs" *ngIf="group.isCurrentUserSubscribed" (click)="unSubscribeFromThisGroup()">Unsubscribe</button>
                </h4>
              </div>  
              <div class="panel-body">
                <span *ngIf="group.description">{{group.description}}</span>
                <span *ngIf="!group.description"><i>Welcome to {{group.supergroup.name}}/{{group.name}}</i></span>
                <hr/>
                Non members can view: {{group.non_members_can_view}}<br/>
                Non members can post: {{group.non_members_can_post}}<br/>
                Verify members email: {{group.verify_members_email}}<br/>
                Verify members email domain list: {{group.verify_members_email_list}}<br/>
                Membership needs approval: {{group.membership_needs_approval}}<br/>
                Members waiting approval: {{group.members_waiting_approval}}<br/>
              </div>
              <div class="panel-footer">
                <a>Group Info</a> |
                <a [routerLink]="['NewPost', {super_group_name: group.supergroup.name, group_name: group.name}]" class="">
                  Create a New Post
                </a>
              </div>
            <div>
          </div>

        </div> <!-- !col -->
      </div> <!-- !row -->
      
      <my-error [_errorMsg]="_errorMsg"></my-error>
      
      <my-post-list [posts]="groupPosts" [postTemplateType]="postTemplateType"  [currentUser]="_currentUser"></my-post-list>
      
    </div>  
  </div>  <!-- end top div -->
  `,
  styles: [`
  .my-view-group .group-details-panel {
    margin-bottom: 0px;
    margin-top: 10px;
  }
  .my-view-group .panel-heading {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .my-view-group .panel-body {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  `],
  //styleUrls: ['app/group/view-group.component.css'],
  //inputs: ['group'],
  directives: [PostListComponent, RouterLink, ErrorComponent]
})
export class ViewGroupComponent implements OnInit, OnDestroy  {
  
  private group: Group;
  private groupPosts: Post[];
  private postTemplateType: PostTemplateType;
  private _loggedInUserSubcription = null;
  private _currentUser: User = null;
  private _errorMsg = null;

  constructor(
    private _appService: AppService,
    private _groupService: GroupService,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _routeParams: RouteParams) {}
  
  ngOnInit() {
    
    this.postTemplateType = PostTemplateType.Grouplist;
        
    let super_group_name = this._routeParams.get('super_group_name');
    let group_name = this._routeParams.get('group_name');
    
    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        if(currentUser) {
          this._currentUser = currentUser;
          this._errorMsg = null;
          this.getPostsInGroup(super_group_name, group_name);
        } else {
          this.getPostsInGroup(super_group_name, group_name);
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
    this.getPostsInGroup(super_group_name, group_name);

  }   // !ngOnInit
  
  
  /**
   * Fetches posts in given supergroup/group
   */
  getPostsInGroup(super_group_name: string, group_name: string) {
    this._groupService.getPostsInGroup(super_group_name, group_name)
      .subscribe(
        groupAndPostList => {
          console.log(groupAndPostList)
          this.group = groupAndPostList.group
          this.groupPosts = groupAndPostList.postList;
          if(this.groupPosts.length < 1) {
          this._errorMsg = "This group does not have any posts yet. You can help by creating the first post!"
          }
        },
        error => {
          console.log(error);  
        });
  }
  
  /**
   * Subscribe current user to this group
   */
  subscribeToThisGroup() {
    console.log("SUBSRIBING");
    if(!this.group.id) return;
    if(!this._currentUser.id) return;
    this._groupService.subscribeCurrentUserToGroup(this.group.id).subscribe(
      res => {
        console.log("SUCCESS SUBS", res);
        this.group.isCurrentUserSubscribed = true;
        this._errorMsg = null;
      },
      error => {
        this._errorMsg = error;
        console.log("ERROR", error);
      })
  }
  
  /**
   * Unsubscirbe current user from this group
   */
  unSubscribeFromThisGroup() {
    console.log("Un subscribing")
    if(!this.group.id) return;
    if(!this._currentUser.id) return;
    this._groupService.unSubscribeCurrentUserFromGroup(this.group.id).subscribe(
      res => {
        console.log("SUCCESS UN SUBS", res);
        this.group.isCurrentUserSubscribed = false;
      },
      error => {
        this._errorMsg = error;
        console.log("ERROR", error);
      })
  }
  
  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }
  goBack() {
    window.history.back();
  }
  
  gotoNewPostForm() {
    this._router.navigate(['NewPost', {super_group_name: this.group.super_group.name, group_name: this.group.name}]);
  }
  
}