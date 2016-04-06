import {UserRoles} from './user-roles';
import {MOCK_GROUP_OF_GROUPS} from '../group_of_groups/mock-group_of_groups';
import {Group_Of_Groups} from '../group_of_groups/group_of_groups';

export interface User {
  id: number;
  email: string;
  displayname: string;
  password: string;
  userrole: UserRoles;
  settings?: {
    international: Group_Of_Groups[],
    national: Group_Of_Groups,
    state: Group_Of_Groups[],
    city: Group_Of_Groups[],
    local: Group_Of_Groups[]
  }
}