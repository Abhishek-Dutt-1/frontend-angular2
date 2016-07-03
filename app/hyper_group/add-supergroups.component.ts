import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {RouteParams} from '@angular/router-deprecated';
import {User} from '../user/user';
import {ErrorComponent} from '../misc/error.component';
import {HyperGroupSidebarComponent} from '../hyper_group/hyper_group-sidebar.component';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'my-add-supergroup',
  template: `
    <div class="my-add-supergroup">
      <div *ngIf="_errorMsg">
        <my-error [_errorMsg]="_errorMsg"></my-error>
      </div>
      <div *ngIf="!_errorMsg">
        <div class="row">
          <div class="col-sm-4">
            <my-hyper_group-sidebar [hierarchy]="_sidebarHierarchy" [hyperGroup]="_hypergroup"></my-hyper_group-sidebar>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  directives: [ErrorComponent, HyperGroupSidebarComponent]
})
export class AddSupergroupsComponent implements OnInit {

  private _errorMsg = null;
  private _hypergroup = null;
  private _message = null;
  private _loggedInUserSubcription = null;
  private _currentUser: User = null;
  private _sidebarHierarchy: any[] = null;

  constructor(
    private _routeParams: RouteParams,
    private _userService: UserService,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this._hypergroup = this._routeParams.get('hypergroup');
    console.log("hypergroup", this._hypergroup)

    // Only logged in uses view posts
    this._loggedInUserSubcription = this._authenticationService.loggedInUser$.subscribe(
      currentUser => {
        if(currentUser) {
          this._currentUser = currentUser;
          this._errorMsg = null;
          //this.getPostsByHypergroup(this._geoSelection);
          this.getHyperGroupHierarchy(this._currentUser, this._hypergroup);
        } else {
          //this.getPostsByHypergroup(this._geoSelection);
          this.getHyperGroupHierarchy(this._currentUser, this._hypergroup);
        }
      });
    // Only logged in uses view post (init version)
    // TODO:: Find the Observable way to do this
    let currentUser = this._authenticationService.getLoggedInUser();
    if(currentUser) {
      this._currentUser = currentUser;
      this._errorMsg = null;
    } else { }
    // Logged in or not fetch posts immidiately
    //this.getPostsByHypergroup(this._geoSelection);
    this.getHyperGroupHierarchy(this._currentUser, this._hypergroup);
  }

  /**
   * Returns a Super groups and groups in a Hyper group for a user
   * To be displayed in the sidebar
   */
  getHyperGroupHierarchy(currentUser, hyperGroup) {
    this._userService.getHyperGroupHierarchy(currentUser, hyperGroup).subscribe(
      resp => {
        this._sidebarHierarchy = resp;
      },
      error => {
        this._errorMsg = error;
    })
  }


}