import {Group} from './group';
import {MOCK_SUPER_GROUPS} from '../super_group/mock-super_groups';

// Grouop's name and urls are same
export var MOCK_GROUPS: Group[] = [
  {
    id: 0,
    name: 'casual_international_celebrity_encounters',
    super_group: MOCK_SUPER_GROUPS[0]
  },
  {
    id: 1,
    name: 'random',
    super_group: MOCK_SUPER_GROUPS[0]
  },
  {
    id: 2,
    name: 'funny',
    super_group: MOCK_SUPER_GROUPS[1]
  },
  {
    id: 3,
    name: 'interstellar_space_travel',
    super_group: MOCK_SUPER_GROUPS[2]
  },
  {
    id: 4,
    name: 'one_true_god',
    super_group: MOCK_SUPER_GROUPS[4]
  },
  {
    id: 5,
    name: 'nicholas_cage_fan_club',
    super_group: MOCK_SUPER_GROUPS[3]
  }
  
]
