import {UserRoles} from './user-roles';

export interface User {
  id: number;
  email: string;
  displayname: string;
  password: string;
  userrole: UserRoles;
  settings?: {
    interntaional: string[],
    national: string,
    state: string[],
    city: string[],
    sub_city: string[]
  }
}