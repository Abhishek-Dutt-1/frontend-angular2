import {UserRoles} from './user-roles';
import {MOCK_SUPER_GROUPS} from '../super_group/mock-super_groups';
import {SuperGroup} from '../super_group/super_group';

export interface User {
  id: number;
  email: string;
  emailverified: boolean;
  username: string;
  profileimage: string;
  displayname: string;
  password: string;
  userrole: UserRoles;
  international: SuperGroup[],
  national: SuperGroup[],
  state: SuperGroup[],
  city: SuperGroup[],
  local: SuperGroup[],
  extra_emails: any[],
  score: number,
  totalScore: number
}
