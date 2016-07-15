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
import {UserprofileMenuPanelComponent} from './userprofile-menu-panel.component';
import {ErrorComponent} from '../misc/error.component';
import {AuthenticationService} from '../authentication/authentication.service';
import {PostTemplateType} from '../post/post-template-types';
import {PostListComponent} from '../post/post-list.component';

@Component({
  selector: 'my-view-user-upvotes',
  template: `
    <div class="my-view-user-upvotes">

      <my-userprofile-memu-panel [_profileOwnersId]="_profileOwnersId"></my-userprofile-memu-panel>

      <h3 *ngIf="_currentUser">{{_currentUser.displayname}}'s Up votes:</h3>

      <my-error [_error]="_error"></my-error>

      <my-post-list [posts]="_userPosts" [postTemplateType]="postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>

    </div>
  `,
  styles: [`
  .my-view-upvotes .errorMsg {
    margin-top: 20px;
  }
  `],
  directives: [RouterLink, ErrorComponent, PostListComponent, UserprofileMenuPanelComponent]
})
export class ViewUserUpvotesComponent implements OnInit {

  private _currentUser:User = null;
  private _ownProfile = false;
  private _profileOwnersId = null;
  private _error = { msg: null, type: null };
  private _loggedInUserSubcription = null;
  private _userPosts = null;
  private postTemplateType: PostTemplateType;

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams,
    private _authenticationService: AuthenticationService,
    private _appService: AppService
    ) {
  }

  ngOnInit() {

    this.postTemplateType = PostTemplateType.List;

    this._profileOwnersId = +this._routeParams.get('id');

    // This is so that if the user logs out while viewing his own profile (i.e. this page)
    // The edit buttons are shown or hidden from the ui as needed
    // i.e. if the logged in state changes due to some other componenent, it is percolated here also
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(user => {
      if(user) {
        this._currentUser = user;
        this._ownProfile = this._currentUser.id == this._profileOwnersId;
        this.getUpvotesByUser( this._profileOwnersId )
      } else {
        this._currentUser = user;
        this._ownProfile = false;
      }
    });
    // This is so that if an already logged in user comes to this page, the profile buttons are shown or hidden as needed
    // i.e. teh logged in state hasent changed
    this._currentUser = this._authenticationService.getLoggedInUser();
    if( this._currentUser ) {
      this._ownProfile = this._currentUser.id == this._profileOwnersId;
    } else {
      this._ownProfile = false;
    }
    this.getUpvotesByUser( this._profileOwnersId )
  }     // ! ngOnInit()

  getUpvotesByUser(userId: any) {
    this._userService.getUpvotesByUser(userId).subscribe(
      posts => {
        this._userPosts = posts;
        if ( this._userPosts.length == 0 ) this._error.msg = "User has not up voted any posts."
      },
      error => {
        this._error.msg = error;
      }
    )
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

}
