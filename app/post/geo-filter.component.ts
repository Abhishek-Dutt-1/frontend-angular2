import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
//import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ...} from 'angular2/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../user/user';

@Component({
  selector: 'my-geo-filter',
  template: `
    <div class="geo-filter">
    
      <div>
        <span class="menu-item">
          <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _international} ]"
          [ngClass]="{active: _currentSelection == 'interntaional'}"
          >International</a>
        </span>
        
        <span class="menu-item">
          <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _national} ]"
            [ngClass]="{active: _currentSelection == 'national'}"
          >National</a>
        </span>
        
        <span class="menu-item">
          <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _state} ]"
            [ngClass]="{active: _currentSelection == 'state'}"
          >State</a>
        </span>
        
        <span class="menu-item">
          <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _city} ]"
            [ngClass]="{active: _currentSelection == 'city'}"
          >City</a>
        </span>
        
        <span class="menu-item">
          <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _sub_city} ]"
            [ngClass]="{active: _currentSelection == 'sub_city'}"
          >Sub-City</a>
        </span>
      </div>
      
      <div class="geo-filter-details">
        <div>
          {{_selectionDetails}}
          <span class="add-more" (click)="gotoChangeGeoSttings()">
            <i class="material-icons" role="presentation">settings</i>
          </span>
        </div>
      </div>
      
    </div>
  `,
  styles: [`
      .geo-filter {
      }
      .geo-filter .active {
        font-weight: bold;
        color: red;
      }
      
      .geo-filter .menu-item {
        color: #ef5350;
      }
      .geo-filter .menu-link {
        padding: 0 10px 0 0;
        float: left;
        font-size: 12px;
        letter-spacing: 1px;
        transition: 0.05s ease-in-out;
        display: block;
        vertical-align: baseline;
        text-transform: uppercase;
        text-decoration: none;
      }
      .geo-filter .geo-filter-details {
        clear: both;
        text-transform: uppercase;
        font-size: 10px;
      }
      .geo-filter .geo-filter-details .add-more .material-icons {
        font-size: 10px;
      }
    `],
  directives: [ROUTER_DIRECTIVES, NgClass]
  
})
export class GeoFilterComponent implements OnInit {

  private _international: string[] = null;
  private _national: string = null;
  private _state: string[] = null;
  private _city: string[] = null;
  private _sub_city: string[] = null;
  
  private _currentSelection: string = null;
  private _selectionDetails: string = null;

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {
    let loggedInUser = this._authenticationService.getLoggedInUser()
    if(loggedInUser) {
      this._international = loggedInUser.settings.interntaional;
      this._national = loggedInUser.settings.national;
      this._state = loggedInUser.settings.state;
      this._city = loggedInUser.settings.city;
      this._sub_city = loggedInUser.settings.sub_city;
    } else {
      // Defaults
      this._international = ['usa'];
      this._national = 'india';
      this._state = ['karnataka'];
      this._city = ['bangalore'];
      this._sub_city = ['koramangala'];      
    }
    
    /** taken from group-of-groups-post-list-loader-component, KEEP IN SYNC */
    // Very strage behavious of gog_names
    // If entered directly in url its a string
    // if redirected (by gotoNational for eg) by angular its an array
    let gog_names = this._routeParams.get('gog');
    let gog_names_array = null
    gog_names = gog_names || 'india'
    if(Array.isArray(gog_names)) {
      gog_names_array = gog_names;
    } else {
      gog_names_array = gog_names.split(',')
    }
    /** ** */
    
    if(this.arraysEqual(gog_names_array, this._international)) {
      this._currentSelection = 'interntaional';
      this._selectionDetails = this._international.join(', ')
    }
    if(this.arraysEqual(gog_names_array, this._national)) {
      this._currentSelection = "national";
      this._selectionDetails = this._national
    }
    if(this.arraysEqual(gog_names_array, this._state)) {
      this._currentSelection = "state";
      this._selectionDetails = this._state.join(', ')
    }
    if(this.arraysEqual(gog_names_array, this._city)) {
      this._currentSelection = "city";
      this._selectionDetails = this._city.join(', ')
    }
    if(this.arraysEqual(gog_names_array, this._sub_city)) {
      this._currentSelection = "sub_city";
      this._selectionDetails = this._sub_city.join(', ')
    }
    
  }
 
  gotoChangeGeoSttings() {
    console.log("TODO: redirect to profile edit")
    // TODO: redirect to profile edit
    //this._router.navigate(['ViewGroup', {group_of_groups_name: parent_group_name, group_name: name}]);     
  }
    
  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    a.sort();
    b.sort();
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}