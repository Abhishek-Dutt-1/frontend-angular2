import {AppService} from '../app.service';
import {Injectable} from 'angular2/core';
import {MOCK_USERS} from '../user/mock-users';
import {Subject, Observable, Observer} from 'rxjs/Rx';
import {User} from '../user/user';
import {UserService} from '../user/user.service';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {JwtHelper} from 'angular2-jwt';


@Injectable()
export class AuthenticationService {
  
  private _loggedInUser = new Subject<User>();
  loggedInUser$ = this._loggedInUser.asObservable();
  
  // Logged in user info
  private _isUserLoggedIn = false;
  private _currentUser:User = null;
  
  private _jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private _userService: UserService,
    private _appService: AppService,
    private _http: Http
  ) {
    // Load a logged in user if any
    let token = JSON.parse(localStorage.getItem('jwt'));
    console.log(token);
    
    //this._jwtHelper.decodeToken(token),
    //this._jwtHelper.getTokenExpirationDate(token),
    //this._jwtHelper.isTokenExpired(token)

    if(this._appService.getSiteParams().servicesMode === 'local') {
      let userId = token;   //for local token is user.id
      this._userService.getUser(userId).then(user => {
        this._isUserLoggedIn = true;
        this._currentUser = user;
        this._loggedInUser.next(user);
      }).catch(err => console.log(err));  
    }

    if(this._appService.getSiteParams().servicesMode === 'server') {

      if(token && !this._jwtHelper.isTokenExpired(token)) {        
        let userId = this._jwtHelper.decodeToken(token);
        this._userService.getUser(userId).subscribe(
          user => {
            if(user) {
              this._isUserLoggedIn = true;
              this._currentUser = user;
              this._loggedInUser.next(user);
              this._appService.setAuthorizationHeader(token);
              console.log("Auto logged in user frlom jwt", this._currentUser)     
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
    }
    
  }
  
  ngOnInit() {
    // OnInit dont work in injectables
  }
  
  loginUser(userInfo: any) {
    
    if(this._appService.getSiteParams().servicesMode === 'local') {
      // The promise is returned because auth.component needs it in case of error
      // For all other components, they are told of state change by subscribed observables
      return Promise.resolve().then(()=> {
        let user = MOCK_USERS.filter(user => user.email == userInfo.email && user.password == userInfo.password)[0]
        if(user) {
          this._loggedInUser.next(user);
          this._isUserLoggedIn = true;
          this._currentUser = user;
          user.jwt = user.id;
          //localStorage.setItem('loggedInUserId', JSON.stringify(user.id))
          localStorage.setItem('jwt', JSON.stringify(user.jwt))
        }
        return user;
      }).catch((reason) => {
        console.log(reason)
      });
    }   //!servicesMode == 'local'
    
    if(this._appService.getSiteParams().servicesMode === 'server') {
      
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers( this._appService.getSiteParams().headersObj );
      //let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.post(backendUrl+'/auth/local', JSON.stringify(userInfo), options)
      .map( 
        res => {
          console.log(res.json())
          let user = res.json().user || {};
          this._currentUser = user;
          //localStorage.setItem('loggedInUserId', JSON.stringify(user.id));
          localStorage.setItem('jwt', JSON.stringify(user.jwt));
          this._loggedInUser.next(user);
          this._isUserLoggedIn = true;
          this._appService.setAuthorizationHeader(user.jwt);
          return user;
      })
      .catch(
        error => {
          return this._appService.handleServerErrors(error);
          /*
          console.log(error)
          // In a real world app, we might send the error to remote logging infrastructure
          let errMsg = error.json() || 'Server error';
          return Observable.throw(errMsg);
          */
        }
      );
    }   //!servicesMode = 'server'
  };
  
  logoutUser() {
    this._isUserLoggedIn = false;
    this._currentUser = null;
    localStorage.removeItem('jwt');
    this._loggedInUser.next(null);
    this._appService.unsetAuthorizationHeader();
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
   */
  refreshLoggedInUser(geoSettings: any) {
    this._currentUser.international = geoSettings.international;
    this._currentUser.national = geoSettings.national;
    this._currentUser.state = geoSettings.state;
    this._currentUser.city = geoSettings.city;
    this._currentUser.local = geoSettings.local;
  }
  
}