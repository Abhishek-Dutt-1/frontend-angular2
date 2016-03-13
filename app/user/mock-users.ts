import {User} from './user';
import {UserRoles} from './user-roles';

export var MOCK_USERS: User[] = [
  {
    id: 0,
    email: 'iron@in.in',
    displayname: 'Iron Man',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      interntaional: ['usa', 'russia'],
      national: ['india'],
      state: ['karnataka'],
      city: ['bangalore'],
      sub_city: ['koramangala']
    }
  },
  {
    id: 1,
    email: 'captain@in.in',
    displayname: 'Captain America',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      interntaional: ['usa', 'russia'],
      national: ['india'],
      state: ['karnataka'],
      city: ['bangalore'],
      sub_city: ['koramangala']
    }
  },
  {
    id: 2,
    email: 'hulk@in.in',
    displayname: 'Incredible Hulk',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      interntaional: ['usa', 'russia'],
      national: ['india'],
      state: ['karnataka'],
      city: ['bangalore'],
      sub_city: ['koramangala']
    }
  },
  {
    id: 3,
    email: 'thor@in.in',
    displayname: 'The Mighty Thor',
    password: '123',
    userrole: UserRoles.user,
    settings: {
      interntaional: ['usa', 'russia'],
      national: ['india'],
      state: ['karnataka'],
      city: ['bangalore'],
      sub_city: ['koramangala']
    }
  }
  
]