import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {User} from '../user/user';
import {ErrorComponent} from '../misc/error.component';
import {SuperGroupSidebarComponent} from './super_group-sidebar.component';
import {SuperGroupService} from './super_group.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-view-grouplist',
  template: `
    <div class="my-view-grouplist">
    <div  *ngIf="_groups && _super_group">

      <div class="row">
        <div class="col-xs-12">

          <div class="group-details">

            <div class="group-details-panel">

              <div class="row border-row">
                <div class="col-xs-12 group-name-row ">
                  <div class="supergroup-name pull-left">
                    <div>
                      <a class="menu-link" [routerLink]="[ '/HyperGroupPostList', { geo: _hyper_group } ]">
                        <i class="fa" [ngClass]="{'fa-plane': _hyper_group == 'international', 'fa-train': _hyper_group == 'national', 'fa-bus': _hyper_group === 'state', 'fa-car': _hyper_group === 'city', 'fa-bicycle': _hyper_group === 'local' }"></i> /
                      </a>
                      <a [routerLink]="['SuperGroupPostList', {super_group_name: _super_group.name}]">
                        {{_super_group.name | uppercase}} / &nbsp;<small class="hidden">{{_super_group.description}}</small>
                      </a>
                    </div>
                  </div>

                  <div class="pull-right">
                    <div class="new-post pull-right hidden">
                      <div>
                        <a class="btn btn-sm btn-default new-post-button" [routerLink]="[ 'NewPost', {super_group_name: _super_group.name } ]">
                          <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;New Post
                        </a>
                      </div>
                    </div>
                    <div class="pull-right">
                      <div class="add-supergroups-button">
                        <a class="1pull-right btn btn-sm btn-default new-post-button" [routerLink]="['SuperGroupPostList', {super_group_name: _super_group.name}]">
                          <i class="fa fa-undo" aria-hidden="true"></i>&nbsp;Posts</a>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>    <!-- ! group-details-panel -->

          </div>    <!-- group-details -->

        </div> <!-- !col -->
      </div> <!-- !row -->

      <div *ngIf="_errorMsg">
        <my-error [_errorMsg]="_errorMsg"></my-error>
      </div>
      <div *ngIf="!_errorMsg">
        <div class="row">
          <div class="col-xs-12">
            <my-super_group-sidebar [_super_group]="_super_group" [_groups]="_groups" [_currentUser]="_currentUser" [extendedVersion]="true"></my-super_group-sidebar>
          </div>
        </div>
      </div>
    </div>
    </div>
  `,
  styles: [`
    .my-view-grouplist .group-name-row {
      margin: 15px 0;
    }
    .my-view-grouplist .supergroup-name {
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
    .my-view-grouplist .supergroup-name a {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
    }
    .my-view-grouplist .border-row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    .my-view-grouplist .post-list-area {
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    }
    .my-view-grouplist .new-post {
      /* padding-top: 15px; */
    }
    .my-view-grouplist .new-post-button {
      padding: 3px 15px 3px 10px;
      color: #af2b2b;
    }
    .my-view-grouplist .add-supergroups-button {
      padding-right: 10px;
    }
    `],
  directives: [RouterLink, ErrorComponent, SuperGroupSidebarComponent]
})
export class ViewGroupListComponent implements OnInit {

  private _errorMsg = null;
  private _super_group_name = null;
  private _loggedInUserSubcription = null;
  private _currentUser: User = null;
  private _super_group = null;
  private _groups = null;
  private _hyper_group = null;

  constructor(
    private _routeParams: RouteParams,
    private _userService: UserService,
    private _superGroupService: SuperGroupService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._super_group_name = this._routeParams.get('supergroup');
    //console.log("supergroup", this._super_group_name)

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
        console.log(sg)
        this._errorMsg = null;
        this._super_group = sg.superGroup;
        this._groups = sg.superGroup.groups;
        this._hyper_group = this._super_group.type;
        if ( this._super_group.type == 'international' ) {
          if ( this._currentUser && this._currentUser.national.find( group => group.id === this._super_group.id ) ) {
            this._hyper_group = 'national'
          }
        }
      },
      error => {
        this._errorMsg = error;
      })
  }


}
