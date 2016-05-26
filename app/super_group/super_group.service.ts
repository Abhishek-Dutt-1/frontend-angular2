import {SuperGroup} from './super_group';
import {MOCK_SUPER_GROUPS} from './mock-super_groups';
import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SuperGroupService {

  constructor(
    private _appService: AppService,
    private _http: Http
    //private _groupService: GroupService
  ) {}

  /*
  getGroupsBySuperGroupName(sg_name: string) {
    return this._groupService.getGroupsBySuperGroupName(sg_name);
  }
  */

  /**
   * Returns a Super group obj be name
   */
  getSuperGroupByName(sg_name: string) {

    /*
    return Promise.resolve(MOCK_SUPER_GROUPS.find(sgs => {
      return sgs.name == sg_name;
    }));
    */

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.post(backendUrl + '/supergroup/getSuperGroupByName', JSON.stringify({superGroupName: sg_name}), options)
      .map(
        res => {
          console.log(res)
          console.log(res.json())
          return res.json();
      })
      .catch(error => {
        console.log(error);
        return this._appService.handleServerErrors(error);
        //return Observable.throw(error);
      });

  }

  /**
   * Returns a list of SuperGroup based on its type
   */
  getSuperGroupsByType(superGroupType: string) {
    return Promise.resolve(MOCK_SUPER_GROUPS).then(
      sgs => sgs.filter(sg => sg.type === superGroupType)
    );
  }

  /**
   * Returns a list of all super groups (usually for users to select)
   * @onlySelected: Return only selected super groups or all of them
   * selected super groups are hi quality super groups which are selected by admins
   */
  getAllSuperGroups(onlySelected: boolean = true) {

    let backendUrl = this._appService.getSiteParams().backendUrl;
    let headers    = new Headers( this._appService.getSiteParams().headersObj );
    let options    = new RequestOptions({ headers: headers });
    return this._http.get(backendUrl + '/supergroup', options)
      .map(
        res => {
          return res.json();
      })
      .catch(error => {
        return this._appService.handleServerErrors(error);
        //return Observable.throw(error);
      });
  }       // !getAllSuperGroups()

}
