import {User} from './user';
import {MOCK_USERS} from './mock-users';
import {Injectable} from '@angular/core';
import {GroupService} from '../group/group.service';
import {UserRoles} from './user-roles';
import {AppService} from '../app.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Subject, Observable, Observer} from 'rxjs/Rx';
import {MOCK_SUPER_GROUPS} from '../super_group/mock-super_groups';

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

  /**
   * Get user by id
   */
  getUser(id: number) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/user/'+id, options)
    .map(
      res => {
        let user = res.json();
        return user;
    })
    .catch(
      error => {
        return this._appService.handleServerErrors(error);
      }
    );
  }

  /**
   * Get user obj from a token
   */
  getUserByToken(token: string) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/user/getUserByToken', JSON.stringify({token: token}), options)
    .map(
      res => {
        let user = res.json();
        return user;
    })
    .catch(
      error => {
        return this._appService.handleServerErrors(error);
      }
    );
  }

  createNewUser(newUser: any) {
    // Serve should handle these things
    /*
    let lastUser:User = MOCK_USERS.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });
    */

    let newProperUser = {
      //id: +lastUser.id + 1,
      email: newUser.email,
      displayname: newUser.displayname,
      password: newUser.password,
      confirm_password: newUser.confirm_password,
      /*
      userrole: UserRoles.user,
      international: newUser.international,
      national: newUser.national,
      state: newUser.state,
      city: newUser.city,
      local: newUser.local
      */
    }

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
        return this._appService.handleServerErrors(error);
    });
  }         // !createNewUser()

  /*
  changePassword(userId: number, newPassword: string) {
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
  */

  updateGeoSettings(userId: number, newSettings: any) {
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
  }         // ! updateGeoSettings()

  /**
   * Update user's settings on basic tab
   */
  updateBasicSettings(newSettings: any) {
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/user/updateBasicSettings', JSON.stringify(newSettings), options)
      .map(res => {
        return res.json();
      }).catch(error => {
        return this._appService.handleServerErrors(error);
      });
  }       // ! updateBasicSettings()


  /**
   * returns a default user object to fill in
   * whernever a logged in user is requried but is not available
   */
  /*
  getDefaultUser() {
    let defaultUser = {
      international: [MOCK_SUPER_GROUPS[1-1], MOCK_SUPER_GROUPS[2-1]],
      national: [MOCK_SUPER_GROUPS[3-1], MOCK_SUPER_GROUPS[4-1]],
      state: [MOCK_SUPER_GROUPS[5-1], MOCK_SUPER_GROUPS[6-1]],
      city: [MOCK_SUPER_GROUPS[7-1], MOCK_SUPER_GROUPS[8-1]],
      local: [MOCK_SUPER_GROUPS[9-1], MOCK_SUPER_GROUPS[10-1]]
    };
    return defaultUser;
  }
  */
}
