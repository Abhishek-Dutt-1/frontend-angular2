import {AppService} from '../app.service';
import {Injectable} from '@angular/core';
import {MOCK_USERS} from '../user/mock-users';
import {Subject, Observable, Observer} from 'rxjs/Rx';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {Http, Headers, RequestOptions} from '@angular/http';
//import {JwtHelper} from 'jsonwebtoken';
//var jwtDecode = require('jwt-decode');
//var JwtHelper = require('jwt-decode');


@Injectable()
export class AuthenticationService {

  private _loggedInUser = new Subject<User>();
  loggedInUser$ = this._loggedInUser.asObservable();

  // Logged in user info
  private _isUserLoggedIn = false;
  private _currentUser:User = null;

  //private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private _userService: UserService,
    private _appService: AppService,
    private _http: Http
  ) {
    // Load a logged in user if any
    let token = JSON.parse(localStorage.getItem('jwt'));
    //console.log("Found jwt ",token);

    //this._jwtHelper.decodeToken(token),
    //this._jwtHelper.getTokenExpirationDate(token),
    //this._jwtHelper.isTokenExpired(token)

    if(token) {
      //let userId = this._jwtHelper.decodeToken(token);
      this._appService.spinner();
      this._userService.getUserByToken(token).subscribe(
        user => {
          if(user) {
            this._isUserLoggedIn = true;
            this._currentUser = user;
            this._appService.setAuthorizationHeader(token);
            //console.log("Auto logged in user from jwt", this._currentUser)
            this._appService.spinner(false);
            this._loggedInUser.next(user);
          }
        },
        error => {
          // token found but server did not sent a user
          //console.log(error);
          this.logoutUser();
          this._appService.spinner(false);
          return this._appService.handleServerErrors(error)
        }
      );
    } else {
      // Logout user (Should not be needed)
      this.logoutUser();
    }
/*
    if(token && !this._jwtHelper.isTokenExpired(token)) {
      let userId = this._jwtHelper.decodeToken(token);
      this._userService.getUser(userId).subscribe(
        user => {
          if(user) {
            this._isUserLoggedIn = true;
            this._currentUser = user;
            this._appService.setAuthorizationHeader(token);
            console.log("Auto logged in user frlom jwt", this._currentUser)
            this._loggedInUser.next(user);
          }
        },
        error => {
          // token found but server did not sent a user
          console.log(error);
          return this._appService.handleServerErrors(error)
        }
      );
    } else {
      // Logout user (Should not be needed)
      this.logoutUser();
    }
*/

  }

  ngOnInit() {
    // OnInit dont work in injectables
  }

  loginUser(userInfo: any) {

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this._appService.spinner();
    return this._http.post(backendUrl+'/auth/local', JSON.stringify(userInfo), options)
    .map(
      res => {
        //console.log(res.json())
        this._appService.spinner(false);
        let user = res.json().user || {};
        localStorage.setItem('jwt', JSON.stringify(user.jwt));
        this._appService.setAuthorizationHeader(user.jwt);
        this._currentUser = user;
        this._isUserLoggedIn = true;
        this._loggedInUser.next(user);
        return user;
    })
    .catch(
      error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
        /*
        console.log(error)
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.json() || 'Server error';
        return Observable.throw(errMsg);
        */
      }
    );

  };

  logoutUser() {
    this._isUserLoggedIn = false;
    this._currentUser = null;
    localStorage.removeItem('jwt');
    this._appService.unsetAuthorizationHeader();
    this._loggedInUser.next(null);
  }

  isUserLoggedIn() {
    return this._isUserLoggedIn;
  }

  getLoggedInUser() {
    //console.log(this._currentUser);
    return this._currentUser;
  }

  /**
   * User updated his geo setting, refresh its front end cache
   * TO BE DEPRECEATED
   */
  /*
  refreshLoggedInUser(geoSettings: any, extra_emails: any) {
    if(geoSettings != null) {
      this._currentUser.international = geoSettings.international;
      this._currentUser.national = geoSettings.national;
      this._currentUser.state = geoSettings.state;
      this._currentUser.city = geoSettings.city;
      this._currentUser.local = geoSettings.local;
    }
    if(extra_emails != null) {
      this._currentUser.extra_emails = extra_emails;
    }
  }
  */

  updateCurrentUser(updatedUser) {
    this._currentUser = updatedUser;
    this._isUserLoggedIn = true;
    this._loggedInUser.next(updatedUser);
  }

}
