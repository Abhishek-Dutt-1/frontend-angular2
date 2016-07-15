/**
 * Displays a single user
 */
import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {Router, RouterLink} from '@angular/router-deprecated';
import {UserService} from './user.service';
import {ErrorComponent} from '../misc/error.component';
import {AuthenticationService} from '../authentication/authentication.service';
import {AppService} from '../app.service';

@Component({
  selector: 'my-user',
  template: `
    <div *ngIf="user">
      <div class="my-user">

        <div class="row">
          <div class="col-xs-12 col-md-12">

            <my-error [_error]="_error"></my-error>

            <div class="tab-container">
              <div class="myTabs">

                <div class="tab-content">
                  <div role="tabpanel1" class="tab-pane" [ngClass]="{active: tab == 'basic'}" id="basic">

                    <div class="form-horizontal">

                      <div class="form-group">
                        <label class="col-sm-2 control-label">Display Name</label>
                        <p class="form-control-static col-sm-10">{{user.displayname}}</p>
                      </div>

                      <div class="form-group" *ngIf="ownProfile">
                        <label class="col-sm-2 control-label">Profile Image</label>
                        <div class="col-sm-10">
                          <img *ngIf="user.profileimage" src="{{user.profileimage}}" class="profileimage">
                          <div *ngIf="!_editProfileImage" >
                            <div *ngIf="!user.profileimage" class="form-control-static"><i>Too #cool for profile pic.</i></div>
                            <button class="btn btn-xs btn-default" (click)="_editProfileImage = true">Change Profile Image</button>
                          </div>
                          <div *ngIf="_editProfileImage">
                            <div class="row">
                              <div class="col-xs-12">
                                <input type="text" class="form-control" placeholder="Image url" [(ngModel)]="_editInPlaceModel.profileimage">
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-xs-12">
                                <button class="btn btn-xs btn-default" (click)="updateProfileImage()">Save</button>
                                <button class="btn btn-xs btn-default" (click)="_editProfileImage = false">Cancel</button>
                              </div>
                            </div>    <!-- ! row -->

                          </div>
                        </div>
                      </div>

                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-sm-2 control-label">Primary Email</label>
                        <div class="form-control-static col-sm-10">{{user.email}}
                          <i *ngIf="user.emailverified" class="fa fa-check-circle-o email-tick verified" aria-hidden="true"></i>
                          <i *ngIf="!user.emailverified" class="fa fa-exclamation-circle email-tick notverified" aria-hidden="true"></i>
                          <span *ngIf="!user.emailverified">
                            <span class="btn btn-xs btn-default" (click)="resendVerificationEmail(user.email)">Resend Verification Email</span>
                          </span>
                        </div>
                      </div>

                      <div class="form-group" [hidden]="!ownProfile">
                        <label class="col-sm-2 control-label">Extra Emails</label>
                        <div class="col-sm-10">

                          <div class="row">
                            <div class="col-xs-12">
                              <div *ngFor="let email of user.extra_emails">
                                <div class="form-control-static">{{email.email}}
                                  <i *ngIf="email.emailverified" class="fa fa-check-circle-o email-tick verified" aria-hidden="true"></i>
                                  <i *ngIf="!email.emailverified" class="fa fa-exclamation-circle email-tick notverified" aria-hidden="true"></i>
                                  <span *ngIf="!email.emailverified">
                                    <span class="btn btn-xs btn-default" (click)="resendVerificationEmail(email.email)">Resend Verification Email</span>
                                  </span>
                                  <span class="btn btn-xs btn-default" (click)="deleteExtraEmail(email.id)">Remove Email</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-xs-12">
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
                          </div>

                        </div>
                      </div>


                      <div class="form-group" [hidden]="!ownProfile">

                        <div *ngIf="!_editInPlaceModel.showForm.resetPassword">
                          <label class="col-sm-2 control-label">Password</label>
                          <div class="col-sm-10">
                            <p class="form-control-static"><i>[hidden]</i></p>
                            <button class="btn btn-xs btn-default" (click)="_editInPlaceModel.showForm.resetPassword = true">Change Password</button>
                          </div>
                        </div>

                        <div *ngIf="_editInPlaceModel.showForm.resetPassword">
                          <div>
                            <label for="resetPassword" class="col-sm-2 control-label">Password</label>
                            <div class="col-sm-10">
                              <input id="resetPassword" type="password" [(ngModel)]="_editInPlaceModel.resetPassword" (keyup)="validatePassword()" class="form-control" minlength="8">
                              <div [hidden]="_editInPlaceModel.errors.resetPassword.minlength" class="alert alert-danger col-sm-12">
                                  Password must be atleast 8 characters long.
                              </div>
                            </div>
                            <label for="resetPasswordConfirm" class="col-sm-2 control-label">Confirm Password</label>
                            <div class="col-sm-10">
                              <input id="resetPasswordConfirm" type="password" [(ngModel)]="_editInPlaceModel.resetPasswordConfirm" (keyup)="validatePasswordConfirm()" class="form-control">
                              <div [hidden]="_editInPlaceModel.errors.resetPassword.passwordMatch" class="alert alert-danger">
                                  Passwords do not match.
                              </div>
                            </div>
                            <div class="col-sm-offset-2 col-sm-10">
                              <button class="btn btn-xs btn-default" (click)="resetPassword()" [disabled]="!_editInPlaceModel.errors.resetPassword.isValid">Save</button>
                              <button class="btn btn-xs btn-default" (click)="_editInPlaceModel.showForm.resetPassword = false">Cancel</button>
                            </div>
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
  .my-user .email-tick {
    font-size: 1.4em;
  }
  .my-user .verified {
    color: green;
  }
  .my-user .notverified {
    color: red;
  }
  `],
  //styleUrls: ['app/post/post.component.css'],
  directives: [RouterLink, ErrorComponent],
  inputs: ['user', 'ownProfile', 'tab']
})
export class UserComponent {

  private user: User;
  private ownProfile: Boolean = false;
  private _error = { msg: null, type: null };
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
    private _appService: AppService,
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
          //console.log(data);
          this._appService.createNotification( { text: data, type: 'success', timeout: 20000 } );
        },
        error => {
          //console.log("Error", error);
          this._error.msg = error;
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
          this._error.msg = null;
          this._editProfileImage = false;
          this._appService.createNotification( { text: 'Success!', type: 'success', timeout: 5000 } );
        },
        error => {
          // console.log(error);
          this._error.msg = error;
        }
      )
  }

  /**
   * Add extra email
   */
  addExtraEmail() {
    // console.log(this._editInPlaceModel.extraEmail)
    this._userService.addExtraEmail( this._editInPlaceModel.extraEmail ).subscribe(
      data => {
        this._authenticationService.updateCurrentUser(data);
        this.user.extra_emails = data.extra_emails;
        this._error.msg = null;
        this._editInPlaceModel.extraEmail = '';
        this._editInPlaceModel.showForm.addExtraEmail = false;
      },
      error => {
        // console.log(error);
        this._error.msg = error;
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
        this._error.msg = null;
        this._editInPlaceModel.extraEmail = '';
        this._editInPlaceModel.showForm.addExtraEmail = false;
      },
      error => {
        // console.log(error);
        this._error.msg = error;
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
        // console.log(data);
        //this._authenticationService.updateCurrentUser(data);
        //this.user.extra_emails = data.extra_emails;
        this._error.msg = null;
        //this._editInPlaceModel.extraEmail = '';
        this._editInPlaceModel.showForm.resetPassword = false
      },
      error => {
        // console.log(error);
        this._error.msg = error;
      })
  }

}
