import {SuperGroup} from '../super_group/super_group';

export interface Group {
  id: number;
  // name and group url are the same (but does not include the go/xxx)
  name: string;
  super_group: SuperGroup;
  //type: string;
}