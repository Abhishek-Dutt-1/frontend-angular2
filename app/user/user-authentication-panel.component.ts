import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
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
          </a> | 
          <a [routerLink]="['NewUser']">
            Register
          </a>
        </div>
      </div>
      <div *ngIf="isUserLoggedIn">
        <a [routerLink]="['ViewUser', {id: loggedInUser.id}]">{{loggedInUser.displayname}}</a>
        <a class="btn btn-default btn-xs" (click)="logout()">Logout</a>
      </div>
    </div>
  `,
  styles: [`
    .my-user-authentication-panel .not-logged-in a {
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
    _authenticationService.loggedInUser$.subscribe(user => {
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