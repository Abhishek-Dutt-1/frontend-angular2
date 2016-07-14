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
  selector: 'my-view-user-posts',
  template: `
    <div class="my-view-user-posts">

      <my-userprofile-memu-panel [_profileOwnersId]="_profileOwnersId"></my-userprofile-memu-panel>

      <h3 *ngIf="_currentUser">{{_currentUser.displayname}}'s Posts:</h3>

      <my-error [_errorMsg]="_errorMsg"></my-error>

      <my-post-list [posts]="_userPosts" [postTemplateType]="postTemplateType" [currentUser]="_currentUser" [view]="_view"></my-post-list>
      <!--
      <my-user [user]="_user" [ownProfile]="_ownProfile" [tab]="_tab"></my-user>
      -->
    </div>
  `,
  styles: [`
  .my-view-user-posts .errorMsg {
    margin-top: 20px;
  }
  `],
  // directives: [RouterLink, UserComponent, ErrorComponent, PostListComponent]
  directives: [RouterLink, ErrorComponent, PostListComponent, UserprofileMenuPanelComponent]
})
export class ViewUserPostsComponent implements OnInit {

  private _currentUser:User = null;
  private _ownProfile = false;
  private _profileOwnersId = null;
  private _errorMsg = null;
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
        this.getPostsByUser( this._profileOwnersId )
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
    // Try getting posts any way
    this.getPostsByUser( this._profileOwnersId )
  }     // ! ngOnInit()

  getPostsByUser(userId: any) {
    this._userService.getPostsByUser(userId).subscribe(
      posts => {
        this._userPosts = posts;
        if ( this._userPosts.length == 0 ) this._errorMsg = "User has no Posts."
      },
      error => {
        this._errorMsg = error;
      }
    )
  }

  ngOnDestroy() {
    this._loggedInUserSubcription.unsubscribe();
  }

}
