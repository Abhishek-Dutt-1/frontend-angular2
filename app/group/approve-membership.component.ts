/**
 * Approve or decline memberships for a group
 */
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
  selector: 'my-approve-membership',
  //templateUrl: 'app/group/view-group.component.html',
  template: `
  <div class="my-approve-membership">
    
    <my-error [_errorMsg]="_errorMsg"></my-error>
    
    <div *ngIf="group">
      
      <div class="row">
        <div class="col-xs-12">
          
          <div class="group-details">  
            <div class="panel panel-default group-details-panel">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a [routerLink]="['SuperGroupPostList', {super_group_name: group.supergroup.name}]">{{group.supergroup.name | uppercase}}</a> / {{group.name}}
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

                Is current user Subscribed: {{group.isCurrentUserSubscribed}}<br/>
                Is current user in waiting list: {{group.isCurrentUsersMembershipPending}}<br/>
                Is current user owner of this group: {{group.currentUserIsGroupOwner}}<br/>

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
        <div class="col-xs-12">
          <table class="table table-condensed table-hover">
            <thead>
              <tr><th>Display Name</th><th>Approve Membership</th><th>Decline Membership</th>
            </thead>
            <tbody>
              <tr *ngFor="#pendingUser of group.members_waiting_approval">
                <td class="col-xs-4">{{pendingUser.displayname}}</td>
                <td class="col-xs-4"><button class="btn btn-default btn-xs" (click)="approveMembership(pendingUser.id)">Approve</button></td>
                <td class="col-xs-4"><button class="btn btn-default btn-xs" (click)="declineMembership(pendingUser.id)">Disapprove</button></td>
              </tr>
            </tbody>
          </table>
        </div> <!-- !col -->
      </div> <!-- !row -->
      
    </div>  
  </div>  <!-- end top div -->
  `,
  styles: [`
  .my-approve-membership .group-details-panel {
    margin-bottom: 0px;
    margin-top: 10px;
  }
  .my-approve-membership .panel-heading {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .my-approve-membership .panel-body {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  `],
  directives: [RouterLink, ErrorComponent]
})
export class ApproveMembershipComponent implements OnInit, OnDestroy  {
  
  private group: Group = null;
  //private groupPosts: Post[];
  //private postTemplateType: PostTemplateType;
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
    
    let group_id = this._routeParams.get('group_id');
    console.log(group_id)
    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        if(currentUser) {
          // User logged In
          this._currentUser = currentUser;
          this._errorMsg = null;
          this.getGroupWaitingList(group_id);
        } else {
          // User logged out
          this._currentUser = currentUser;
          this.group = null;
          this._errorMsg = "User must be logged in to view this page.";
          // Can be redirected here to the group
        }
      },
      error => {
        this._errorMsg = error;
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this._errorMsg = null;
      this.getGroupWaitingList(group_id);
    } else { 
      this._errorMsg = "User must be logged in to view this page.";
    }

  }   // !ngOnInit
  
  
  /**
   * Fetches posts in given supergroup/group
   */
  getGroupWaitingList(group_id: any) {
    this._groupService.getGroupWaitingList(group_id).subscribe(
      res => {
        console.log(res)
        this.group = res
      },
      error => {
        console.log(error);
        this._errorMsg = error;  
      });
  }
  
  /**
   * Approve a pending member
   */
  approveMembership(userId: any) {
    console.log("Approving", userId);
    if(!this.group.id) return;
    if(!this._currentUser || !this._currentUser.id) return;
    if(!userId) return;
    this._groupService.approveGroupMembership(this.group.id, userId).subscribe(
      approvedUserId => {
        console.log("SUCCESS APPROVAL memebership", approvedUserId);
        for(var i = 0; i < this.group.members_waiting_approval.length; i++) {
          if(this.group.members_waiting_approval[i].id == approvedUserId) {
            this.group.members_waiting_approval.splice(i, 1);
            break;
          }
        }
      },
      error => {
        this._errorMsg = error;
        console.log("ERROR", error);
      })
  }
  
  /**
   * Decline a pending member
   */
  declineMembership(userId: any) {
    console.log("Declining", userId);
    if(!this.group.id) return;
    if(!this._currentUser || !this._currentUser.id) return;
    if(!userId) return;
    this._groupService.disApproveGroupMembership(this.group.id, userId).subscribe(
      disApprovedUserId => {
        console.log("SUCCESS dis APPROVAL memebership", disApprovedUserId);
        for(var i = 0; i < this.group.members_waiting_approval.length; i++) {
          if(this.group.members_waiting_approval[i].id == disApprovedUserId) {
            this.group.members_waiting_approval.splice(i, 1);
            break;
          }
        }  
      },
      error => {
        this._errorMsg = error;
        console.log("ERROR", error);
      })
  }
  
  /**
   * Subscribe current user to this group
   */
  /*
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
  */
  
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