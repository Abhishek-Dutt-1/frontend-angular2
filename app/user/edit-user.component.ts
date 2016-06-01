/**
 * This is essentialy a container for the User object
 * like ViewPost has post+comments and not just the post,
 * this could have user+other stuff
 */
import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, ROUTER_DIRECTIVES, RouterLink} from '@angular/router-deprecated';
import {User} from './user';
import {AppService} from '../app.service';
import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {AuthenticationService} from '../authentication/authentication.service';
import {SuperGroup} from '../super_group/super_group';
import {SuperGroupService} from '../super_group/super_group.service';
import {ErrorComponent} from '../misc/error.component';

@Component({
  selector: 'my-edit-user',
  template: `
  <div class="my-edit-user">
    <div class="row">
      <div class="col-xs-12 col-md-offset-3 col-md-6">

        <div *ngIf="_errorMsg">
          <my-error [_errorMsg]="_errorMsg"></my-error>
        </div>

        <div *ngIf="_currentUser">
          <div class="tab-container">
            <div id="myTabs">
              <ul class="nav nav-tabs" role="tablist1">
                <li role="presentation" [ngClass]="{active: _tab == 'basic'}">
                  <!--
                  <a href="#basic" aria-controls="basic" role="tab" data-toggle1="tab">Basic</a>
                  -->
                  <a [routerLink]="['EditUser', {tab: 'basic'}]" aria-controls="basic" role="tab" data-toggle1="tab">Basic</a>
                </li>
                <li role="presentation" [ngClass]="{active: _tab == 'geo'}">
                  <!--
                  <a href="#geo" aria-controls="geo" role="tab" data-toggle1="tab">Geo</a>
                  -->
                  <a [routerLink]="['EditUser', {tab: 'geo'}]" aria-controls="geo" role="tab" data-toggle1="tab">Geo</a>
                </li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel1" class="tab-pane" [ngClass]="{active: _tab == 'basic'}" id="basic">

                  <form #editBasicForm="ngForm" class="form-horizontal">

                    <div class="form-group">
                      <label class="col-md-4 control-label">Display Name</label>
                      <p class="form-control-static col-md-8">{{_currentUser.displayname}}</p>
                    </div>

                    <div class="form-group">
                      <label class="col-md-4 control-label">Email</label>
                      <p class="form-control-static col-md-8">{{_currentUser.email}}</p>
                    </div>

                    <div class="form-group">
                      <label class="col-md-4 control-label">Extra Emails</label>
                      <p class="form-control-static col-md-8 hidden">{{_model.extra_emails.length}}</p>
                    </div>
                    <div *ngFor="let counter of _number_of_extra_emails">
                      <div class="form-group">
                        <label for="extra_emails{counter}" class="col-sm-2 control-label">Extra Email #{{counter + 1}}</label>
                        <div class="col-sm-10">
                          <input type="text" name="extra_emails{counter}" id="extra_emails{counter}"
                              [(ngModel)] = "_model.extra_emails[counter].email" class="form-control" (keyup)="validateForm('extra_emails')"
                              placeholder="xyz@mycollege.edu">
                        </div>
                      </div>
                    </div>
                    <div [hidden]="_formErrors.extra_emails.isValid" class="alert alert-danger col-sm-offset-2 col-sm-10">
                      {{_formErrors.extra_emails.errMsg}}
                    </div>
                    <div class="form-group">
                      <div class="col-sm-offset-2 col-sm-10">
                        <button (click)="addMoreEmailDomainInput($event)" class="btn btn-default btn-xs">Add More</button>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="password" class="col-md-4 control-label">Password</label>
                      <div class="col-md-8">
                        <input id="password" type="password" class="form-control" placeholder="Password" required
                          [(ngModel)] = "_model.password"
                          ngControl="password" #password = "ngForm"
                        >
                        <div [hidden]="password.value == '' || password.valid || password.pristine" class="alert alert-danger">
                          Password is required
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="confirm_password" class="col-md-4 control-label">Confirm Password</label>
                      <div class="col-md-8">
                        <input id="confirm_password" type="password" class="form-control" placeholder="Confirm Password" required
                          [(ngModel)] = "_model.confirm_password"
                          ngControl="confirm_password" #confirm_password = "ngForm"
                        >
                        <div [hidden]="(confirm_password.value == password.value) || confirm_password.pristine" class="alert alert-danger">
                          Passwords do not match.
                        </div>
                      </div>
                    </div>

                    <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
                      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                      <span class="sr-only">Error:</span>
                      {{_errorMsg}}
                    </div>

                    <div class="form-group">
                      <div class="col-md-offset-4 col-md-8">
                        <button (click)="onSubmitBasic($event)" class="btn btn-default" [disabled]="confirm_password.value != password.value">Save</button>
                        <button (click)="gotoProfile('basic')" type="button" class="btn btn-default">Cancel</button>
                      </div>
                    </div>

                  </form>

                </div>

                <div role="tabpanel1" class="tab-pane" [ngClass]="{active: _tab == 'geo'}" id="geo">

                  <div class="alert alert-danger" role="alert" [hidden]="!_errorMsgGeo">
                    <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span class="sr-only">Error:</span>
                    {{_errorMsgGeo}}
                  </div>

                  <div>
                    <form #editGeoForm="ngForm" class="form-horizontal">

                      <div class="form-group">
                        <label class="col-md-4 control-label">International</label>
                        <div class="col-md-8">
                          <span *ngFor="let international of _groupList.international">
                            <label class="checkbox-inline">
                              <input type="checkbox" [(ngModel)]="international.selected"> {{international.name}}
                            </label>
                          </span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-md-4 control-label">National</label>
                        <div class="col-md-8">
                          <span *ngFor="let national of _groupList.national">
                            <label class="radio-inline">
                              <input type="radio" (click)="nationalRadioToggle(national.id)" [checked]="national.selected"> {{national.name}}
                            </label>
                          </span>
                        </div>
                      </div>

                      <!--
                      <div class="form-group">
                        <label class="col-md-4 control-label">National</label>
                        <div class="col-md-8">
                          <span *ngFor="#national of _groupList.national">
                            <label class="checkbox-inline">
                              <input type="checkbox" [(ngModel)]="national.selected"> {{national.name}}
                            </label>
                          </span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-md-4 control-label">National</label>
                        <div class="col-md-8">
                          <span *ngFor="#national of _groupList.national">
                            <label class="radio-inline">
                              <input type="radio" (click)="_groupList.selectedNational = national" [checked]="national.id === _groupList.selectedNational.id"> {{national.name}}
                            </label>
                          </span>
                        </div>
                      </div>
                      -->

                      <div class="form-group">
                        <label class="col-md-4 control-label">State</label>
                        <div class="col-md-8">
                          <span *ngFor="let state of _groupList.state">
                            <label class="checkbox-inline">
                              <input type="checkbox" [(ngModel)]="state.selected"> {{state.name}}
                            </label>
                          </span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-md-4 control-label">City</label>
                        <div class="col-md-8">
                          <span *ngFor="let city of _groupList.city">
                            <label class="checkbox-inline">
                              <input type="checkbox" [(ngModel)]="city.selected"> {{city.name}}
                            </label>
                          </span>
                        </div>
                      </div>

                      <div class="form-group">
                        <label class="col-md-4 control-label">Local</label>
                        <div class="col-md-8">
                          <span *ngFor="let local of _groupList.local">
                            <label class="checkbox-inline">
                              <input type="checkbox" [(ngModel)]="local.selected"> {{local.name}}
                            </label>
                          </span>
                        </div>
                      </div>

                      <div class="form-group">
                        <div class="col-md-offset-4 col-md-8">
                          <button (click)="onSubmitGeo($event)" class="btn btn-default">Save</button>
                          <button (click)="gotoProfile('geo')" type="button" class="btn btn-default">Cancel</button>
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
  directives: [RouterLink, ErrorComponent]
})
export class EditUserComponent {

  private _tab: String = 'basic';
  //private _loggedInUser: User = null;
  private _model: any = null;
  private _errorMsg = null;
  private _errorMsgGeo = null;

  private _groupList = {international: [], national: [], state: [], city: [], local: [], selectedNational: {}};
  private _number_of_extra_emails = [];
  private _formErrors = {
    name: {isValid: true, errMsg: ''},
    description: {isValid: true, errMsg: 'YOLO'},
    extra_emails: {isValid: true, errMsg: 'YOLO'},
    isFormValid: false
  }
  private _loggedInUserSubcription = null;
  private _currentUser = null;

  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _router: Router,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _superGroupService: SuperGroupService) {
  }

  ngOnInit() {

    this._tab = this._routeParams.get('tab') || this._tab;
    console.log(this._tab)

    // Only logged in uses can post
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(currentUser => {
      if(currentUser) {
        console.log("CURRENT USER", currentUser)
        this._currentUser = currentUser;
        this.initForms();
        this._errorMsg = null;
      } else {
        this._currentUser = null;
        this._errorMsg = "User must be logged in to edit profile.";
      }
    });
    // Only logged in uses can post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this.initForms();
      this._errorMsg = null;
    } else {
      this._errorMsg = "User must be logged in to edit profile.";
    }
  }

  onSubmitBasic(event) {

    event.preventDefault();
    this._errorMsg = null;

    if ( this._model.password != null ) {
      if ( this._model.password != this._model.confirm_password ) {
        return
      }
    }

    ['extra_emails'].forEach( field => this.validateForm(field) );
    if(this._formErrors.extra_emails.isValid) {
    } else {
      return;
    }

    //this._model.extra_emails = this._model.extra_emails.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    let tmpModel = JSON.parse(JSON.stringify(this._model));
    tmpModel.extra_emails = tmpModel.extra_emails.filter(function(item, i, ar){ return ar.map(emailObj => emailObj.email).indexOf(item.email) === i; });
    tmpModel.extra_emails = tmpModel.extra_emails.filter( emailObj => emailObj.email !== this._currentUser.email );

    this._userService.updateBasicSettings(tmpModel)
      .subscribe(
        res => {
          console.log(res);
          this._authenticationService.updateCurrentUser(res);
          this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: 'basic'}]);
        },
        error => {
          this._errorMsg = error;
        })
  }

  onSubmitGeo(event) {

    event.preventDefault();

    let model = {
      international: [],
      national: [],
      state: [],
      city: [],
      local: []
    };

    model.international = this._groupList.international.filter(el => el.selected == true);
    model.national = this._groupList.national.filter(el => el.selected == true);
    //model.national = this.cloneObj({}, this._groupList.selectedNational);
    model.state = this._groupList.state.filter(el => el.selected == true);
    model.city = this._groupList.city.filter(el => el.selected == true);
    model.local = this._groupList.local.filter(el => el.selected == true);

    console.log(this._groupList.selectedNational);
    console.log(model)

    var geoSettings = JSON.parse(JSON.stringify(model));
    //var geoSettings = this.cloneObj({}, model);

    model.international = model.international.map(el => el.id);
    model.national = model.national.map(el => el.id);
    //if(model.national) model.national = model.national.id;
    model.state = model.state.map(el => el.id);
    model.city = model.city.map(el => el.id);
    model.local = model.local.map(el => el.id);
    console.log(model)

    this._userService.updateGeoSettings(this._currentUser.id, model).subscribe(
      updatedUser => {
        //console.log(updatedUser);
        //console.log(geoSettings);
          //this._authenticationService.refreshLoggedInUser(geoSettings, null);
          this._authenticationService.updateCurrentUser(updatedUser);
          this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: 'geo'}]);
      },
      error => {
        console.log(error);
        this._errorMsgGeo = error;
      });
  }

  /**
   * User pressed cancel
   */
  gotoProfile(tab: string) {
    this._router.navigate(['ViewUser', {id: this._currentUser.id, tab: tab}])
  }

  nationalRadioToggle(nationalId) {
    for(var i in this._groupList.national) {
      if(this._groupList.national[i].id === nationalId) {
        this._groupList.national[i].selected = true; //!this._groupList.national[i].selected;
      } else {
        this._groupList.national[i].selected = false;
      }
    }
    console.log(this._groupList.national);
  }

  /**
   * Clone or merge one or more objects. Polyfill of Object.assign
   * Ref: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
   */
  /*
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
  }         // ! cloneObj()
 */

  /**
   * Display another input box for email domain
   * @param event
   */
  addMoreEmailDomainInput(event) {
    event.preventDefault();
    if(this._number_of_extra_emails.length >= 20) return;
    this._model.extra_emails.push({email: 'email@email.com'});
    this._number_of_extra_emails.push(this._number_of_extra_emails.length);
  }       // !  addMoreEmailDomainInput


  validateForm(field) {

    switch(field) {
      case 'name':
        if(this._model.name.trim() && /^[a-zA-Z0-9-_]+$/.test(this._model.name.trim()) && this._model.name.length < 30) {
          this._formErrors.name.isValid = true;
        } else {
          this._formErrors.name.isValid = false;
          this._formErrors.name.errMsg = "Group name is required. No spaces, only alphabets, numbers, dashes and underscores please. Max 30 characters."
        }
        break;
      case 'description':
        if(this._model.description.trim()) {
          this._formErrors.description.isValid = true;
        } else {
          this._formErrors.description.isValid = false;
          this._formErrors.description.errMsg = "Group description is required.";
        }
        break;
      case 'extra_emails':
        var emailList = [];
        this._model.extra_emails.forEach(function(email) {
          if( email.email.trim() && !( /@(.+)/.test(email.email.trim()) ) ) {
            emailList.push(email.email.trim());
          }
        });
        if(emailList.length > 0) {
          this._formErrors.extra_emails.isValid = false;
          this._formErrors.extra_emails.errMsg = "Invalid email domain: " + emailList.join(", ") + " Email domain's must be of the form @email.com";
        } else {
          this._formErrors.extra_emails.isValid = true;
          this._formErrors.extra_emails.errMsg = '';
        }
        break;
    }
  }       // ! validateForm()

  /**
   * Initialize forms after user is logged in
   */
  initForms() {
    this._number_of_extra_emails = [];
    for (var i = 0; i < this._currentUser.extra_emails.length; i++) {
      this._number_of_extra_emails.push(i);
    }

    // Clone the model, this dosen't clones functions if any
    this._model = JSON.parse(JSON.stringify(this._currentUser));
    console.log(this._model);
    //this._model = this.cloneObj({}, this._currentUser);
    this._model.password = null;
    this._model.confirm_password = null;
    delete this._model.createdAt
    delete this._model.updatedAt
    delete this._model.username
    delete this._model.displayname
    delete this._model.email
    delete this._model.group_membership_pending
    delete this._model.passports
    delete this._model.international
    delete this._model.national
    delete this._model.state
    delete this._model.city
    delete this._model.local
    delete this._model.subscribed_groups
    console.log(this._currentUser)

    this._superGroupService.getAllSuperGroups(false).subscribe( sgList => {

      ["international", "state", "city", "local"].forEach(hyperGroup => {
        this._groupList[hyperGroup] = sgList.filter(sg => sg.type === hyperGroup);
        for(var i = 0, l = this._groupList[hyperGroup].length; i < l; i++) {
          if( this._currentUser[hyperGroup].map(el => el.id).indexOf(this._groupList[hyperGroup][i].id) > -1 ) {
            this._groupList[hyperGroup][i].selected = true;
          }
        }
      });
      // National and International are same SuperGroups
      this._groupList.national = JSON.parse(JSON.stringify(sgList.filter(sg => sg.type === 'international')));
      let hyperGroup = "national"
      for(var i = 0, l = this._groupList[hyperGroup].length; i < l; i++) {
        this._groupList[hyperGroup][i].selected = false;    // selected = false coz international above has made some true
        if( this._currentUser[hyperGroup].map(el => el.id).indexOf(this._groupList[hyperGroup][i].id) > -1 ) {
          this._groupList[hyperGroup][i].selected = true;
        }
      }
    },
    error => {
      this._errorMsgGeo = error;
    });
  }     // !initFroms()

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

}
