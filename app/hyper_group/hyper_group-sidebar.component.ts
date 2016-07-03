import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, RouterLink} from '@angular/router-deprecated';
import {ErrorComponent} from '../misc/error.component';
import {UserService} from '../user/user.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-hyper_group-sidebar',
  template: `
  <div *ngIf="hierarchy">
    <div class="my-hyper_group-sidebar">

      <!-- User's Super Groups -->
      <div class="row1">
        <div class="row">
          <div class="col-xs-12">
            <h5>Your {{hyperGroup | uppercase}} Groups:</h5>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.sg">
              <div class="row">
                <div class="col-xs-12">
                  <h4 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name | uppercase}} /</a></h4>
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
      <div class="row1" *ngIf="hierarchy.suggestedSgs.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <h5>Suggested {{hyperGroup | uppercase}} Groups:</h5>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.suggestedSgs">
              <div class="row">
                <div class="col-xs-12">
                  <h5 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name | uppercase}} /</a></h5>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="subscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-plus" aria-hidden="true"></i></div></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row1 -->


      <!-- Other available Super Groups -->
      <div class="row1" *ngIf="hierarchy.otherSg.length > 0">
        <div class="row">
          <div class="col-xs-12">
            <h5>More {{hyperGroup | uppercase}} Groups:</h5>
          </div>
        </div>
        <div class="row1">
          <div *ngIf="hierarchy">
            <div *ngFor="let sg of hierarchy.otherSg">
              <div class="row">
                <div class="col-xs-12">
                  <h5 class="pull-left"><a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name | uppercase}} /</a></h5>
                  <div class="pull-right"><div class="add-super-group-plus" (click)="subscribeSuperGroup(sg, hyperGroup)"><i class="fa fa-plus" aria-hidden="true"></i></div></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>    <!-- row1 -->

      <div class="row">
        <div class="col-xs-12">
          <div class="message-meta">
            Suggestion for a new Group? Message us at <a [routerLink]="['ViewGroup', {super_group_name: 'Global', group_name: 'Meta'}]">GLOBAL/Meta</a>.
          </div>
        </div>
      </div>  <!-- !row -->

    </div>
  </div>    <!-- ngIf -->
  `,
  styles: [`
    .my-hyper_group-sidebar {
      padding-top: 10px;
    }
    .my-hyper_group-sidebar a {
      color: #af2b2b;
    }
    .my-hyper_group-sidebar .add-super-group-plus {
      padding-top: 8px;
      paddding-right: 10px;
    }
    .my-hyper_group-sidebar .message-meta {
      font-style: italic;
      font-size: x-small;
      margin-top: 15px;
    }
  `],
  directives: [RouterLink, ErrorComponent],
  inputs: ["hierarchy", "hyperGroup"]

})
export class HyperGroupSidebarComponent implements OnInit {

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
