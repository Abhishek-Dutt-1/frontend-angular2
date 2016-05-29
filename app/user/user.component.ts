/**
 * Displays a single user
 */
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {Router, RouterLink} from '@angular/router-deprecated';
//import {UserService} from './user.service';
//import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-user',
  template: `
    <div *ngIf="user">
      <div class="my-user">
        <div class="row">
          <div class="col-xs-12 col-md-offset-3 col-md-6">

            <div class="tab-container">
              <div class="myTabs">
                <ul class="nav nav-tabs" role="tablist1">
                  <li role="presentation" [ngClass]="{active: tab == 'basic'}">
                    <!--
                    <a href="#basic" aria-controls="basic" role="tab" data-toggle="tab">Basic</a>
                    -->
                    <a [routerLink]="['ViewUser', {id: user.id, tab: 'basic'}]" aria-controls="basic" role="tab" data-toggle1="tab">Basic</a>
                  </li>
                  <li role="presentation" [hidden]="!ownProfile" [ngClass]="{active: tab == 'geo'}">
                    <!--
                    <a href="#geo" aria-controls="geo" role="tab" data-toggle="tab">Geo</a>
                    -->
                    <a [routerLink]="['ViewUser', {id: user.id, tab: 'geo'}]" aria-controls="geo" role="tab" data-toggle1="tab">Geo</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div role="tabpanel1" class="tab-pane" [ngClass]="{active: tab == 'basic'}" id="basic">

                    <div class="form-horizontal">
                      <div class="form-group">
                        <label class="col-md-4 control-label">Display Name</label>
                        <p class="form-control-static col-md-8">{{user.displayname}}</p>
                      </div>
                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-md-4 control-label">Email</label>
                        <p class="form-control-static col-md-8">{{user.email}}</p>
                      </div>
                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-md-4 control-label">Other Emails</label>
                        <div *ngFor="let email of user.extra_emails">
                          <p class="form-control-static col-md-8">{{email.email}} | {{email.verified}}</p>
                        </div>
                      </div>
                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-md-4 control-label">Password</label>
                        <p class="form-control-static col-md-8"><i>[hidden]</i></p>
                      </div>
                      <div class="form-group" [hidden]="!ownProfile">
                        <div class="col-md-offset-4 col-md-8">
                          <button (click)="gotoEditUser('basic')" class="btn btn-default">Edit</button>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div role="tabpanel1" class="tab-pane" [ngClass]="{active: tab == 'geo'}" id="geo">

                    <div [hidden]="!ownProfile">
                      <div class="form-horizontal">
                        <div class="form-group">
                          <label class="col-md-4 control-label">International</label>
                          <p class="form-control-static col-md-8">
                            <span *ngFor="let international of user.international">
                              {{international.name}},
                            </span>
                          </p>
                        </div>
                        <div class="form-group">
                          <label class="col-md-4 control-label">National</label>
                          <p class="form-control-static col-md-8">
                            <span *ngFor="let national of user.national">
                              {{national.name}}
                            </span>
                          </p>
                        </div>
                        <div class="form-group">
                          <label class="col-md-4 control-label">State</label>
                          <p class="form-control-static col-md-8">
                            <span *ngFor="let state of user.state">
                                {{state.name}},
                            </span>
                          </p>
                        </div>
                        <div class="form-group">
                          <label class="col-md-4 control-label">City</label>
                          <p class="form-control-static col-md-8">
                            <span *ngFor="let city of user.city">
                              {{city.name}},
                            </span>
                          </p>
                        </div>
                        <div class="form-group">
                          <label class="col-md-4 control-label">Local</label>
                          <p class="form-control-static col-md-8">
                            <span *ngFor="let local of user.local">
                              {{local.name}},
                            </span>
                          </p>
                        </div>
                        <div class="form-group">
                          <div class="col-md-offset-4 col-md-8">
                            <button (click)="gotoEditUser('geo')" class="btn btn-default">Edit</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div> <!-- !tab-content -->
              </div> <!-- !tab -->
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .my-user .tab-container {
    margin-top: 15px;
  }
  .my-user .tab-pane {
    margin: 15px;
  }
  `],
  //styleUrls: ['app/post/post.component.css'],
  directives: [RouterLink],
  inputs: ['user', 'ownProfile', 'tab']
})
export class UserComponent {

  private user: User
  private ownProfile: Boolean

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit() {
  }

  gotoEditUser(goWhere:string) {
    this._router.navigate(['EditUser', {tab: goWhere}]);
  }
}
