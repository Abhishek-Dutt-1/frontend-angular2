import {Group_Of_Groups} from '../group_of_groups/Group_Of_Groups';

export interface Group {
  id: number;
  // name and group url are the same
  name: string;
  parent_group: Group_Of_Groups[];
}