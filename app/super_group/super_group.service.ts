import {SuperGroup} from './super_group';
import {MOCK_SUPER_GROUPS} from './mock-super_groups';
import {Injectable} from 'angular2/core';
import {GroupService} from '../group/group.service';

@Injectable()
export class SuperGroupService {
  
  constructor(
    private _groupService: GroupService
  ) {}
  
  /*
  getGroupsBySuperGroupName(sg_name: string) {
    return this._groupService.getGroupsBySuperGroupName(sg_name);
  }
  */
  
  /**
   * Returns a Super group obj be name
   */
  getSuperGroupsByName(sg_name: string) {
    return Promise.resolve(MOCK_SUPER_GROUPS.find(sgs => {
      return sgs.name == sg_name;
    }));
  }
  
  /**
   * Returns a list of SuperGroup based on its type
   */
  getSuperGroupsByType(superGroupType: string) {
    return Promise.resolve(MOCK_SUPER_GROUPS).then(
      sgs => sgs.filter(sg => sg.type === superGroupType)
    );
  }
  
}
