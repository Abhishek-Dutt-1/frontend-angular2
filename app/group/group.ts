import {SuperGroup} from '../super_group/super_group';
import {User} from '../user/user';

export interface Group {
  id: number;
  // name and group url are the same (but does not include the go/xxx)
  name: string;
  description: string;
  super_group: SuperGroup;
  owner: User;
}