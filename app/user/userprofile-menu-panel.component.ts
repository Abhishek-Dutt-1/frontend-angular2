/**
 * This is essentialy a container for the User object
 * like ViewPost has post+comments and not just the post,
 * this could have user+other stuff
 */
import {Component, OnInit} from '@angular/core';
import {RouteParams, RouterLink} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {User} from './user';
import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {ErrorComponent} from '../misc/error.component';
import {AuthenticationService} from '../authentication/authentication.service';
import {PostTemplateType} from '../post/post-template-types';
import {PostListComponent} from '../post/post-list.component';

@Component({
  selector: 'my-userprofile-memu-panel',
  template: `
    <div class="my-userprofile-menu-panel">
      <div class="userprofile-menu-panel-container">
        <div class="row" *ngIf="_profileOwnersId">
          <div class="col-xs-12">
            <div class="btn-group btn-group-sm" role="group">
              <div type="button" class="btn btn-default" [routerLink]="[ 'ViewUser', { id : _profileOwnersId } ]">Profile</div>
              <div type="button" class="btn btn-default" [routerLink]="[ 'ViewUserPosts', { id : _profileOwnersId } ]">Posts</div>
              <div type="button" class="btn btn-default" [routerLink]="[ 'ViewUserUpvotes', { id : _profileOwnersId } ]">Up votes</div>
              <div type="button" class="btn btn-default" [routerLink]="[ 'ViewUserDownvotes', { id : _profileOwnersId } ]">Down votes</div>
              <div type="button" class="btn btn-default hidden">Groups</div>
              <div type="button" class="btn btn-default">Comments</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .my-userprofile-menu-panel {
    margin-top: 20px;
  }
  `],
  inputs: ['_profileOwnersId'],
  directives: [RouterLink]
})
export class UserprofileMenuPanelComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }     // ! ngOnInit()

}
