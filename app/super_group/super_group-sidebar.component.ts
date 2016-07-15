 import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {ErrorComponent} from '../misc/error.component';
import {UserService} from '../user/user.service';
import {AppService} from '../app.service';
import {Group} from '../group/group';
import {AuthenticationService} from '../authentication/authentication.service';
import {GroupService} from '../group/group.service';

@Component({
  selector: 'my-super_group-sidebar',
  template: `
  <!--  ------------------------------ Normal Version -------------------------------- -->
  <div *ngIf="_groups && _super_group  && !extendedVersion">
    <div class="my-super_group-sidebar">

      <div class="row">
        <div class="col-xs-12">
          <div>Groups in {{_super_group.name}}:</div>
        </div>
      </div>
      <div class="row border-row">
        <div class="col-xs-12">
          <div class="group-list">
            <div *ngFor="let group of _groups">
              <div class="clearfix group-container">
                <div><a class="pull-left" [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">/{{group.name}}
                <small class="hidden">&nbsp;{{group.description}}</small></a>
                </div>
                <div class="pull-right" *ngIf="!group.isCurrentUserSubscribed && !group.isCurrentUsersMembershipPending" (click)="subscribeToThisGroup(group)">
                  <div class="add-super-group-plus"><i class="fa fa-plus" aria-hidden="true"></i></div>
                </div>
                <div class="pull-right" *ngIf="group.isCurrentUserSubscribed && !group.currentUserIsGroupOwner" (click)="unSubscribeFromThisGroup(group)">
                  <div class="add-super-group-plus"><i class="fa fa-minus" aria-hidden="true"></i></div>
                </div>
                <div class="pull-right" *ngIf="group.isCurrentUsersMembershipPending" (click)="cancelPendingGroupMembership(group)">
                  <div class="add-super-group-plus"><i class="fa fa-clock-o" aria-hidden="true"></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row border-row hidden1">
        <div class="col-xs-12">
          <div class="supergroup-ops">
            <a [routerLink]="['NewGroup', {super_group_name: _super_group.name}]">
              Create a new group in <b>{{_super_group.name}}</b>
            </a>
            <a (click)="gotoNewPostForm()" class="hidden">
               &bull; Create New Post
            </a>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12">
          <div class="message-meta">
            Suggestion for a new Group? Message us at <a [routerLink]="['ViewGroup', {super_group_name: 'Global', group_name: 'Meta'}]">GLOBAL/Meta</a>.
          </div>
        </div>
      </div>  <!-- !row -->

    </div>
  </div>    <!-- ngIf -->

  <!--  ------------------------------ Extended version -------------------------------- -->

  <div *ngIf="_groups && _super_group && extendedVersion">
    <div class="my-super_group-sidebar">

      <div class="row">
        <div class="col-xs-12">
          <div>Groups within {{_super_group.name | uppercase}}:</div>
        </div>
      </div>
      <div class="row border-row">
        <div class="col-xs-12">
          <div class="group-list">
            <div *ngFor="let group of _groups">
              <div class="group-container 1border-row">

                <div class="row">
                  <div class="col-xs-6">
                    <div><a class="pull-left" [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">{{group.name}}:
                      <small class="1hidden">{{group.description}}</small></a>
                    </div>
                  </div>
                  <div class="col-xs-6">
                    <div class="group-ops 1text-center">
                      <div class="btn btn-sm btn-default subscribe-button" *ngIf="!group.isCurrentUserSubscribed && !group.isCurrentUsersMembershipPending" (click)="subscribeToThisGroup(group)">Join Group</div>
                      <div class="btn btn-xs btn-link sub-text" *ngIf="group.isCurrentUserSubscribed && !group.currentUserIsGroupOwner" (click)="unSubscribeFromThisGroup(group)">Leave Group</div>
                      <div class="btn btn-xs btn-link sub-text" *ngIf="group.isCurrentUsersMembershipPending" (click)="cancelPendingGroupMembership(group)">Membership Pending (Cancel?)</div>
                    </div>
                  </div> <!-- !col -->
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row border-row hidden">
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

      <div class="row">
        <div class="col-xs-12">
          <div class="message-meta">
            Suggestion for a new Group? Message us at <a [routerLink]="['ViewGroup', {super_group_name: 'Global', group_name: 'Meta'}]">GLOBAL/Meta</a>.
          </div>
        </div>
      </div>  <!-- !row -->

    </div>
  </div>    <!-- ngIf -->

  <!--  ------------------------------ End Extended version -------------------------------- -->

  `,
  styles: [`
    .my-super_group-sidebar {
      padding-top: 10px;
    }
    .my-super_group-sidebar a {
      color: #af2b2b;
    }
    .my-super_group-sidebar .add-super-group-plus {
      /*
      padding-top: 8px;
      padding-right: 10px;
      */
      cursor: pointer;
    }
    .my-super_group-sidebar .message-meta {
      font-style: italic;
      font-size: x-small;
      margin-top: 15px;
    }
    .my-super_group-sidebar .border-row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    .my-super_group-sidebar .group-list {
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
    .my-super_group-sidebar .group-list a {
      color: rgba(0, 0, 0, 0.6);
    }
    .my-super_group-sidebar .supergroup-ops {
      padding: 15px 0;
    }
    .my-super_group-sidebar .supergroup-ops a {
      color: rgba(0, 0, 0, 0.6);
    }
    .my-super_group-sidebar .group-container {
      margin-top: 15px;
      margin-bottom: 15px;
    }
    .my-super_group-sidebar .subscribe-button {
      padding: 3px 15px 3px 10px;
      margin-right: 15px;
      color: #af2b2b;
    }
    .my-super_group-sidebar .sub-text {
      color: rgba(0, 0, 0, 0.4);
    }
  `],
  directives: [RouterLink, ErrorComponent],
  inputs: ["_groups", "_super_group", "_currentUser", "extendedVersion"]

})
export class SuperGroupSidebarComponent implements OnInit {

  private hierarchy: string = null;
  private _groups = null;
  private _super_group = null;
  private _currentUser = null;
  private _errorMsg = null;

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private _appService: AppService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    //console.log("init", this._currentUser)
  }

  /**
   * Subscribe to a Super group into user's hyper group
   */
   /*
  subscribeSuperGroup(sg: any, hyperGroup: string) {
    console.log("Subbing SG", sg);
    this._userService.subscribeSuperGroup(sg.id, hyperGroup).subscribe(
      updatedUser => {
        console.log("Success", updatedUser)
        this._authenticationService.updateCurrentUser(updatedUser);
        //this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: 'geo'}]);
      },
      error => {
        console.log("Error", error);
        //this._errorMsg = error;
      });
  }
  */

    /**
     * Un subscribe to a Super group into user's given hyper group
     */
     /*
    unSubscribeSuperGroup(sg: any, hyperGroup: string) {
      console.log("Un Subbing SG", sg);
      this._userService.unSubscribeSuperGroup(sg.id, hyperGroup).subscribe(
        updatedUser => {
          console.log("Success", updatedUser)
          this._authenticationService.updateCurrentUser(updatedUser);
          //this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: 'geo'}]);
        },
        error => {
          console.log("Error", error);
          //this._errorMsg = error;
        });
    }
    */


  /***************************************
   * SYNC WITH viwe-group.component
   *
   ***************************************/
  /**
   * Subscribe current user to this group
   */
  subscribeToThisGroup(group: Group) {
    //console.log(group)
    if(!group.id) return;
    if(!this._currentUser || !this._currentUser.id) {
      //this._errorMsg = "User must be logged in to join a group.";
      this._appService.createNotification( { text: "User must be logged in to join a group.", type: 'danger' } );
      return;
    }
    this._groupService.subscribeCurrentUserToGroup(group.id).subscribe(
      updatedUser => {
        //console.log("SUCCESS SUBS", res);
        // If group membership needs approval, then server wourld have added
        // the user to waiting list or else would have directly subscribed
        if(group.membership_needs_approval) {
          group.isCurrentUsersMembershipPending = true;
        } else {
          group.isCurrentUserSubscribed = true;
        }
        this._authenticationService.updateCurrentUser(updatedUser);
        this._appService.createNotification( { text: "Joined group '" + this._super_group.name + "/" + group.name + "'", type: 'success' } );
      },
      error => {
        //this._errorMsg = error;
        this._appService.createNotification( { text: error, type: 'danger' } );
        console.log("ERROR", error);
      })
  }

  /**
   * Unsubscirbe current user from this group
   */
  unSubscribeFromThisGroup(group: Group) {
    if(!group.id) return;
    if(!this._currentUser || !this._currentUser.id) {
      this._appService.createNotification( { text: "User must be logged in to leave groups.", type: 'danger' } );
      return;
    }

    this._groupService.unSubscribeCurrentUserFromGroup(group.id).subscribe(
      updatedUser => {
        //console.log("SUCCESS UN SUBS", updatedUser);
        group.isCurrentUserSubscribed = false;
        this._authenticationService.updateCurrentUser(updatedUser);
        this._appService.createNotification( { text: "Left the group '" + this._super_group.name + "/" + group.name + "'", type: 'success' } );
      },
      error => {
        //this._errorMsg = error;
        this._appService.createNotification( { text: error, type: 'danger' } );
        console.log("ERROR", error);
      })
  }

  /**
   * Cancel the logged in users pending membership to a group that requires approval
   */
  cancelPendingGroupMembership(group: Group) {
    //console.log("Cancelling pending membership")
    if(!group.id) return;
    if(!this._currentUser || !this._currentUser.id) {
      this._appService.createNotification( { text: "User must be logged in..", type: 'danger' } );
      return;
    }

    this._groupService.cancelCurrentUsersPendingMembership(group.id).subscribe(
      updatedUser => {
        //console.log("SUCCESS UN SUBS pending meme", res);
        group.isCurrentUsersMembershipPending = false;
        this._authenticationService.updateCurrentUser(updatedUser);
        this._appService.createNotification( { text: "Cancelled pending memebership for '" + this._super_group.name + "/" + group.name + "'", type: 'success' } );
      },
      error => {
        //this._errorMsg = error;
        this._appService.createNotification( { text: error, type: 'danger' } );
        //console.log("ERROR", error);
      })

  }

}
