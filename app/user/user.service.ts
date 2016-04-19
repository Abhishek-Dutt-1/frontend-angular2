import {User} from './user';
import {MOCK_USERS} from './mock-users';
import {Injectable} from 'angular2/core';
import {GroupService} from '../group/group.service';
import {UserRoles} from './user-roles';
import {AppService} from '../app.service';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Subject, Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class UserService {
  
  constructor(
    private _groupService: GroupService,
    private _appService: AppService,
    private _http: Http
  ) { }
  
  getUsers() {
    return Promise.resolve(MOCK_USERS);
  }
  
  getUser(id: number) {
    
    if(this._appService.getSiteParams().servicesMode === 'local') {
      return Promise.resolve(MOCK_USERS.find(user => user.id == id));
    }
    
    if(this._appService.getSiteParams().servicesMode === 'server') {
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.get(backendUrl+'/user/'+id, options)
      .map( 
        res => {
          let user = res.json();
          if(user && !user.settings) {
            user.settings = {
              international: [],
              national: {},
              state: [],
              city: [],
              local: []
            };
          }
          console.log("NO ERROR")
          console.log(user);
          return user;
      })
      .catch(
        error => {
          return this._appService.handleServerErrors(error);
          /*
          // In a real world app, we might send the error to remote logging infrastructure
          let errMsg = "";
          //console.log("ERROR")
          //console.log(error)
          //console.log(error.status)
          try {
            console.log(error._body)
            if(error.status === 404 ) {
              errMsg = error._body;
            } else if (error.json().type === "error") { 
              // Handle XMLHttpRequestProgressEvent::ERR_CONNECTION_REFUSED i.e. Server not up
              errMsg = "Server not responding, Please try again later.";
            } else if(error.json()) {
              errMsg = error.json();
            } 
          } catch(err) {
            errMsg = 'Server error';
          }
          return Observable.throw(errMsg);
          */
        }
      );
    }
    
  }
  
  createNewUser(newUser: any) {
    // Serve should handle these things
    let lastUser:User = MOCK_USERS.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });

    let newProperUser = {
      id: +lastUser.id + 1,
      email: newUser.email,
      displayname: newUser.displayname,
      password: newUser.password,
      confirm_password: newUser.confirm_password,
      userrole: UserRoles.user,
      settings: {
        international: newUser.international,
        national: newUser.national,
        state: newUser.state,
        city: newUser.city,
        local: newUser.local
      } 
    }
    if(this._appService.getSiteParams().servicesMode === 'local') {
      MOCK_USERS.push(newProperUser);
      console.log(newProperUser);
      return this.getUser(newProperUser.id);
    }
    
    if(this._appService.getSiteParams().servicesMode === 'server') {
      delete newProperUser.id;
      newProperUser.international = newProperUser.settings.international;
      newProperUser.national = newProperUser.settings.international;
      newProperUser.state = newProperUser.settings.international;
      newProperUser.city = newProperUser.settings.international;
      newProperUser.local = newProperUser.settings.international;
      delete newProperUser.settings;
      
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this._http.post(backendUrl+'/auth/local/register', JSON.stringify(newProperUser), options)
      .map(
        res => {
          let user = res;
          console.log(user);
          console.log(user.json());
          user = res.json().user;
          return user;
      })
      .catch(
        error => {
          console.log(error);
          // In a real world app, we might send the error to remote logging infrastructure
          let errMsg = error.json() || 'Server error';
          return Observable.throw(errMsg);
        }
      );
    }
  }
  
  changePassword(userId: number, newPassword: string) {
    if(this._appService.getSiteParams().servicesMode === 'local') {
      MOCK_USERS.find(user => user.id == userId).password = newPassword
      return Promise.resolve(MOCK_USERS.find(user => user.id == userId));
    }
    if(this._appService.getSiteParams().servicesMode === 'server') {
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers( this._appService.getSiteParams().headersObj );
      let options = new RequestOptions({ headers: headers });
      return this._http.post(backendUrl+'/passport/changepassword', JSON.stringify({userId: userId, newPassword: newPassword}), options)
        .map(res => {
          return res.json();
        }).catch(error => {
          return this._appService.handleServerErrors(error);
        });
    }
  }
  
  updateGeoSettings(userId: number, newSettings: any) {
    if(this._appService.getSiteParams().servicesMode === 'local') {
      var user = MOCK_USERS.find(user => user.id == userId)
      if(user) {
        user.settings.international = newSettings.international;
        user.settings.national = newSettings.national;
        user.settings.state = newSettings.state;
        user.settings.city = newSettings.city;
        user.settings.local = newSettings.local;
        return Promise.resolve(user); 
      } else {
        throw "User Not Found";
      }
    }
    
    if(this._appService.getSiteParams().servicesMode === 'server') {
      let backendUrl = this._appService.getSiteParams().backendUrl;
      let headers = new Headers( this._appService.getSiteParams().headersObj );
      let options = new RequestOptions({ headers: headers });
      return this._http.post(backendUrl+'/user/updateGeoSettings', JSON.stringify({userId: userId, newSettings: newSettings}), options)
        .map(res => {
          console.log(res);
          return res.json();
        }).catch(error => {
          return this._appService.handleServerErrors(error);
        });
    }
  }
  
  /**
   * returns a default user object to fill in
   * whernever a logged in user is requried but is not available
   */
  getDefaultUser() {
    let defaultUser = {
      settings: {
        international: [],
        national: {},
        state: [],
        city: [],
        local: []
      }
    };
    return defaultUser;
  }
  
}