import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
//import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ...} from 'angular2/router';
import {AppService} from '../app.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../user/user';
import {SuperGroup} from '../super_group/super_group'

@Component({
  selector: 'my-geo-filter',
  template: `
    <div class="my-geo-filter">
    
      <div class="row hidden-xs">
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'international'}]"
                [ngClass]="{active: geoSelection == 'international'}">
                <i class="fa fa-plane"></i> International</a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'national'}]"
                [ngClass]="{active: geoSelection == 'national'}">
                <i class="fa fa-train"></i> National
              </a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'state'}]"
                [ngClass]="{active: geoSelection == 'state'}">
                <i class="fa fa-bus"></i> State
              </a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'city'}]"
                [ngClass]="{active: geoSelection == 'city'}">
                <i class="fa fa-car"></i> City
              </a>
          </span>
        </div>
        
        <div class="col-xs-2">
          <span class="menu-item">
              <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'local'}]"
                [ngClass]="{active: geoSelection == 'local'}">
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
            <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'international'}]"
                [ngClass]="{active: geoSelection == 'international'}">
              <i class="fa fa-plane"></i><span *ngIf="geoSelection == 'international'"> International</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'national'}]"
              [ngClass]="{active: geoSelection == 'national'}">
              <i class="fa fa-train"></i><span *ngIf="geoSelection == 'national'"> National</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'state'}]"
              [ngClass]="{active: geoSelection == 'state'}">
              <i class="fa fa-bus"></i><span *ngIf="geoSelection == 'state'"> State</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'city'}]"
              [ngClass]="{active: geoSelection == 'city'}">
              <i class="fa fa-car"></i><span *ngIf="geoSelection == 'city'"> City</span>
            </a>
          </div>
        </div>
        
        <div class="menu-item pull-left">
          <div >
            <a class="menu-link" [routerLink]="['/SuperGroupPostList', {geo: 'local'}]"
              [ngClass]="{active: geoSelection == 'local'}">
              <i class="fa fa-bicycle"></i><span *ngIf="geoSelection == 'local'"> Local</span>
            </a>
          </div>
        </div>
        
      </div>  
      </div>
      </div>  <!-- end row -->

      
      <div class="row">
        <div class="col-xs-12">
          <div class="geo-filter-details">
            <span *ngFor="#sg of superGroupList">
              {{sg.name}}
            </span>
            <span class="add-more" (click)="gotoChangeGeoSttings()">
              <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
            </span>
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
      .my-geo-filter .visible-xs-block .menu-link {
        font-size: 12px;
      }
      .my-geo-filter .geo-filter-details {
        clear: both;
        text-transform: uppercase;
        font-size: 11px;
      }
    `],
  inputs: ['geoSelection', 'superGroupList'],
  directives: [ROUTER_DIRECTIVES]
  
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
    private _appService: AppService,
    private _authenticationService: AuthenticationService,
    private _routeParams: RouteParams
  ) { }
  
  ngOnInit() {}
 
  gotoChangeGeoSttings() {
    this._router.navigate(['EditUser', {tab: 'geo'}]);     
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