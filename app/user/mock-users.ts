import {User} from './user';
import {UserRoles} from './user-roles';
import {MOCK_GROUP_OF_GROUPS} from '../group_of_groups/mock-group_of_groups';

export var MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'iron@in.in',
    displayname: 'Iron Man',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_GROUP_OF_GROUPS[4]],
      national: MOCK_GROUP_OF_GROUPS[1],
      state: [MOCK_GROUP_OF_GROUPS[5]],
      city: [MOCK_GROUP_OF_GROUPS[2]],
      local: [MOCK_GROUP_OF_GROUPS[3]]
    }
  },
  {
    id: 2,
    email: 'captain@in.in',
    displayname: 'Captain America',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_GROUP_OF_GROUPS[4]],
      national: MOCK_GROUP_OF_GROUPS[1],
      state: [MOCK_GROUP_OF_GROUPS[5]],
      city: [MOCK_GROUP_OF_GROUPS[2]],
      local: [MOCK_GROUP_OF_GROUPS[3]]
    }
  },
  {
    id: 3,
    email: 'hulk@in.in',
    displayname: 'Incredible Hulk',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_GROUP_OF_GROUPS[4]],
      national: MOCK_GROUP_OF_GROUPS[1],
      state: [MOCK_GROUP_OF_GROUPS[5]],
      city: [MOCK_GROUP_OF_GROUPS[2]],
      local: [MOCK_GROUP_OF_GROUPS[3]]
    }
  },
  {
    id: 4,
    email: 'thor@in.in',
    displayname: 'The Mighty Thor',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      international: [MOCK_GROUP_OF_GROUPS[4]],
      national: MOCK_GROUP_OF_GROUPS[1],
      state: [MOCK_GROUP_OF_GROUPS[5]],
      city: [MOCK_GROUP_OF_GROUPS[2]],
      local: [MOCK_GROUP_OF_GROUPS[3]]
    }
  }
  
]