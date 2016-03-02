import {Group_Of_Groups} from './group_of_groups'
import {MOCK_GROUPS} from '../group/mock-groups'

// Grouop's name and urls are same
export var MOCK_GROUP_OF_GROUPS: Group_Of_Groups[] = [
  {
    id: 0,
    name: 'india',
    //sub_groups: [MOCK_GROUPS[0], MOCK_GROUPS[1]]
  },
  {
    id: 1,
    name: 'bangalore',
    //sub_groups: [MOCK_GROUPS[2], MOCK_GROUPS[3]]
  },
  {
    id: 2,
    name: 'in',
    //sub_groups: [MOCK_GROUPS[4]]
  },
  {
    id: 3,
    name: 'blr',
    //sub_groups: [MOCK_GROUPS[5], MOCK_GROUPS[1]]
  },
  {
    id: 4,
    name: 'koramangala',
    //sub_groups: [MOCK_GROUPS[2], MOCK_GROUPS[4]]
  },
  {
    id: 5,
    name: 'us',
    //sub_groups: [MOCK_GROUPS[0], MOCK_GROUPS[1]]
  }
  
]