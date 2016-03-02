import {Group} from './group';
import {MOCK_GROUP_OF_GROUPS} from '../group_of_groups/mock-group_of_groups';

// Grouop's name and urls are same
export var MOCK_GROUPS: Group[] = [
  {
    id: 0,
    name: 'casual_international_celebrity_encounters',
    parent_group: MOCK_GROUP_OF_GROUPS[0]
  },
  {
    id: 1,
    name: 'random',
    parent_group: MOCK_GROUP_OF_GROUPS[3]
  },
  {
    id: 2,
    name: 'funny',
    parent_group: MOCK_GROUP_OF_GROUPS[1]
  },
  {
    id: 3,
    name: 'interstellar_space_travel',
    parent_group: MOCK_GROUP_OF_GROUPS[2]
  },
  {
    id: 4,
    name: 'one_true_god',
    parent_group: MOCK_GROUP_OF_GROUPS[4]
  },
  {
    id: 5,
    name: 'nicholas_cage_fan_club',
    parent_group: MOCK_GROUP_OF_GROUPS[3]
  }
  
]
