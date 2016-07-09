import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {ErrorComponent} from '../misc/error.component';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-super_group-sidebar',
  template: `
  <!--  ------------------------------ Normal Version -------------------------------- -->
  <div *ngIf="_groups && _super_group  && !extendedVersion">
    <div class="my-super_group-sidebar">

      <div class="row">
        <div class="col-xs-12">
          <h5>Groups within {{_super_group.name | uppercase}}:</h5>
        </div>
      </div>
      <div class="row border-row">
        <div class="col-xs-12">
          <div class="group-list">
            <div *ngFor="let group of _groups">
              <div class="clearfix">
                <h4><a class="pull-left" [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">&bull; {{group.name}}
                &nbsp;<small class="hidden">{{group.description}}</small></a>
                </h4>
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

  <!--  ------------------------------ Extended version -------------------------------- -->

  <div *ngIf="_groups && _super_group && extendedVersion">
    <div class="my-super_group-sidebar">

      <div class="row">
        <div class="col-xs-12">
          <h5>Groups within {{_super_group.name | uppercase}}:</h5>
        </div>
      </div>
      <div class="row border-row">
        <div class="col-xs-12">
          <div class="group-list">
            <div *ngFor="let group of _groups">
              <div class="clearfix">
                <h4><a class="pull-left" [routerLink]="['ViewGroup', {super_group_name: _super_group.name, group_name: group.name}]">&bull; {{group.name}}
                &nbsp;<small class="1hidden">{{group.description}}</small></a>
                </h4>
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
      padding-top: 8px;
      paddding-right: 10px;
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
  `],
  directives: [RouterLink, ErrorComponent],
  inputs: ["_groups", "_super_group", "extendedVersion"]

})
export class SuperGroupSidebarComponent implements OnInit {

  private hierarchy: string = null;

  constructor(
    private _userService: UserService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * Subscribe to a Super group into user's hyper group
   */
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

    /**
     * Un subscribe to a Super group into user's given hyper group
     */
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
}
