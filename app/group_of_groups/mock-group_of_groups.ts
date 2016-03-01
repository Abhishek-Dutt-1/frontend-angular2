import {Group_Of_Groups} from './group_of_groups'
import {MOCK_GROUPS} from '../group/mock-groups'

// Grouop's name and urls are same
export var MOCK_GROUP_OF_GROUPS: Group_Of_Groups[] = [
  {
    id: 0,
    name: 'gog0',
    sub_groups: [MOCK_GROUPS[0], MOCK_GROUPS[1]]
  },
  {
    id: 1,
    name: 'gog1',
    sub_groups: [MOCK_GROUPS[2], MOCK_GROUPS[3]]
  },
  {
    id: 2,
    name: 'gog2',
    sub_groups: [MOCK_GROUPS[4]]
  },
  {
    id: 3,
    name: 'gog3',
    sub_groups: [MOCK_GROUPS[5], MOCK_GROUPS[1]]
  },
  {
    id: 4,
    name: 'gog4',
    sub_groups: [MOCK_GROUPS[2], MOCK_GROUPS[4]]
  },
  {
    id: 5,
    name: 'gog5',
    sub_groups: [MOCK_GROUPS[0], MOCK_GROUPS[1]]
  }
  
]