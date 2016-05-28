import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {Group} from './group';
import {User} from '../user/user';
import {GroupService} from './group.service';
import {Post} from '../post/post';
import {PostListComponent} from '../post/post-list.component';
import {PostTemplateType} from '../post/post-template-types';
import {AuthenticationService} from '../authentication/authentication.service';
import {ErrorComponent} from '../misc/error.component';
import {FabButtonComponent} from '../misc/fab-button.component';

@Component({
  selector: 'my-view-group',
  template: `
  <div *ngIf="group">

    <div class="my-view-group">

      <div class="row border-row">
        <div class="col-xs-12">

          <div *ngIf="_sticky" class="dummy-div"></div>
          <div class="group-details" [ngClass]="{sticky: _sticky}">
            <div class="group-name">
              <div class="row">
                <div class="col-xs-8">
                  <a [routerLink]="['SuperGroupPostList', {super_group_name: group.supergroup.name}]">{{group.supergroup.name | uppercase}}</a> /
                  <a [routerLink]="['ViewGroup', {super_group_name: group.supergroup.name, group_name: group.name}]">{{group.name}}</a>
                </div>
                <div class="col-xs-4">
                  <div class="sub-text" *ngIf="!group.isCurrentUserSubscribed && !group.isCurrentUsersMembershipPending && _currentUser" (click)="subscribeToThisGroup()">
                    Join Group
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- !col -->
      </div> <!-- !row -->

      <div class="row border-row">
        <div class="col-xs-12">
          <div class="group-description">
            <div class="group-label">Group description</div>
            <span *ngIf="group.description">{{group.description}}</span>
            <span *ngIf="!group.description"><i>Welcome to {{group.supergroup.name}}/{{group.name}}</i></span>
          </div>
          <!--
          <div class="group-description">
            <div class="group-label">Group owner</div>
            <span *ngIf="group.owner.displayname">{{group.owner.displayname}}</span>
          </div>
          -->
        </div> <!-- !col -->
      </div> <!-- !row -->

      <div class="row border-row" *ngIf="group.isCurrentUsersMembershipPending || group.isCurrentUserSubscribed && !group.currentUserIsGroupOwner">
        <div class="col-xs-12">
          <div class="group-ops">
            <div class="sub-text sub-text-mod" *ngIf="group.isCurrentUserSubscribed && !group.currentUserIsGroupOwner" (click)="unSubscribeFromThisGroup()">Leave Group</div>
            <div class="sub-text sub-text-mod" *ngIf="group.isCurrentUsersMembershipPending" (click)="cancelPendingGroupMembership()">Membership Pending (Cancel?)</div>
          </div>
        </div> <!-- !col -->
      </div> <!-- !row -->

      <div class="row border-row" *ngIf="group.currentUserIsGroupOwner">
        <div class="col-xs-12">
          <div class="admin-row">
            <div class="group-label">Admin Panel</div>
            <a [routerLink]="['EditGroup', {group_id: group.id}]" class="">Edit Group</a>
            &bull;
            <a [routerLink]="['ApproveMembership', {group_id: group.id}]" class="">Pending Members</a>
          </div>
        </div> <!-- !col -->
      </div> <!-- !row -->
<!--
non_members_can_view: {{group.non_members_can_view}}<br/>
non_members_can_post: {{group.non_members_can_post}}<br/>
verify_members_email: {{group.verify_members_email}}<br/>
Verify members email domain list: <br/>
<div *ngFor="#emailDomain of group.verify_email_domains_list">{{emailDomain}}</div>
membership_needs_approval: {{group.membership_needs_approval}}<br/>
members_waiting_approval: {{group.members_waiting_approval}}<br/>
<div *ngFor="#members of group.members_waiting_approval">{{members}}</div>
isCurrentUserSubscribed: {{group.isCurrentUserSubscribed}}<br/>
isCurrentUsersMembershipPending: {{group.isCurrentUsersMembershipPending}}<br/>
currentUserIsGroupOwner: {{group.currentUserIsGroupOwner}}<br/>
-->
      <my-error [_errorMsg]="_errorMsg"></my-error>

      <my-post-list [posts]="groupPosts" [postTemplateType]="postTemplateType"  [currentUser]="_currentUser"></my-post-list>

      <div class="fab-button">
        <my-fab-button (clicked)='gotoNewPostForm($event)'></my-fab-button>
      </div>

    </div>    <!-- my-view-group -->
  </div>  <!-- ! ngIfGroup -->
  `,
  styles: [`
  .dummy-div {
    /** dummy div should be the exact height of the sticky div
     * this is to prevent jumping of the page
     */
    height: 55px;
  }
  .sticky {
    position: fixed;
    top: 0;
    background-color: rgba(255, 255, 255, 0.98);
    z-index: 10;
    margin-left: -15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-view-group .border-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .my-view-group .group-name {
    padding-top: 15px;
    padding-bottom: 15px;
    transition: 0.05s ease-in-out;
    display: block;
    vertical-align: baseline;
    letter-spacing: 1px;
    font-size: 18px;
    font-family: WorkSans,sans-serif;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .my-view-group .group-name a {
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
  }
  .my-view-group .group-ops {
    padding: 15px 0;
  }
  .my-view-group .group-description {
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 15px;
    margin-top: 15px;
    word-wrap: break-word;
    -webkit-font-smoothing: antialiased;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .my-view-group .admin-row {
    padding: 15px 0;
  }
  .my-view-group .group-label {
    -webkit-font-smoothing: antialiased;
    color: rgb(200, 200, 200);
    font-family: "Graphik Web","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
    vertical-align: middle;
  }
  .my-view-group .sub-text {
    color: rgba(0, 0, 0, 0.4);
    padding-top: 6px;
    font-size: 12px;
    text-align: right;
  }
  .my-view-group .sub-text-mod {
    text-align: left;
    padding-top: 0px;
    font-size: 15px;
  }
  /*
  .my-view-group .panel-heading {

  }
  .my-view-group .panel-body {

  }
  */
  `],
  //styleUrls: ['app/group/view-group.component.css'],
  //inputs: ['group'],
  directives: [PostListComponent, RouterLink, ErrorComponent, FabButtonComponent]
})
export class ViewGroupComponent implements OnInit, OnDestroy  {

  private group: Group;
  private groupPosts: Post[];
  private postTemplateType: PostTemplateType;
  private _loggedInUserSubcription = null;
  private _currentUser: User = null;
  private _errorMsg = null;
  private _sticky:boolean = false;

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
        //if(currentUser) {
          this._currentUser = currentUser;
          this._errorMsg = null;
          this.getPostsInGroup(super_group_name, group_name);
        //} else {
        //  this.getPostsInGroup(super_group_name, group_name);
        //}
      },
      error => {
        this._errorMsg = error;
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    //if(currentUser) {
      this._currentUser = currentUser;
      this._errorMsg = null;
    //} else { }
    // Logged in or not fetch posts immidiately
    this.getPostsInGroup(super_group_name, group_name);

    // Sticky header. Ref: Geo-filter component for details
    window.addEventListener("scroll", this.myEfficientFn);
  }   // !ngOnInit

  myEfficientFn = this.debounce( () => {
	  // All the taxing stuff you do
    this._sticky = window.scrollY > 60;
    console.log(this._sticky)
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
            if ( this.group.non_members_can_view || this.group.isCurrentUserSubscribed ) {
              this._errorMsg = "This group does not have any posts yet. You can help by creating the first post!"
            } else {
              this._errorMsg = "This group is private. Non members can not view posts in this group."
            }

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
    if(!this._currentUser || !this._currentUser.id) return;
    this._groupService.subscribeCurrentUserToGroup(this.group.id).subscribe(
      res => {
        console.log("SUCCESS SUBS", res);
        // If group membership needs approval, then server wourld have added
        // the user to waiting list or else would have directly subscribed
        if(this.group.membership_needs_approval) {
          this.group.isCurrentUsersMembershipPending = true;
        } else {
          this.group.isCurrentUserSubscribed = true;
        }

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
    if(!this._currentUser || !this._currentUser.id) return;

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

  /**
   * Cancel the logged in users pending membership to a group that requires approval
   */
  cancelPendingGroupMembership() {
    console.log("Cancelling pending membership")
    if(!this.group.id) return;
    if(!this._currentUser || !this._currentUser.id) return;
    this._groupService.cancelCurrentUsersPendingMembership(this.group.id).subscribe(
      res => {
        console.log("SUCCESS UN SUBS pending meme", res);
        this.group.isCurrentUsersMembershipPending = false;
      },
      error => {
        this._errorMsg = error;
        console.log("ERROR", error);
      })

  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
    window.removeEventListener("scroll", this.myEfficientFn);

  }
  goBack() {
    window.history.back();
  }

  gotoNewPostForm() {
    this._router.navigate(['NewPost', {super_group_name: this.group.supergroup.name, group_name: this.group.name}]);
  }

}
