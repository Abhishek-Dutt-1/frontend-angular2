import {Group} from './group';
import {MOCK_SUPER_GROUPS} from '../super_group/mock-super_groups';
import {MOCK_USERS} from '../user/mock-users';

// Grouop's name and urls are same
export var MOCK_GROUPS: Group[] = [
  {
    id: 0,
    name: 'casual_international_celebrity_encounters',
    description: '',
    owner: MOCK_USERS[0],
    supergroup: MOCK_SUPER_GROUPS[0],
    members_waiting_approval: [],
    non_members_can_view: true,
    isCurrentUserSubscribed: false,
    membership_needs_approval: false,
    isCurrentUsersMembershipPending: false
  },
  {
    id: 1,
    name: 'random',
    description: '',
    owner: MOCK_USERS[0],
    supergroup: MOCK_SUPER_GROUPS[0],
    members_waiting_approval: [],
    non_members_can_view: true,
    isCurrentUserSubscribed: false,
    membership_needs_approval: false,
    isCurrentUsersMembershipPending: false
  },
  {
    id: 2,
    name: 'funny',
    description: '',
    owner: MOCK_USERS[0],
    supergroup: MOCK_SUPER_GROUPS[1],
    members_waiting_approval: [],
    non_members_can_view: true,
    isCurrentUserSubscribed: false,
    membership_needs_approval: false,
    isCurrentUsersMembershipPending: false
  },
  {
    id: 3,
    name: 'interstellar_space_travel',
    description: '',
    owner: MOCK_USERS[0],
    supergroup: MOCK_SUPER_GROUPS[2],
    members_waiting_approval: [],
    non_members_can_view: true,
    isCurrentUserSubscribed: false,
    membership_needs_approval: false,
    isCurrentUsersMembershipPending: false
  },
  {
    id: 4,
    name: 'one_true_god',
    description: '',
    owner: MOCK_USERS[0],
    supergroup: MOCK_SUPER_GROUPS[4],
    members_waiting_approval: [],
    non_members_can_view: true,
    isCurrentUserSubscribed: false,
    membership_needs_approval: false,
    isCurrentUsersMembershipPending: false
  },
  {
    id: 5,
    name: 'nicholas_cage_fan_club',
    description: '',
    owner: MOCK_USERS[0],
    supergroup: MOCK_SUPER_GROUPS[3],
    members_waiting_approval: [],
    non_members_can_view: true,
    isCurrentUserSubscribed: false,
    membership_needs_approval: false,
    isCurrentUsersMembershipPending: false
  }
]
