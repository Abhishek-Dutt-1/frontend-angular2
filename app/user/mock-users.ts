import {User} from './user';
import {UserRoles} from './user-roles';
import {MOCK_SUPER_GROUPS} from '../super_group/mock-super_groups';

export var MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'iron@in.in',
    displayname: 'Iron Man',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_SUPER_GROUPS[1-1]],
      national: MOCK_SUPER_GROUPS[3-1],
      state: [MOCK_SUPER_GROUPS[5-1]],
      city: [MOCK_SUPER_GROUPS[7-1]],
      local: [MOCK_SUPER_GROUPS[9-1]]
    }
  },
  {
    id: 2,
    email: 'captain@in.in',
    displayname: 'Captain America',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_SUPER_GROUPS[4]],
      national: MOCK_SUPER_GROUPS[1],
      state: [MOCK_SUPER_GROUPS[5]],
      city: [MOCK_SUPER_GROUPS[2]],
      local: [MOCK_SUPER_GROUPS[3]]
    }
  },
  {
    id: 3,
    email: 'hulk@in.in',
    displayname: 'Incredible Hulk',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_SUPER_GROUPS[4]],
      national: MOCK_SUPER_GROUPS[1],
      state: [MOCK_SUPER_GROUPS[5]],
      city: [MOCK_SUPER_GROUPS[2]],
      local: [MOCK_SUPER_GROUPS[3]]
    }
  },
  {
    id: 4,
    email: 'thor@in.in',
    displayname: 'The Mighty Thor',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_SUPER_GROUPS[4]],
      national: MOCK_SUPER_GROUPS[1],
      state: [MOCK_SUPER_GROUPS[5]],
      city: [MOCK_SUPER_GROUPS[2]],
      local: [MOCK_SUPER_GROUPS[3]]
    }
  }
  
]