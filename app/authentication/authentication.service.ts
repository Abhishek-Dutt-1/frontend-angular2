import {Injectable} from 'angular2/core';
import {MOCK_USERS} from '../user/mock-users';
import {Subject, Observable, Observer} from 'rxjs/Rx';
//import 'rxjs/Rx';
import {User} from '../user/user';

@Injectable()
export class AuthenticationService {
  
  private _loggedInUser = new Subject<User>();
  loggedInUser$ = this._loggedInUser.asObservable();
  
  // Logged in user info
  private _isUserLoggedIn = false;
  private _currentUser:User = null;
  
  constructor(
    //private _groupService: GroupService
  ) {
    // Load a logged in user if any
    let oldUser = localStorage.getItem('user');
    let user = JSON.parse(oldUser);
    if(user) {
      this._isUserLoggedIn = true;
      this._currentUser = user;
      this._loggedInUser.next(user);
    }
  }
  
  ngOnInit() {
  }
  
  loginUser(userInfo: any) {
    // The promise is returned because auth.component needs it in case of error
    // For all other components, they are told of state change by observables
    return Promise.resolve().then(()=> {
      let user = MOCK_USERS.filter(user => user.email == userInfo.email && user.password == userInfo.password)[0]
      if(user) {
        this._loggedInUser.next(user);
        this._isUserLoggedIn = true;
        this._currentUser = user;
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user;
    }).catch((reason) => {
      console.log(reason)
    });
    
  };
  
  logoutUser() {
    this._loggedInUser.next(null);
    this._isUserLoggedIn = false;
    this._currentUser = null;
    localStorage.removeItem('user');
  }
  
  isUserLoggedIn() {
    return this._isUserLoggedIn;
  }
  
  getLoggedInUser() {
    return this._currentUser;
  }
  
}