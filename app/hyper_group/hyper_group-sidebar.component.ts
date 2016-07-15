import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
// import {ErrorComponent} from '../misc/error.component';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {AppService} from '../app.service';

@Component({
  selector: 'my-hyper_group-sidebar',
  template: `
  <div *ngIf="hierarchy && !extendedVersion">
    <div class="my-hyper_group-sidebar">

      <!--
      <my-error [_errorMsg]="_errorMsg"></my-error>
      -->

      <!-- User's Super Groups -->
      <div class="row1 section" *ngIf="hierarchy.sg.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <div>Your {{hyperGroup | uppercase}} Supergroups:</div>
          </div>
        </div>
        <div class="row1">

          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.sg">
              <div class="row">
                <div class="col-xs-12">
                  <h4 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}} /</a></h4>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="unSubscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-minus" aria-hidden="true"></i></div></div>
                </div>
              </div>
              <div class="row hidden">
                <div class="col-xs-12">
                  <div>{{sg.description}}</div>
                </div>
              </div>
              <div class="row hidden">
                <div class="col-xs-12">
                  <dl>
                    <div *ngFor="let group of sg.groups">
                      <dt><a [routerLink]="['ViewGroup', {super_group_name: sg.name, group_name: group.name}]">{{group.name}}</a></dt>
                      <dd>{{group.description}}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row1 -->

      <!-- Suggested Super Groups -->
      <div class="row1 section" *ngIf="hierarchy.suggestedSgs.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <div>Suggested {{hyperGroup | uppercase}} Supergroups:</div>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.suggestedSgs">
              <div class="row">
                <div class="col-xs-12">
                  <h5 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}} /</a></h5>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="subscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-plus" aria-hidden="true"></i></div></div>
                </div>
              </div>
            </div>

            <div class="row" *ngIf="hierarchy.suggestedSgs.length >= 10">
              <div class="col-xs-12">
                <div class="view-more">
                  <div [routerLink]="[ 'SupergroupSelection', { hypergroup: hyperGroup } ]">
                    View All
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>    <!-- row1 -->


      <!-- Other available Super Groups -->
      <div class="row1 section" *ngIf="hierarchy.otherSg.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <div>More {{hyperGroup | uppercase}} Supergroups:</div>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.otherSg">
              <div class="row">
                <div class="col-xs-12">
                  <h5 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}} /</a></h5>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="subscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-plus" aria-hidden="true"></i></div></div>
                </div>
              </div>
            </div>

            <div class="row" *ngIf="hierarchy.otherSg.length >= 10">
              <div class="col-xs-12">
                <div class="view-more">
                  <div [routerLink]="[ 'SupergroupSelection', { hypergroup: hyperGroup } ]">
                    View All
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>    <!-- row1 -->

      <div class="row section">
        <div class="col-xs-12">
          <div class="message-meta">
            Suggestion for a new Group? Message us at <a [routerLink]="['ViewGroup', {super_group_name: 'Global', group_name: 'Meta'}]">GLOBAL/Meta</a>.
          </div>
        </div>
      </div>  <!-- !row -->

    </div>
  </div>    <!-- ngIf -->

<!--  ------------------------------ Extended version -------------------------------- -->

  <div *ngIf="hierarchy && extendedVersion">
    <div class="my-hyper_group-sidebar">

      <my-error [_errorMsg]="_errorMsg"></my-error>

      <!-- User's Super Groups -->
      <div class="row1 section" *ngIf="hierarchy.sg.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <h4>Your {{hyperGroup | uppercase}} Supergroups:</h4>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.sg">
              <div class="row">
                <div class="col-xs-12">
                  <h4 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}} /</a></h4>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="unSubscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-minus" aria-hidden="true"></i></div></div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div>{{sg.description}}</div>
                </div>
              </div>
              <div class="row hidden">
                <div class="col-xs-12">
                  <dl>
                    <div *ngFor="let group of sg.groups">
                      <dt><a [routerLink]="['ViewGroup', {super_group_name: sg.name, group_name: group.name}]">{{group.name}}</a></dt>
                      <dd>{{group.description}}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row1 -->

      <!-- Suggested Super Groups -->
      <div class="row1 section" *ngIf="hierarchy.suggestedSgs.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <h4>Suggested {{hyperGroup | uppercase}} Supergroups:</h4>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.suggestedSgs">
              <div class="row">
                <div class="col-xs-12">
                  <h5 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}} /</a></h5>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="subscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-plus" aria-hidden="true"></i></div></div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div>{{sg.description}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row1 -->


      <!-- Other available Super Groups -->
      <div class="row1 section" *ngIf="hierarchy.otherSg.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <h4>More {{hyperGroup | uppercase}} Supergroups:</h4>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.otherSg">
              <div class="row">
                <div class="col-xs-12">
                  <h5 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}} /</a></h5>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="subscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-plus" aria-hidden="true"></i></div></div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div>{{sg.description}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row1 -->

      <div class="row section">
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
    .my-hyper_group-sidebar {
      padding-top: 10px;
    }
    .my-hyper_group-sidebar .section {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      margin-bottom: 15px;
      margin-top: 15px;
      padding-bottom: 15px;
    }
    .my-hyper_group-sidebar a {
      color: #af2b2b;
    }
    .my-hyper_group-sidebar .add-super-group-plus {
      padding-top: 8px;
      paddding-right: 10px;
      cursor: pointer;
    }
    .my-hyper_group-sidebar .message-meta {
      font-style: italic;
      font-size: x-small;
    }
    .my-hyper_group-sidebar .view-more {
      cursor: pointer;
      font-weight: bold;
      font-size: 0.9em;
      margin: 10px 0 5px 0;
      /* text-align: center; */
      color: rgba(0, 0, 0, 0.3);
    }
  `],
  //directives: [RouterLink, ErrorComponent],
  directives: [RouterLink],
  inputs: ["hierarchy", "hyperGroup", "extendedVersion"]

})
export class HyperGroupSidebarComponent implements OnInit {

  private hierarchy: string = null;
  //private _errorMsg  = null;

  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  /**
   * Subscribe to a Super group into user's hyper group
   */
  subscribeSuperGroup(sg: any, hyperGroup: string) {
    //console.log("Subbing SG", sg);
    this._userService.subscribeSuperGroup(sg.id, hyperGroup).subscribe(
      updatedUser => {
        //console.log("Success", updatedUser)
        this._authenticationService.updateCurrentUser(updatedUser);
        //this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: 'geo'}]);
        this._appService.createNotification( { text: "Subscribed to Supergroup '" + sg.name + "'", type: 'success' } );
      },
      error => {
        // this._errorMsg = error;
        this._appService.createNotification( { text: error, type: 'danger' } );
      });
  }

    /**
     * Un subscribe to a Super group into user's given hyper group
     */
    unSubscribeSuperGroup(sg: any, hyperGroup: string) {
      console.log("Un Subbing SG", sg);
      this._userService.unSubscribeSuperGroup(sg.id, hyperGroup).subscribe(
        updatedUser => {
          //console.log("Success", updatedUser)
          this._authenticationService.updateCurrentUser(updatedUser);
          //this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: 'geo'}]);
          this._appService.createNotification( { text: "Unsubscribed from Supergroup '" + sg.name + "'", type: 'success' } );
        },
        error => {
          //this._errorMsg = error;
          this._appService.createNotification( { text: error, type: 'danger' } );
        });
    }
}
