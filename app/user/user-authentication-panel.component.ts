import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserService} from './user.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from './user'

@Component({
  selector: 'my-user-authentication-panel',
  template: `
    <div class="my-user-authentication-panel">
      <div *ngIf="!isUserLoggedIn">
        <a [routerLink]="['Login']" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Login
        </a>&nbsp;
        <a [routerLink]="['NewUser']" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Register
        </a>
      </div>
      <div *ngIf="isUserLoggedIn">
        {{loggedInUser.displayname}}
        <button (click)="logout()">Logout</button>
      </div>
    </div>
  `,
  styles: [],
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

  }
  
  logout() {
    this._authenticationService.logoutUser()
  }

}