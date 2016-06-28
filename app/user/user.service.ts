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
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //return this._http.get(backendUrl+'/user/'+id, options)
    return this._http.get(backendUrl+'/user/getuserbyid/'+id, options)
    .map(
      res => {
        this._appService.spinner(false);
        return res.json();
    })
    .catch(
      error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      }
    );
  }

  /**
   * Get user obj from a token
   */
  getUserByToken(token: string) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/user/getUserByToken', JSON.stringify({token: token}), options)
    .map(
      res => {
        this._appService.spinner(false);
        return res.json();
    })
    .catch(
      error => {
        this._appService.spinner(false);
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

    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //return this._http.post(backendUrl+'/auth/local/register', JSON.stringify(newProperUser), options)
    return this._http.post(backendUrl+'/auth/registeruserlocal', JSON.stringify(newProperUser), options)
    .map(
      res => {
        let user = res;
        //console.log(user);
        //console.log(user.json());
        user = res.json().user;
        this._appService.spinner(false);
        return user;
    })
    .catch(
      error => {
        this._appService.spinner(false);
        //console.log(error);
        return this._appService.handleServerErrors(error);
    });
  }         // !createNewUser()

  /**
   * Change user's password
   */
  resetPassword(newPassword: string) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/passport/changepassword', JSON.stringify( { newPassword: newPassword } ), options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  updateGeoSettings(userId: number, newSettings: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/user/updateGeoSettings', JSON.stringify({userId: userId, newSettings: newSettings}), options)
      .map(res => {
        //console.log(res);
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }         // ! updateGeoSettings()

  /**
   * Update user's settings on basic tab
   */
  updateBasicSettings(newSettings: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/user/updateBasicSettings', JSON.stringify(newSettings), options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
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

  /**
   *  Verfiy primary email from a token
   */
  verifyEmailToken(token: string) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/verifyemail/' + token, options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }   // !verifyEmailToken

  /**
   *  Verfiy extra email from a token
   */
  verifyExtraEmailToken(token: string) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/verifyemail2/' + token, options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }   // !verifyEmailToken

  /**
   *  Verfiy email from a token
   */
  resendVerificationEmail(email) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/email/resendVerificationEmail/', JSON.stringify( { email: email } ), options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }         //  ! resendVerificationEmail

  /**
   * Update Profile image url
   */
  updateProfileImage(profileimage: string) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/user/updateProfileImage/', JSON.stringify( { profileimage: profileimage } ), options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }         // ! updateProfileImage

  /**
   * Add an extra email
   */
  addExtraEmail(extraEmail: string) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/user/addExtraEmail/', JSON.stringify( { extraEmail: extraEmail } ), options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  /**
  * Add an extra email
  */
  deleteExtraEmail( extraEmailId: string ) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl + '/user/deleteExtraEmail/' + extraEmailId, options)
      .map(res => {
        this._appService.spinner(false);
        return res.json();
      }).catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  /**
   * Returns a Super groups and groups in a Hyper group for a user
   * To be displayed in the sidebar
   */
  getHyperGroupHierarchy(currentUser, hyperGroup: string) {

    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/user/getHyperGroupHierarchy', JSON.stringify({hyperGroup: hyperGroup}), options)
      .map(
        res => {
          console.log(res.json());
          this._appService.spinner(false);
          return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  /**
   * Subscribe user to a Super Group
   */
  subscribeSuperGroup(sgId: any, hyperGroup: any) {

    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/user/subscribeSuperGroup', JSON.stringify( { sgId: sgId, hyperGroup: hyperGroup } ), options)
      .map(
        res => {
          console.log(res.json());
          this._appService.spinner(false);
          return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }

  /**
   * Subscribe user to a Super Group
   */
  unSubscribeSuperGroup(sgId: any, hyperGroup: any) {

    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/user/unSubscribeSuperGroup', JSON.stringify( { sgId: sgId, hyperGroup: hyperGroup } ), options)
      .map(
        res => {
          this._appService.spinner(false);
          return res.json();
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error);
      });
  }
}
