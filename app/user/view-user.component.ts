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
  selector: 'my-view-user',
  template: `
    <div class="my-view-user">
      <my-user [user]="_user" [ownProfile]="_ownProfile"></my-user>
    </div>
  `,
  directives: [UserComponent]
})
export class ViewUserComponent {
  
  private _user: User
  private _loggedInUser:User = null
  private _ownProfile = false
  
  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService
    ) {
  }
  
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._loggedInUser = this._authenticationService.getLoggedInUser()
    if(this._loggedInUser) {
      this._ownProfile = this._loggedInUser.id == id
    }
    this._userService.getUser(id).then(user => this._user = user)
    
  }
  
}