import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserService} from './user.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-user-authentication-panel',
  template: `
    <div class="my-user-authentication-panel">
      <div>User Logged In {{userLoggedIn}}
        <a [routerLink]="['Login']" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Login
        </a>&nbsp;
        <a [routerLink]="['NewUser']" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Register
        </a>
      </div>
    </div>
  `,
  styles: [],
  directives: [ROUTER_DIRECTIVES]
})
export class UserAuthenticationPanelComponent {
  
  private userLoggedIn = null;
  
  constructor(
    private _userService: UserService,
    private _authenticationService: AuthenticationService
  ) {
    _authenticationService.loggedInUser$.subscribe(user => {this.userLoggedIn = true;})    
  }
  
  ngOnInit() {

  }
    
  goBack() {
    window.history.back();
  }

}