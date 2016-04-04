/**
 * This is essentialy a container for the User object
 * like ViewPost has post+comments and not just the post,
 * this could have user+other stuff
 */
import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {User} from './user';
import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-edit-user',
  template: `
  <div *ngIf="_loggedInUser">
    <div class="my-edit-user">
      <div class="row">
        <div class="col-xs-12 col-md-offset-3 col-md-6">
          
          <div class="tab-container">
            <div>
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#basic" aria-controls="basic" role="tab" data-toggle="tab">Basic</a></li>
                <li role="presentation"><a href="#geo" aria-controls="geo" role="tab" data-toggle="tab">Geo</a></li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="basic">
                
                  <form class="form-horizontal">
                    <div class="form-group">
                      <label class="col-md-4 control-label">Display Name</label>
                      <p class="form-control-static col-md-8">{{_loggedInUser.displayname}}</p>
                    </div>
                    <div class="form-group">
                      <label class="col-md-4 control-label">Email</label>
                      <p class="form-control-static col-md-8">{{_loggedInUser.email}}</p>
                    </div>
<!--            
            <div class="form-group">
              <label for="displayname">Display Name</label>
              <input id="displayname" type="text" class="form-control" placeholder="{{_model.displayname}}" required
                [(ngModel)] = "_model.displayname"
                ngControl = "displayname" #displayname = "ngForm"
              >
              <div [hidden]="displayname.valid || displayname.pristine" class="alert alert-danger">
                Display name is required
              </div>
            </div>
-->
            
                    <div class="form-group">
                      <label for="password" class="col-md-4 control-label">Password</label>
                      <input id="password" type="password" class="col-md-8 form-control" placeholder="Password" required
                        [(ngModel)] = "_model.password"
                        ngControl="password" #password = "ngForm"
                      >
                      <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
                        Password is required
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <label for="confirm_password" class="col-md-4 control-label">Confirm Password</label>
                      <input id="confirm_password" type="password" class="col-md-8 form-control" placeholder="Confirm Password" required
                        [(ngModel)] = "_model.confirm_password"
                        ngControl="confirm_password" #confirm_password = "ngForm"
                      >
                      <div [hidden]="confirm_password.valid || confirm_password.pristine" class="alert alert-danger">
                        Confirm Password is required
                      </div>
                    </div>
                    
                    <div class="form-group">
                      <div class="col-md-offset-4 col-md-8">
                        <a (click)="onSubmitBasic($event)" class="btn btn-default">Save</a>
                        <a (click)="goBack()" class="btn btn-default">Cancel</a>
                      </div>
                    </div>
                  </form>
                  
                </div>
                <div role="tabpanel" class="tab-pane" id="geo">
                
                  <div>                          
                    <div class="form-horizontal">
                      <div class="form-group">
                        <label class="col-md-4 control-label">International</label>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#international of _loggedInUser.settings.international">
                            {{international}},
                          </span>
                        </p>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label">National</label>
                        <p class="form-control-static col-md-8">
                          {{_loggedInUser.settings.national}}
                        </p>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label">State</label>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#state of _loggedInUser.settings.state">
                              {{state}},
                          </span>
                        </p>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label">City</label>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#city of _loggedInUser.settings.city">
                            {{city}},
                          </span>
                        </p>
                      </div>
                      <div class="form-group">
                        <label class="col-md-4 control-label">Local</label>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#local of _loggedInUser.settings.local">
                            {{local}},
                          </span>
                        </p>
                      </div>
                      <div class="form-group">
                        <div class="col-md-offset-4 col-md-8">
                          <a (click)="onSubmitGeo(user)" class="btn btn-default">Edit</a>
                          <a (click)="goBack()" class="btn btn-default">Back</a>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div> <!-- !tab-content -->
            </div> <!-- !tab -->
          </div>  <!-- !tab-container -->
                
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .my-edit-user .tab-container {
    margin-top: 15px;
  }
  .my-edit-user .tab-pane {
    margin: 15px;
  }
  `],
  directives: []
})
export class EditUserComponent {
  
  private _tab: String = null
  private _loggedInUser: User = null
  private _model: User = null

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService) {
  }
  
  ngOnInit() {
    this._tab = this._routeParams.get('tab')
    console.log(this._tab)
    this._loggedInUser = this._authenticationService.getLoggedInUser()
    this._model = this.cloneObj({}, this._loggedInUser)
    console.log(this._loggedInUser)
  }
  
  onSubmitBasic(event) {
    event.preventDefault();
    console.log(this._loggedInUser)
    console.log(this._model)
    
    /*
    this._userService.updateUser(this.model).then(
      user => {
        this._router.navigate(['ViewUser', {id: user.id}]);        
    });
    */
  }
  
  onSubmitGeo(event) {
    event.preventDefault();
    console.log(this._loggedInUser)
    console.log(this._model)
  }
  
  /**
   * Clone or merge one or more objects. Polyfill of Object.assign
   * Ref: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
   */
  cloneObj(target, source) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }
    return output;
  }  
  
}