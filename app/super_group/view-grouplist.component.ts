import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {RouteParams} from '@angular/router-deprecated';
import {User} from '../user/user';
import {ErrorComponent} from '../misc/error.component';
import {SuperGroupSidebarComponent} from './super_group-sidebar.component';
import {SuperGroupService} from './super_group.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-view-grouplist',
  template: `
    <div class="my-view-grouplist">
      <div *ngIf="_errorMsg">
        <my-error [_errorMsg]="_errorMsg"></my-error>
      </div>
      <div *ngIf="!_errorMsg">
        <div class="row">
          <div class="col-sm-4">
            <my-super_group-sidebar [_super_group]="_super_group" [_groups]="_groups"></my-super_group-sidebar>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  directives: [ErrorComponent, SuperGroupSidebarComponent]
})
export class ViewGroupListComponent implements OnInit {

  private _errorMsg = null;
  private _super_group_name = null;
  private _loggedInUserSubcription = null;
  private _currentUser: User = null;
  private _super_group = null;
  private _groups = null;

  constructor(
    private _routeParams: RouteParams,
    private _userService: UserService,
    private _superGroupService: SuperGroupService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._super_group_name = this._routeParams.get('supergroup');
    console.log("supergroup", this._super_group_name)

    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        if(currentUser) {
          this._currentUser = currentUser;
          this._errorMsg = null;
          this.getSupergroupWithGroups(this._super_group_name);
        } else {
          this.getSupergroupWithGroups(this._super_group_name);
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
    this.getSupergroupWithGroups(this._super_group_name);
  }

  getSupergroupWithGroups(super_group_name) {

    this._superGroupService.getSupergroupWithGroups(super_group_name).subscribe(
      sg => {
        this._errorMsg = null;
        this._super_group = sg.superGroup;
        this._groups = sg.superGroup.groups;
      },
      error => {
        this._errorMsg = error;
      })
  }


}
