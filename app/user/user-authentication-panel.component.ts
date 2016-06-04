import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {UserService} from './user.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from './user'

@Component({
  selector: 'my-user-authentication-panel',
  template: `
    <div class="my-user-authentication-panel">
      <div class="not-logged-in">
        <div *ngIf="!isUserLoggedIn">
          <a [routerLink]="['Login']">
            Login
          </a><span class="auth-pipe"> | </span>
          <a [routerLink]="['NewUser']">
            Sign up
          </a>
        </div>
      </div>
      <div *ngIf="isUserLoggedIn">
        <a [routerLink]="['ViewUser', {id: loggedInUser.id}]" class="displayname">{{loggedInUser.displayname}}</a>
        <span class="auth-pipe"> | </span>
        <a class="auth-logout" (click)="logout()">Logout</a>
      </div>
    </div>
  `,
  styles: [`
    .my-user-authentication-panel .not-logged-in a {
      color: white;
    }
    .my-user-authentication-panel .auth-pipe {
      color: white;
    }
    .my-user-authentication-panel a.displayname {
      color: white;
      white-space: nowrap;
      text-overflow: clip;
      overflow: scroll;
    }
    .my-user-authentication-panel a.auth-logout {
      color: white;
    }
  `],
  directives: [ROUTER_DIRECTIVES]
})
export class UserAuthenticationPanelComponent {

  private isUserLoggedIn = false;
  private loggedInUser:User = null;

  constructor(
    private _userService: UserService,
    private _authenticationService: AuthenticationService
  ) {
    this._authenticationService.loggedInUser$.subscribe(user => {
      if(user) {
        this.loggedInUser = user;
        this.isUserLoggedIn = true;
      } else {
        this.loggedInUser = user;
        this.isUserLoggedIn = false;
      }
    });
  }

  ngOnInit() {
    // Apperently Auth service and its constructor are run before this component is able to subscribe.
    // So old user fetched from localStorage, while is update in the auth service,
    // is not notified to this component, so on init we check for userlogin manually once
    this.loggedInUser = this._authenticationService.getLoggedInUser() || this.loggedInUser;
    this.isUserLoggedIn = this.loggedInUser? true : false || this.isUserLoggedIn
  }

  logout() {
    this._authenticationService.logoutUser()
  }

}
