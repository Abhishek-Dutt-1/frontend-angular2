/**
 * This is essentialy a container for the User object
 * like ViewPost has post+comments and not just the post,
 * this could have user+other stuff
 */
import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {AppService} from '../app.service';
import {User} from './user';
import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-view-user',
  template: `
    <div class="my-view-user">
      <div class="errorMsg alert alert-danger" role="alert" [hidden]="!_errorMsg">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        <span class="sr-only">Error:</span>
        {{_errorMsg}}
      </div>
      <my-user [user]="_user" [ownProfile]="_ownProfile" [tab]="_tab"></my-user>
    </div>
  `,
  styles: [`
  .my-view-user .errorMsg {
    margin-top: 20px;
  }
  `],
  directives: [UserComponent]
})
export class ViewUserComponent {
  
  private _tab: string = 'basic';
  private _user: User = null;
  private _loggedInUser:User = null;
  private _ownProfile = false;
  private _errorMsg = false;
  
  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _appService: AppService
    ) {
  }
  
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._tab = this._routeParams.get('tab') || this._tab;


    if(this._appService.getSiteParams().servicesMode === 'local') {
      this._userService.getUser(id).then(user => this._user = user).then(user => console.log(user));
    }
    
    if(this._appService.getSiteParams().servicesMode === 'server') {
      this._userService.getUser(id).subscribe(
          user => {
            if(user) {
              this._user = user;
            }
          },
          error => {
            console.log(error);
            this._errorMsg = error;
          });
    }
    
    // This is so that if the user logs out while viewing his own profile (i.e. this page)
    // The edit buttons are shown or hidden from the ui as needed
    // i.e. if the logged in state changes due to some other componenent, it is percolated here also
    this._authenticationService.loggedInUser$.subscribe(user => {
      if(user) {
        this._loggedInUser = user;
        this._ownProfile = this._loggedInUser.id === id;
        //console.log(this._ownProfile)
      } else {
        this._loggedInUser = user;
        this._ownProfile = false;
      }
    });
    // This is so that if an already logged in user comes to this page, the profile buttons are shown or hidden as needed
    // i.e. teh logged in state hasent changed  
    this._loggedInUser = this._authenticationService.getLoggedInUser();
    if(this._loggedInUser) {
      this._ownProfile = this._loggedInUser.id == id;
    } else {
      this._ownProfile = false;
    }
    
    
  }
  
}