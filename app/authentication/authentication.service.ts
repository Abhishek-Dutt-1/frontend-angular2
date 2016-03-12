import {Injectable} from 'angular2/core';
import {MOCK_USERS} from '../user/mock-users';
import {Subject, Observable, Observer} from 'rxjs/Rx';
//import 'rxjs/Rx';
import {User} from '../user/user';

@Injectable()
export class AuthenticationService {
  
  //private _loggedInUser = null;
  private _loggedInUser = new Subject<User>();
  
  loggedInUser$ = this._loggedInUser.asObservable();
  
  constructor(
    //private _groupService: GroupService
  ) {  
  }
  
  loginUser(userInfo: any) {
    // The promise is returned because auth.component needs it in case of error
    // For all other components, they are told of state change by observables
    return Promise.resolve().then(()=> {
      let user = MOCK_USERS.filter(user => user.email == userInfo.email && user.password == userInfo.password)[0]
      if(user) {
        this._loggedInUser.next(user);
      }
      return user;
    }).catch((reason) => {
      console.log(reason)
    });
    
  };
  
  logoutUser() {
    this._loggedInUser.next(null);
  }
  
  isUserLoggedIn() {
    return !!this._loggedInUser;
  }
  
}