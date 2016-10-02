import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgClass} from '@angular/common';
import {Router, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AppService} from '../app.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {User} from '../user/user';
import {SuperGroup} from '../super_group/super_group'

@Component({
  selector: 'my-geo-filter',
  template: `
    <!--
KEEP IN SYNC : GeoFilterAddSupergroup
    -->
    <div *ngIf="_sticky" class="dummy-div"></div>
    <div class="my-geo-filter" [ngClass]="{sticky: _sticky}">

          <div class="row hidden-xs">
            <div class="col-xs-12">

              <div class="pull-left">
                <span class="menu-item">
                    <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'international'}]"
                      [ngClass]="{active: geoSelection == 'international'}">
                      <i class="fa fa-plane"></i> International</a>
                </span>
              </div>

              <div class="pull-left">
                <span class="menu-item">
                    <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'national'}]"
                      [ngClass]="{active: geoSelection == 'national'}">
                      <i class="fa fa-train"></i> National
                    </a>
                </span>
              </div>

              <div class="pull-left">
                <span class="menu-item">
                    <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'state'}]"
                      [ngClass]="{active: geoSelection == 'state'}">
                      <i class="fa fa-bus"></i> State
                    </a>
                </span>
              </div>

              <div class="pull-left">
                <span class="menu-item">
                    <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'city'}]"
                      [ngClass]="{active: geoSelection == 'city'}">
                      <i class="fa fa-car"></i> City
                    </a>
                </span>
              </div>

              <div class="pull-left">
                <span class="menu-item">
                    <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'local'}]"
                      [ngClass]="{active: geoSelection == 'local'}">
                      <i class="fa fa-bicycle"></i> Local
                    </a>
                </span>
              </div>

              <div class="pull-right">
                <div class="new-post pull-right">
                  <div>
                    <a class="btn btn-sm btn-default new-post-button" [routerLink]="['NewPost']">
                      <i class="fa fa-pencil" aria-hidden="true"></i> &nbsp;New Post
                    </a>
                  </div>
                </div>
                <div class="1hidden-md pull-right">
                  <div class="add-supergroups-button">
                    <a class="1pull-right btn btn-sm btn-default new-post-button" [routerLink]="[ 'SupergroupSelection', { hypergroup: geoSelection } ]">
                      <i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp;Supergroups
                    </a>
                  </div>
                </div>
              </div>

            </div>    <!-- ! col-xs-12 -->
          </div>  <!-- end row -->

      <div class="row visible-xs-block">
        <div class="col-xs-12">

          <div>
            <div class="menu-item pull-left">
              <div class="menu-link-container">
                <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'international'}]"
                    [ngClass]="{active: geoSelection == 'international'}">
                  <i class="fa fa-plane"></i><span *ngIf="geoSelection == 'international'"> International</span>
                </a>
              </div>
            </div>

            <div class="menu-item pull-left">
              <div class="menu-link-container">
                <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'national'}]"
                  [ngClass]="{active: geoSelection == 'national'}">
                  <i class="fa fa-train"></i><span *ngIf="geoSelection == 'national'"> National</span>
                </a>
              </div>
            </div>

            <div class="menu-item pull-left">
              <div class="menu-link-container">
                <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'state'}]"
                  [ngClass]="{active: geoSelection == 'state'}">
                  <i class="fa fa-bus"></i><span *ngIf="geoSelection == 'state'"> State</span>
                </a>
              </div>
            </div>

            <div class="menu-item pull-left">
              <div class="menu-link-container">
                <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'city'}]"
                  [ngClass]="{active: geoSelection == 'city'}">
                  <i class="fa fa-car"></i><span *ngIf="geoSelection == 'city'"> City</span>
                </a>
              </div>
            </div>

            <div class="menu-item pull-left">
              <div class="menu-link-container">
                <a class="menu-link" [routerLink]="['/HyperGroupPostList', {geo: 'local'}]"
                  [ngClass]="{active: geoSelection == 'local'}">
                  <i class="fa fa-bicycle"></i><span *ngIf="geoSelection == 'local'"> Local</span>
                </a>
              </div>
            </div>

            <div class="menu-item pull-right add-supergroups">
              <div class="menu-link-container">
                <a class="menu-link" [routerLink]="[ 'SupergroupSelection', { hypergroup: geoSelection } ]">
                  <i class="fa fa-map-marker"></i>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>  <!-- end row -->


      <div class="row hidden">
        <div class="col-xs-12">
          <div class="geo-filter-details">
            <span *ngFor="let sg of superGroupList">
              <a [routerLink]="['SuperGroupPostList', {super_group_name: sg.name}]">{{sg.name}}</a>
            </span>
            <span class="add-more">
              <a [routerLink]="['EditUser', {tab: 'geo'}]">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
            </span>
          </div>
        </div>
      </div> <!-- end row -->

    </div>
  `,
  styles: [`
      .dummy-div {
        /** dummy div should be the exact height of the sticky div
         * this is to prevent jumping of the page
         */
        height: 56px;
      }
      .sticky {
        position: fixed;
        top: 0;
        background-color: rgba(255, 255, 255, 0.98);
        z-index: 10;
        margin-left: -15px;
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
      }
      .my-geo-filter {

      }
      .my-geo-filter > .row {
        border-bottom: 1px solid rgba(0,0,0,0.05);
        padding-bottom: 15px;
        padding-top: 15px;
      }
      .my-geo-filter .menu-item {
        padding: 0 15px 0px 0;
        transition: 0.05s ease-in-out;
        display: block;
        vertical-align: baseline;
        letter-spacing: 1px;
        text-decoration: none;
      }
      .my-geo-filter .menu-item .menu-link {
        color: rgba(0, 0, 0, 0.3);
        font-size: 18px;
        font-family: WorkSans,sans-serif;
        text-transform: capitalize;
      }
      .my-geo-filter .menu-item .active {
        color: rgba(0, 0, 0, 0.8);
      }
      .my-geo-filter .visible-xs-block .menu-link {

      }
      .my-geo-filter .geo-filter-details {
        clear: both;
        text-transform: uppercase;
        font-size: 11px;
      }
      .my-geo-filter .new-post {
        padding-top: 0px;
      }
      .my-geo-filter .new-post-button {
        /*
        color: rgba(0, 0, 0, 0.4);
        */
        color: #af2b2b;
        padding: 3px 15px 3px 10px;
      }
      .my-geo-filter .add-supergroups {
        padding-right: 0;
      }
      .my-geo-filter .add-supergroups-button {
        padding-right: 10px;
      }
    `],
  inputs: ['geoSelection', 'superGroupList'],
  directives: [ROUTER_DIRECTIVES]

})
export class GeoFilterComponent implements OnInit, OnDestroy {

  private _international: string[] = null;
  private _national: string = null;
  private _state: string[] = null;
  private _city: string[] = null;
  private _local: string[] = null;

  private _currentSelection: string = null;
  private _selectionDetails: string = null;
  private _sticky:boolean = false;

  constructor(
    private _router: Router,
    private _appService: AppService,
    private _authenticationService: AuthenticationService,
    private _routeParams: RouteParams
  ) { }

  ngOnInit() {
    // See more at: http://www.mzan.com/article/37019491-how-to-get-value-of-this-keyword-inside-windows-scroll-event-listener-in-angu.shtml#sthash.ihJMe7X1.dpuf
    //window.addEventListener("scroll", (event) => { this._scrollListener(event); });
    window.addEventListener("scroll", this._scrollListener.bind(this));
    //window.addEventListener("scroll", this.myEfficientFn);
  }
  ngOnDestroy() {
    //console.log("REMOVING LIStener")
    //window.removeEventListener("scroll", this.myEfficientFn);
    window.removeEventListener("scroll", this._scrollListener);
  }
  /*
  myEfficientFn = this.debounce( () => {
	  // All the taxing stuff you do
    this._sticky = window.scrollY > 60;
    //console.log(this._sticky)
  }, 0, false);   // was 100ms
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }
  */
  _scrollListener() {
    this._sticky = window.scrollY > 60;
  }

  /*
  gotoChangeGeoSttings() {
    this._router.navigate(['EditUser', {tab: 'geo'}]);
  }
  */

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
