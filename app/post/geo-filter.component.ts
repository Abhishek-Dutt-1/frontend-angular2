import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
//import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ...} from 'angular2/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../user/user';
import {Group_Of_Groups} from '../group_of_groups/group_of_groups'

@Component({
  selector: 'my-geo-filter',
  template: `
    <div class="my-geo-filter">
    
      <div class="row hidden-xs">
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _international} ]"
                [ngClass]="{active: _currentSelection == 'international'}">
                <i class="fa fa-plane"></i> International</a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _national} ]"
                [ngClass]="{active: _currentSelection == 'national'}">
                <i class="fa fa-train"></i> National
              </a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _state} ]"
                [ngClass]="{active: _currentSelection == 'state'}">
                <i class="fa fa-bus"></i> State
              </a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _city} ]"
                [ngClass]="{active: _currentSelection == 'city'}">
                <i class="fa fa-car"></i> City
              </a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _local} ]"
                [ngClass]="{active: _currentSelection == 'local'}">
                <i class="fa fa-bicycle"></i> Local
              </a>
          </span>
        </div>
      </div>  <!-- end row -->

      <div class="row visible-xs-block">
      <div class="col-xs-12">
      <div>
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _international} ]"
                [ngClass]="{active: _currentSelection == 'international'}">
              <i class="fa fa-plane"></i><span *ngIf="_currentSelection == 'international'"> International</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _national} ]"
              [ngClass]="{active: _currentSelection == 'national'}">
              <i class="fa fa-train"></i><span *ngIf="_currentSelection == 'national'"> National</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _state} ]"
              [ngClass]="{active: _currentSelection == 'state'}">
              <i class="fa fa-bus"></i><span *ngIf="_currentSelection == 'state'"> State</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _city} ]"
              [ngClass]="{active: _currentSelection == 'city'}">
              <i class="fa fa-car"></i><span *ngIf="_currentSelection == 'city'"> City</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="[ '/GroupOfGroupsPostList', {gog: _local} ]"
              [ngClass]="{active: _currentSelection == 'local'}">
              <i class="fa fa-bicycle"></i><span *ngIf="_currentSelection == 'local'"> Local</span>
            </a>
          </div>
        </div>
        
      </div>  
      </div>
      </div>  <!-- end row -->

      
      <div class="row">
        <div class="col-xs-12">
        <div class="geo-filter-details">
          <div>
            {{_selectionDetails}}
            <span class="add-more" (click)="gotoChangeGeoSttings()">
              <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </span>
          </div>
        </div>
        </div>
      </div> <!-- end row -->
      
    </div>
  `,
  styles: [`      
      .my-geo-filter {
      }
      .my-geo-filter .active {
        /*
        font-weight: bold;
        */
        color: red;
      }
      .my-geo-filter .menu-item {
        /*
        color: #ef5350;
        text-align: center;
        */
        padding: 15px 15px 0px 0;
      }
      .my-geo-filter .menu-link {
        transition: 0.05s ease-in-out;
        display: block;
        vertical-align: baseline;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-decoration: none;
        /*
                color: #ef5350;
        font-size: 12px;
        */
      }
      .my-geo-filter .geo-filter-details {
        clear: both;
        text-transform: uppercase;
        font-size: 12px;
      }
    `],
  directives: [ROUTER_DIRECTIVES, NgClass]
  
})
export class GeoFilterComponent implements OnInit {

  private _international: string[] = null;
  private _national: string = null;
  private _state: string[] = null;
  private _city: string[] = null;
  private _local: string[] = null;
  
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
      this._international = loggedInUser.settings.international.map(el => el.name);
      this._national = loggedInUser.settings.national.name;
      this._state = loggedInUser.settings.state.map(el => el.name);
      this._city = loggedInUser.settings.city.map(el => el.name);
      this._local = loggedInUser.settings.local.map(el => el.name);
    } else {
      // Defaults
      this._international = ['usa'];
      this._national = 'india';
      this._state = ['karnataka'];
      this._city = ['bangalore'];
      this._local = ['koramangala'];      
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
      this._currentSelection = 'international';
      this._selectionDetails = this._international.join(',')
    }
    if(gog_names_array[0] == this._national) {
      this._currentSelection = "national";
      this._selectionDetails = this._national
    }
    if(this.arraysEqual(gog_names_array, this._state)) {
      this._currentSelection = "state";
      this._selectionDetails = this._state.join(',')
    }
    if(this.arraysEqual(gog_names_array, this._city)) {
      this._currentSelection = "city";
      this._selectionDetails = this._city.join(',')
    }
    if(this.arraysEqual(gog_names_array, this._local)) {
      this._currentSelection = "local";
      this._selectionDetails = this._local.join(',')
    }
    
    console.log(gog_names_array)
    console.log(this._selectionDetails)
    
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