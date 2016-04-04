import {Group_Of_Groups} from './group_of_groups';
import {MOCK_GROUP_OF_GROUPS} from './mock-group_of_groups';
import {Injectable} from 'angular2/core';

@Injectable()
export class GroupOfGroupsService {
  
  constructor() {
  }
  
  /**
   * Returns a list of group_of_groups based on its type
   */
  getGroupOfGroupsByType(groupType: string) {
    return Promise.resolve(MOCK_GROUP_OF_GROUPS).then(
      gogs => gogs.filter(gog => gog.type === groupType)
    );
  }
  
}