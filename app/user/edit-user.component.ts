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
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Group_Of_Groups} from '../group_of_groups/group_of_groups';
import {GroupOfGroupsService} from '../group_of_groups/group_of_groups.service';

@Component({
  selector: 'my-edit-user',
  template: `
  <div *ngIf="_loggedInUser">
    <div class="my-edit-user">
      <div class="row">
        <div class="col-xs-12 col-md-offset-3 col-md-6">
          
          <div class="tab-container">
            <div id="myTabs">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" [ngClass]="{active: _tab == 'basic'}">
                  <a href="#basic" aria-controls="basic" role="tab" data-toggle="tab">Basic</a>
                </li>
                <li role="presentation" [ngClass]="{active: _tab == 'geo'}">
                  <a href="#geo" aria-controls="geo" role="tab" data-toggle="tab">Geo</a>

                </li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane" [ngClass]="{active: _tab == 'basic'}" id="basic">
                
                  <form #editBasicForm="ngForm" class="form-horizontal">
                  
                    <div class="form-group">
                      <label class="col-md-4 control-label">Display Name</label>
                      <p class="form-control-static col-md-8">{{_model.displayname}}</p>
                    </div>
                    <div class="form-group">
                      <label class="col-md-4 control-label">Email</label>
                      <p class="form-control-static col-md-8">{{_model.email}}</p>
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input id="password" type="password" class="form-control" placeholder="Password" required
                        [(ngModel)] = "_model.password"
                        ngControl="password" #password = "ngForm"
                      >
                      <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
                        Password is required
                      </div>
                    </div>
                    <br/>
                    <div class="form-group">
                      <label for="confirm_password">Confirm Password</label>
                      <input id="confirm_password" type="password" class="form-control" placeholder="Confirm Password" required
                        [(ngModel)] = "_model.confirm_password"
                        ngControl="confirm_password" #confirm_password = "ngForm"
                      >
                      <div [hidden]="(confirm_password.value == password.value) || confirm_password.pristine" class="alert alert-danger">
                        Passwords do not match.
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
                <div role="tabpanel" class="tab-pane" [ngClass]="{active: _tab == 'geo'}" id="geo">
                
                  <div>                          
                    <form #editGeoForm="ngForm" class="form-horizontal">
                    
                      <div class="form-group">
                        <label class="col-md-4 control-label">International</label>
<div>
<span *ngFor="#international of _groupList.international">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="international.selected"> {{international.name}}
</label>
</span>
</div>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#international of _loggedInUser.settings.international">
                            {{international.name}},
                          </span>
                        </p>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-md-4 control-label">National</label>
<div>
<span *ngFor="#national of _groupList.national">
<label class="radio-inline">
<input type="radio" name="nationalcb" (click)="_groupList.selectedNational = national" [checked]="national.id === _groupList.selectedNational.id"> {{national.name}}
</label>
</span>
</div>
                        <p class="form-control-static col-md-8">
                          {{_loggedInUser.settings.national.name}}
                        </p>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-md-4 control-label">State</label>
<div>
<span *ngFor="#state of _groupList.state">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="state.selected"> {{state.name}}
</label>
</span>
</div>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#state of _loggedInUser.settings.state">
                              {{state.name}},
                          </span>
                        </p>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-md-4 control-label">City</label>
<div>
<span *ngFor="#city of _groupList.city">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="city.selected"> {{city.name}}
</label>
</span>
</div>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#city of _loggedInUser.settings.city">
                            {{city.name}},
                          </span>
                        </p>
                      </div>
                      
                      <div class="form-group">
                        <label class="col-md-4 control-label">Local</label>
<div>
<span *ngFor="#local of _groupList.local">
<label class="checkbox-inline">
<input type="checkbox" [(ngModel)]="local.selected"> {{local.name}}
</label>
</span>
</div>
                        <p class="form-control-static col-md-8">
                          <span *ngFor="#local of _loggedInUser.settings.local">
                            {{local.name}},
                          </span>
                        </p>
                      </div>
                      
                      <div class="form-group">
                        <div class="col-md-offset-4 col-md-8">
                          <a (click)="onSubmitGeo($event)" class="btn btn-default">Edit</a>
                          <a (click)="goBack()" class="btn btn-default">Back</a>
                        </div>
                      </div>
                      
                    </form>
                  </div>
                
                </div>
              </div> <!-- !tab-content -->
            </div> <!-- !myTab -->
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
  //directives: [ROUTER_DIRECTIVES]
})
export class EditUserComponent {
  
  private _tab: String = 'basic'
  private _loggedInUser: User = null
  private _model: any = null

  private _groupList = {international: [], national: [], state: [], city: [], local: [], selectedNational: {}};
  private model = {
    /* email: null,
    displayname: null,
    password: null,
    confirm_password: null,*/
    international: [],
    national: {},
    state: [],
    city: [],
    local: []
  };

  
  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _groupOfGroupsService: GroupOfGroupsService) {
  }
  
  ngOnInit() {
    
    this._tab = this._routeParams.get('tab');
    console.log(this._tab);

    this._loggedInUser = this._authenticationService.getLoggedInUser();
    console.log(this._loggedInUser);
    this._model = this.cloneObj({}, this._loggedInUser);

    this._model.password = null;
    this._model.confirm_password = null;
    
    this._groupOfGroupsService.getGroupOfGroupsByType('international').then( gogList => {
      this._groupList.international = gogList;
      for(var i = 0, l = this._groupList.international.length; i < l; i++) {
        if( this._loggedInUser.settings.international.map(el => el.id).indexOf(this._groupList.international[i].id) > -1 ) {
          this._groupList.international[i].selected = true;
        }
      }
    });
    
    this._groupOfGroupsService.getGroupOfGroupsByType('national').then( gogList => {
      this._groupList.national = gogList;
      this._groupList.selectedNational = this._loggedInUser.settings.national;
      console.log(this._groupList.selectedNational);
    });
    
    this._groupOfGroupsService.getGroupOfGroupsByType('state').then( gogList => {
      this._groupList.state = gogList;
      for(var i = 0, l = this._groupList.state.length; i < l; i++) {
        if( this._loggedInUser.settings.state.map(el => el.id).indexOf(this._groupList.state[i].id) > -1 ) {
          this._groupList.state[i].selected = true;
        }
      }
    });
    
    this._groupOfGroupsService.getGroupOfGroupsByType('city').then( gogList => {
      this._groupList.city = gogList
      for(var i = 0, l = this._groupList.city.length; i < l; i++) {
        if( this._loggedInUser.settings.city.map(el => el.id).indexOf(this._groupList.city[i].id) > -1 ) {
          this._groupList.city[i].selected = true;
        }
      }
    });
    
    this._groupOfGroupsService.getGroupOfGroupsByType('local').then( gogList => {
      this._groupList.local = gogList
      for(var i = 0, l = this._groupList.local.length; i < l; i++) {
        if( this._loggedInUser.settings.local.map(el => el.id).indexOf(this._groupList.local[i].id) > -1 ) {
          this._groupList.local[i].selected = true;
        }
      }
    });

  }
  
  onSubmitBasic(event) {
    event.preventDefault();
    console.log(this._loggedInUser)
    console.log(this._model)
    if(this._model.password != this._model.confirm_password) return
    
    if(this._model.password && this._model.confirm_password) {
      this._userService.changePassword(this._loggedInUser.id, this._model.password).then(
        updatedUser => this._authenticationService.loginUser(updatedUser)
      ).catch(function(err) {
        console.log(err)
      })
    }
    /*
    this._userService.updateUser(this.model).then(
      user => {
        this._router.navigate(['ViewUser', {id: user.id}]);        
    });
    */
  }
  
  onSubmitGeo(event) {
    event.preventDefault();

    this.model.international = this._groupList.international.filter(el => el.selected == true)
    this.model.national = this._groupList.selectedNational
    this.model.state = this._groupList.state.filter(el => el.selected == true)
    this.model.city = this._groupList.city.filter(el => el.selected == true)
    this.model.local = this._groupList.local.filter(el => el.selected == true)
    
    console.log(this.model);
console.log(this._loggedInUser)
    this._userService.updateGeoSettings(this._loggedInUser.id, this.model).then(
      user => {
        this._authenticationService.loginUser(user).then(
          user1 => console.log(user1)
          //user => this._router.navigate(['ViewUser', {id: user.id}])
        ).catch(err => console.log(err))
                
    });
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