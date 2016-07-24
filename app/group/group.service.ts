import {Group} from './group';
import {MOCK_GROUPS} from './mock-groups';
import {Injectable} from '@angular/core';
import {MOCK_POSTS} from '../post/mock-posts';
import {Headers, RequestOptions, Http, Jsonp, Response, URLSearchParams} from '@angular/http';
import {SuperGroupService} from '../super_group/super_group.service';
import {AppService} from '../app.service';
@Injectable()
export class GroupService {

  constructor(
    private _appService: AppService,
    private _superGroupService: SuperGroupService,
    private _http: Http,
    private jsonp: Jsonp) {}
/*
  getGroups() {
    return Promise.resolve(MOCK_GROUPS);
  }
*/
  // See the "Take it slow" appendix
  /*
  getGroupsSlowly() {
    return new Promise<Group[]>(resolve =>
      setTimeout(()=>resolve(MOCK_GROUPS), 2000) // 2 seconds
    );
  }
  */

  createNewGroup(newGroup: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/createNewGroup', JSON.stringify(newGroup), options).map(
      res => {
        this._appService.spinner(false);
        return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  editGroup(modGroup: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/editGroup', JSON.stringify(modGroup), options).map(
      res => {
        this._appService.spinner(false);
        return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }

  /**
   * Return a Group obj by name and supergroups name
   */
  getGroup(superGroupName: String, groupName: String) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/getGroupByName',
        JSON.stringify({superGroupName: superGroupName, groupName: groupName}),
        options)
      .map(
        res => {
          //console.log(res);
          //console.log(res.json());
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });

  }     // !getGroup()

  /**
   * Return a Group obj by id
   */
  getGroupById(groupId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/group/getGroupById/' + groupId, options)
      .map(
        res => {
          this._appService.spinner(false);
          return res.json()
      })
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }     // ! getGroupById()

  /**
   * Get all posts in a Group
   */
  getPostsInGroup(superGroupName: string, groupName: string, lastPostId?: any ) {
    lastPostId = lastPostId || -1;
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/getPostsInGroup',
        JSON.stringify({ superGroupName: superGroupName, groupName: groupName, lastPostId: lastPostId }),
        options)
      .map(
        res => {
          //console.log(res);
          //console.log(res.json());
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });

  }

  /**
   * Fetch a list of super_group/group names for autocomplete dropdown in new post form
   * TODO:: SETUP BACKEND TO TEST THIS
   * TODO:: CHANGE JSONP TO HTTP
   */
  searchGroups(searchTermArray: string) {

    /*
    if(this._appService.getSiteParams().servicesMode === 'local') {
      // Temp use a local promise version
      return Promise.resolve(MOCK_GROUPS).then(
        groups => groups.filter(
          //group => (group.name.indexOf(searchTerm) > -1) || (group.parent_group.name.indexOf(searchTerm) > -1)
          group => {
            // 1 element => no '/' was used, search on both parent and group name
            if(searchTermArray.length == 1) {
              return (group.name.indexOf(searchTermArray[0]) > -1) || (group.super_group.name.indexOf(searchTermArray[0]) > -1)
            }
            // 2 elements => a '/' was used, search first element on parent and 2nd element on group name
            if(searchTermArray.length == 2) {
              return (group.name.indexOf(searchTermArray[1]) > -1) && (group.super_group.name.indexOf(searchTermArray[0]) > -1)
            }

          }));
    }
    */

    /*
    // Finally should use this observable version
    let searchUrl = 'http://en.wikipedia.org/w/api.php'
    console.log(searchTermArray)
    var params = new URLSearchParams();
    params.set('search', searchTermArray);       // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp
              .get(searchUrl, { search: params })
              .map(request => <string[]> request.json()[1]);
    */
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/fuzzySearchGroupsByName', JSON.stringify({searchStr: searchTermArray}), options).map(
      res => {
        this._appService.spinner(false);
        return <string[]> res.json()
      }
    )
    .catch(error => {
      this._appService.spinner(false);
      return this._appService.handleServerErrors(error)
    });
  }

  /**
   * Returns a list of groups based on its type
   */
  getGroupsBySuperGroupType(groupType: string) {
    return Promise.resolve(MOCK_GROUPS).then(
      groups => groups.filter(group => group.supergroup.type === groupType)
    );
  }

  /**
   * Returns list of all groups belonging to the given super group
   */
  getGroupsBySuperGroupName(sg_name: string) {
    return Promise.resolve(MOCK_GROUPS.filter(group => group.supergroup.name == sg_name));
  }

  /**
   * Subscribe the logged in user to a grouop
   */
  subscribeCurrentUserToGroup(groupId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/group/subscribeCurrentUserToGroup/' + groupId, options)
      .map(
        res => {
          //console.log(res);
          //console.log(res.json());
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });

  }       // ! subscribeCurrentUserToGroup()

  /**
   * UnSubscribe the logged in user to a grouop
   */
  unSubscribeCurrentUserFromGroup(groupId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/group/unSubscribeCurrentUserFromGroup/' + groupId, options)
      .map(
        res => {
          //console.log(res);
          //console.log(res.json());
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });

  }       // ! subscribeCurrentUserToGroup()

  /**
   * Cancel the logged in users pending membership to a group that requires approval
   */
  cancelCurrentUsersPendingMembership(groupId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/group/cancelCurrentUsersPendingMembership/' + groupId, options)
      .map(
        res => {
          //console.log(res);
          //console.log(res.json());
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });

  }       // ! cancelCurrentUsersPendingMembership()

  /**
   * Fetches group's waiting list if group requires approval
   */
  getGroupWaitingList(groupId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl+'/group/getGroupWaitingList/' + groupId, options)
      .map(
        res => {
          //console.log(res);
          //console.log(res.json());
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });

  }       // ! cancelCurrentUsersPendingMembership()

  /**
   * Approve a member to join the group
   */
  approveGroupMembership(groupId: any, userId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/approveGroupMembership', JSON.stringify({groupid: groupId, pendinguserid: userId}), options)
      .map(
        res => {
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }       // ! approveGroupMembership()

  /**
   * Disapprove a member to join the group
   */
  disApproveGroupMembership(groupId: any, userId: any) {
    this._appService.spinner();
    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers = new Headers( this._appService.getSiteParams().headersObj );
    let options = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl+'/group/disApproveGroupMembership', JSON.stringify({groupid: groupId, pendinguserid: userId}), options)
      .map(
        res => {
          this._appService.spinner(false);
          return res.json()
        }
      )
      .catch(error => {
        this._appService.spinner(false);
        return this._appService.handleServerErrors(error)
      });
  }       // ! approveGroupMembership()

}
