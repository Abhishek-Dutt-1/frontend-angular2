import {SuperGroup} from './super_group';
import {MOCK_SUPER_GROUPS} from './mock-super_groups';
import {Injectable} from 'angular2/core';

@Injectable()
export class SuperGroupService {
  
  constructor() {
  }
  
  getSuperGroupByName(sg_name: string) {
    return Promise.resolve(MOCK_SUPER_GROUPS).then(
      sgs => sgs.find(sg => sg.name == sg_name)
    );
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
