import {Group_Of_Groups} from '../group_of_groups/Group_Of_Groups';

export interface Group {
  id: number;
  // name and group url are the same (but does not include the go/xxx)
  name: string;
  parent_group: Group_Of_Groups;
}