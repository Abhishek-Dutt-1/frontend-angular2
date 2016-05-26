import {Component, OnInit} from '@angular/core';
import {RouteParams, Router} from '@angular/router-deprecated';
import {AuthenticationService} from './authentication.service';
import {AppService} from '../app.service';

@Component({
  selector: 'my-authentication',
  template: `
  <div class="my-authentication">
    <div class="row">
      <div class="col-xs-12 col-md-offset-3 col-md-6">

        <h3>Welcome fellow human!</h3>
        <div class="alert alert-danger" role="alert" [hidden]="!_errorMsg">
          <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          <span class="sr-only">Error:</span>
          {{_errorMsg}}
        </div>
        <form #loginForm="ngForm">

          <!--
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" class="form-control" placeholder="Email" required
              [(ngModel)] = "model.email"
              ngControl = "email" #email = "ngForm"
              (click)="clearErrorMsg()"
            >
            <div [hidden]="email.valid || email.pristine" class="alert alert-danger">
              Email is required
            </div>
          </div>
          -->
          <div class="form-group">
            <label for="identifier">Email</label>
            <input id="identifier" type="text" class="form-control" placeholder="Email" required
              [(ngModel)] = "model.identifier"
              ngControl = "identifier" #identifier = "ngForm"
              (click)="clearErrorMsg()"
            >
            <div [hidden]="identifier.valid || identifier.pristine" class="alert alert-danger">
              Email is required
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" placeholder="Password" required
              [(ngModel)] = "model.password"
              ngControl="password" #password = "ngForm"
              (click)="clearErrorMsg()"
            >
            <div [hidden]="password.valid || password.pristine" class="alert alert-danger">
              Password is required
            </div>
          </div>

          <div>
            <button (click)="onSubmit($event)" [disabled]="!loginForm.form.valid" class="btn btn-default">Submit</button>
            <button (click)="goBack()" class="btn btn-default">Go Back</button>
          </div>

          <div>
            <div [hidden]="!errorMsg">
              {{errorMsg}}
            </div>
          </div>

        </form>

      </div>
    </div>
  </div>
  `,
})
export class AuthenticationComponent {

  model = {
    //email: null,
    identifier: null,
    password: null
  };
  private _errorMsg = null;

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _appService: AppService) { }

  onSubmit(event) {

    event.preventDefault();

    this._authenticationService.loginUser(this.model).subscribe(
      user => {
        if(user) {
          this._router.navigate(['ViewUser', {id: user.id}]);
        }
      },
      error => {
        console.log(error)
        this._errorMsg = error;
      }
    );

  }

  clearErrorMsg() {
    this._errorMsg = null;
  }

  goBack() {
    window.history.back();
  }

}
