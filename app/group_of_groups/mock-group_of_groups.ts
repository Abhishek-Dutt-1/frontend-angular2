import {Group_Of_Groups} from './group_of_groups'
import {MOCK_GROUPS} from '../group/mock-groups'

// Grouop's name and urls are same
export var MOCK_GROUP_OF_GROUPS: Group_Of_Groups[] = [
  {
    id: 1,
    name: 'india',
    type: 'national'
    //sub_groups: [MOCK_GROUPS[0], MOCK_GROUPS[1]]
  },
  {
    id: 2,
    name: 'bangalore',
    type: 'international'
    //sub_groups: [MOCK_GROUPS[2], MOCK_GROUPS[3]]
  },
  {
    id: 3,
    name: 'in',
    type: 'national'
    //sub_groups: [MOCK_GROUPS[4]]
  },
  {
    id: 4,
    name: 'USA',
    type: 'international'
    //sub_groups: [MOCK_GROUPS[5], MOCK_GROUPS[1]]
  },
  {
    id: 5,
    name: 'Karnataka',
    type: 'state'
    //sub_groups: [MOCK_GROUPS[2], MOCK_GROUPS[4]]
  },
  {
    id: 6,
    name: 'us',
    type: 'international'
    //sub_groups: [MOCK_GROUPS[0], MOCK_GROUPS[1]]
  }
  
]