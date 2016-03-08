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

@Component({
  selector: 'my-view-user',
  template: `
    <div class="my-view-user">
      <my-user [user]="user"></my-user>
    </div>
  `,
  directives: [UserComponent]
})
export class ViewUserComponent {
  
  user: User;

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams) {
  }
  
  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._userService.getUser(id).then(user => {
      console.log("VIEW USRE")
      console.log(user);
      return user;
    }).then(user => this.user = user);
  }
  
}