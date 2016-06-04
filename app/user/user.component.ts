/**
 * Displays a single user
 */
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {Router, RouterLink} from '@angular/router-deprecated';
import {UserService} from './user.service';
import {ErrorComponent} from '../misc/error.component';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-user',
  template: `
    <div *ngIf="user">
      <div class="my-user">
        <div class="row">
          <div class="col-xs-12 col-md-offset-3 col-md-6">

            <my-error [_errorMsg]="_errorMsg"></my-error>

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
                      <div class="form-group">
                        <label class="col-md-4 control-label">Profile Image</label>
                        <img *ngIf="user.profileimage" src="{{user.profileimage}}" class="profileimage">
                        <div *ngIf="!_editProfileImage && ownProfile" >
                          <p *ngIf="!user.profileimage" class="form-control-static col-md-8"><i>[No Profile Image]</i></p>
                          <button class="btn btn-xs btn-default" (click)="_editProfileImage = true">Change Profile Image</button>
                        </div>
                        <div *ngIf="_editProfileImage && ownProfile">
                          <input type="text" class="form-control col-md-8" placeholder="Image url" [(ngModel)]="_editInPlaceModel.profileimage">
                          <button class="btn btn-xs btn-default" (click)="updateProfileImage()">Save</button>
                          <button class="btn btn-xs btn-default" (click)="_editProfileImage = false">Cancel</button>
                        </div>

                      </div>
                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-md-4 control-label">Email</label>
                        <p class="form-control-static col-md-8">{{user.email}} | Verified: {{user.emailverified}}
                          <span *ngIf="!user.emailverified">| <span (click)="resendVerificationEmail(user.email)">Resend Verification Email</span></span>
                        </p>
                      </div>
                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-md-4 control-label">Extra Emails</label>
                        <div *ngFor="let email of user.extra_emails">
                          <p class="form-control-static col-md-8">{{email.email}} | Verified: {{email.emailverified}}
                            <span *ngIf="!email.emailverified">| <span (click)="resendVerificationEmail(email.email)">Resend Verification Email</span></span>
                            | <span (click)="deleteExtraEmail(email.id)"> DELETE EMAIL </span>
                          </p>
                        </div>
                        <div *ngIf="!_editInPlaceModel.showForm.addExtraEmail">
                          <button class="btn btn-xs btn-default" (click)="_editInPlaceModel.showForm.addExtraEmail = true">Add Extra Email</button>
                        </div>
                        <div *ngIf="_editInPlaceModel.showForm.addExtraEmail">
                          <div>
                            <input type="text" placeholder="email@domain.com" [(ngModel)]="_editInPlaceModel.extraEmail"
                              (keyup)="validateEmail(_editInPlaceModel.extraEmail)" class="form-control" >
                              <div [hidden]="_editInPlaceModel.errors.extraEmail.isValid" class="alert alert-danger col-sm-12">
                                Invalid email.
                              </div>
                              <button class="btn btn-xs btn-default" (click)="addExtraEmail()" [disabled]="!_editInPlaceModel.errors.extraEmail.isValid" >Save</button>
                              <button class="btn btn-xs btn-default" (click)="_editInPlaceModel.showForm.addExtraEmail = false">Cancel</button>
                            </div>
                        </div>
                      </div>


                      <div class="form-group" [hidden]="!ownProfile">
                        <div *ngIf="!_editInPlaceModel.showForm.resetPassword">
                          <label class="col-md-4 control-label">Password</label>
                          <p class="form-control-static col-md-8"><i>[hidden]</i></p>
                          <button class="btn btn-xs btn-default" (click)="_editInPlaceModel.showForm.resetPassword = true">Change Password</button>
                        </div>
                        <div *ngIf="_editInPlaceModel.showForm.resetPassword">
                          <div>
                            <label for="resetPassword" class="col-md-4 control-label">Password</label>
                            <input id="resetPassword" type="password" [(ngModel)]="_editInPlaceModel.resetPassword" (keyup)="validatePassword()" class="form-control" minlength="8">
                            <div [hidden]="_editInPlaceModel.errors.resetPassword.minlength" class="alert alert-danger col-sm-12">
                                Password must be atleast 8 characters long.
                            </div>
                            <label for="resetPasswordConfirm" class="col-md-4 control-label">Confirm Password</label>
                            <input id="resetPasswordConfirm" type="password" [(ngModel)]="_editInPlaceModel.resetPasswordConfirm" (keyup)="validatePasswordConfirm()" class="form-control">
                            <div [hidden]="_editInPlaceModel.errors.resetPassword.passwordMatch" class="alert alert-danger col-sm-12">
                                Passwords do not match.
                            </div>
                            <button class="btn btn-xs btn-default" (click)="resetPassword()" [disabled]="!_editInPlaceModel.errors.resetPassword.isValid">Save</button>
                            <button class="btn btn-xs btn-default" (click)="_editInPlaceModel.showForm.resetPassword = false">Cancel</button>
                          </div>
                        </div>

                      </div>

                      <div class="form-group" [hidden]="true || !ownProfile">
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
  .my-user .profileimage {
    height: 100px;
  }
  `],
  //styleUrls: ['app/post/post.component.css'],
  directives: [RouterLink, ErrorComponent],
  inputs: ['user', 'ownProfile', 'tab']
})
export class UserComponent {

  private user: User;
  private ownProfile: Boolean = false;
  private _errorMsg = null;
  private _editInPlaceModel = {
    profileimage  : '',
    extraEmail    : '',
    resetPassword : '',
    resetPasswordConfirm : '',
    errors: {
      profileimage : {},
      extraEmail   : { isValid: true },
      resetPassword: { minlength: true, passwordMatch: true, isValid: false }
    },
    showForm: {
      editProfileImage : false,
      addExtraEmail    : false,
      resetPassword    : false,
    }
  };

  // Local vars to toggle in place inputs
  private _editProfileImage: boolean = false;
  private _addExtraEmail: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  gotoEditUser(goWhere:string) {
    this._router.navigate(['EditUser', {tab: goWhere}]);
  }

  /**
   * Resend email verification email
   */
  resendVerificationEmail(email) {
      this._userService.resendVerificationEmail(email).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("Error", error);
          this._errorMsg = error;
        }
      )
  }


  /**
   * Update profile image url
   */
  updateProfileImage() {
      console.log(this._editInPlaceModel.profileimage)
      this._userService.updateProfileImage( this._editInPlaceModel.profileimage ).subscribe(
        data => {
          this._authenticationService.updateCurrentUser(data);
          this.user.profileimage = data.profileimage;
          this._errorMsg = null;
          this._editProfileImage = false;
        },
        error => {
          console.log(error);
          this._errorMsg = error;
        }
      )
  }

  /**
   * Add extra email
   */
  addExtraEmail() {
    console.log(this._editInPlaceModel.extraEmail)
    this._userService.addExtraEmail( this._editInPlaceModel.extraEmail ).subscribe(
      data => {
        this._authenticationService.updateCurrentUser(data);
        this.user.extra_emails = data.extra_emails;
        this._errorMsg = null;
        this._editInPlaceModel.extraEmail = '';
        this._editInPlaceModel.showForm.addExtraEmail = false;
      },
      error => {
        console.log(error);
        this._errorMsg = error;
      }
    )
  }

  /**
   * Check if email looks like an email
   */
  validateEmail( email: string ) {
    if( /@(.+)/.test( email.trim() ) ) {
      this._editInPlaceModel.errors.extraEmail.isValid = true;
    } else {
      this._editInPlaceModel.errors.extraEmail.isValid = false;
    }
  }

  /**
   *  Delete an extra email
   */
  deleteExtraEmail( extraEmailId: string ) {
    this._userService.deleteExtraEmail( extraEmailId ).subscribe(
      data => {
        console.log(data);
        this._authenticationService.updateCurrentUser(data);
        this.user.extra_emails = data.extra_emails;
        this._errorMsg = null;
        this._editInPlaceModel.extraEmail = '';
        this._editInPlaceModel.showForm.addExtraEmail = false;
      },
      error => {
        console.log(error);
        this._errorMsg = error;
      }
    )
  }
  /**
   * Check if the password is 8 char long
   */
  validatePassword() {
    if ( this._editInPlaceModel.resetPassword.length < 8 ) {
      this._editInPlaceModel.errors.resetPassword.minlength = false;
    } else {
      this._editInPlaceModel.errors.resetPassword.minlength = true;
    }
    this._editInPlaceModel.errors.resetPassword.isValid = this._editInPlaceModel.errors.resetPassword.minlength && this._editInPlaceModel.errors.resetPassword.passwordMatch;
  }
  /**
   * Check if the password's match
   */
  validatePasswordConfirm() {
    if ( this._editInPlaceModel.resetPassword === this._editInPlaceModel.resetPasswordConfirm ) {
      this._editInPlaceModel.errors.resetPassword.passwordMatch = true;
    } else {
      this._editInPlaceModel.errors.resetPassword.passwordMatch = false;
    }
    this._editInPlaceModel.errors.resetPassword.isValid = this._editInPlaceModel.errors.resetPassword.minlength && this._editInPlaceModel.errors.resetPassword.passwordMatch;
  }
  /**
   * Save the password
   */
  resetPassword() {
    if ( this._editInPlaceModel.resetPassword !== this._editInPlaceModel.resetPasswordConfirm ) return;
    this._userService.resetPassword( this._editInPlaceModel.resetPassword ).subscribe(
      data => {
        console.log(data);
        //this._authenticationService.updateCurrentUser(data);
        //this.user.extra_emails = data.extra_emails;
        this._errorMsg = null;
        //this._editInPlaceModel.extraEmail = '';
        this._editInPlaceModel.showForm.resetPassword = false
      },
      error => {
        console.log(error);
        this._errorMsg = error;
      })
  }

}
